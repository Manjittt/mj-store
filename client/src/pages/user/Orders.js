import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();

  // =============================
  // GET USER ORDERS
  // =============================
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/get-orders", {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      if (data?.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log("Fetch Orders Error:", error);
    }
  };

  // =============================
  // CANCEL ORDER
  // =============================
  const cancelOrder = async (orderId) => {
    try {
      const { data } = await axios.put(
        `/api/v1/order/cancel-order/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        },
      );

      if (data?.success) {
        alert("Order Cancelled Successfully");
        getOrders();
      }
    } catch (error) {
      console.log("Cancel Error:", error);
      alert("Something went wrong");
    }
  };

  // =============================
  // GENERATE PDF INVOICE
  // =============================
  const generatePDF = (order) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Invoice / Bill", 14, 20);

    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 14, 30);
    doc.text(
      `Date: ${moment(order.createdAt).format("DD/MM/YYYY, h:mm a")}`,
      14,
      38,
    );

    doc.text(
      `Payment: ${
        order.payment.method === "COD"
          ? "Cash on Delivery"
          : order.payment.status
      }`,
      14,
      46,
    );

    doc.text(`Status: ${order.status}`, 14, 54);

    const addressText = order.address
      ? `${order.address.fullName}, ${order.address.phone}, ${
          order.address.email
        }, ${order.address.area}, ${order.address.landmark}, ${
          order.address.city
        }, ${order.address.state} - ${order.address.pincode}`
      : "N/A";

    doc.text(`Address: ${addressText}`, 14, 62);

    const tableColumn = ["Product Name", "Price (₹)", "Qty"];
    const tableRows = [];

    order.products.forEach((p) => {
      tableRows.push([p.name, p.price.toFixed(2), p.quantity || 1]);
    });

    autoTable(doc, {
      startY: 70,
      head: [tableColumn],
      body: tableRows,
    });

    doc.setFontSize(14);
    doc.text(
      `Total Amount: ₹ ${order.totalAmount}`,
      14,
      doc.lastAutoTable.finalY + 10,
    );

    doc.save(`invoice_${order._id}.pdf`);
  };

  // =============================
  // TRACKING BAR
  // =============================
  const renderTrackingBar = (status) => {
    const steps = ["Not Process", "Processing", "Shipped", "Delivered"];

    return (
      <div className="progress my-2" style={{ height: "20px" }}>
        {steps.map((step, index) => {
          let stepStatus = "bg-secondary";

          if (status === "Cancel") stepStatus = "bg-danger";
          else if (steps.indexOf(status) > index || status === step)
            stepStatus = "bg-success";

          return (
            <div
              key={index}
              className={`progress-bar ${stepStatus}`}
              style={{ width: `${100 / steps.length}%` }}
            >
              {step}
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title="All Orders">
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <h1 className="mb-4">All Orders</h1>

            {orders?.length === 0 && <h5>No orders found</h5>}

            {orders?.map((o, i) => (
              <div className="border shadow mb-4 p-3" key={o._id}>
                <div className="mb-3">
                  <h5>Order #{i + 1}</h5>

                  <p>
                    <strong>Status:</strong> {o?.status}
                  </p>

                  <p>
                    <strong>Payment:</strong>{" "}
                    {o?.payment?.method === "COD"
                      ? "Cash on Delivery"
                      : o?.payment?.status}
                  </p>

                  <p>
                    <strong>Date:</strong> {moment(o?.createdAt).fromNow()}
                  </p>

                  {/* FIXED ADDRESS DISPLAY */}
                  <div className="card p-3 mb-2 bg-light">
                    <h6>Delivery Address</h6>
                    {o?.address ? (
                      <>
                        <p className="mb-1">
                          <strong>{o.address.fullName}</strong>
                        </p>
                        <p className="mb-1">📞 {o.address.phone}</p>
                        <p className="mb-1">✉ {o.address.email}</p>
                        <p className="mb-1">
                          {o.address.area}, {o.address.landmark}
                        </p>
                        <p>
                          {o.address.city}, {o.address.state} -{" "}
                          {o.address.pincode}
                        </p>
                      </>
                    ) : (
                      <p>N/A</p>
                    )}
                  </div>

                  {renderTrackingBar(o.status)}

                  {(o?.status === "Not Process" ||
                    o?.status === "Processing") && (
                    <button
                      className="btn btn-danger btn-sm mt-2 me-2"
                      onClick={() => cancelOrder(o._id)}
                    >
                      Cancel Order
                    </button>
                  )}

                  <button
                    className="btn btn-success btn-sm mt-2"
                    onClick={() => generatePDF(o)}
                  >
                    Download Bill
                  </button>
                </div>

                {/* PRODUCT TABLE */}
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Item Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {o?.products?.map((p, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            src={`/api/v1/product/product-photo/${p.product}`}
                            alt={p.name}
                            width="60"
                            height="60"
                            style={{ objectFit: "cover" }}
                          />
                        </td>
                        <td>{p.name}</td>
                        <td>₹ {p.price}</td>
                        <td>{ 1}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="text-end">
                  <h5>Total Amount: ₹ {o?.totalAmount}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
