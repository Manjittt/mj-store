import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import moment from "moment";
import { Select, Input } from "antd";
import { useAuth } from "../../context/auth";

const { Option } = Select;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");

  const [statusValues] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);

  const { auth } = useAuth();

  // =============================
  // GET ALL ORDERS
  // =============================
  const getOrders = async () => {
    if (!auth?.token) return;

    try {
      const { data } = await axios.get("/api/v1/order/all-orders", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      if (data?.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Failed to fetch orders.");
    }
  };

  // =============================
  // UPDATE ORDER STATUS
  // =============================
  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `/api/v1/order/order-status/${orderId}`,
        { status: value },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        },
      );

      if (data?.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: value } : order,
          ),
        );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status.");
    }
  };

  useEffect(() => {
    getOrders();
  }, [auth?.token]);

  // =============================
  // FILTER ORDERS BY PRODUCT NAME
  // =============================
  const filteredOrders = orders.filter((order) =>
    order.products.some((product) =>
      product.name?.toLowerCase().includes(searchProduct.toLowerCase()),
    ),
  );

  return (
    <Layout title="All Orders - Admin">
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1 className="mb-4 text-center p-3">All Orders</h1>

            {/* PRODUCT SEARCH */}
            <div className="mb-3">
              <Input
                placeholder="Search by Product Name..."
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
                allowClear
              />
            </div>

            {filteredOrders?.length === 0 && <p>No orders found.</p>}

            {filteredOrders?.map((o, i) => (
              <div className="border shadow mb-4 p-3" key={o._id}>
                {/* ORDER HEADER */}
                <div className="mb-3">
                  <h5>Order #{i + 1}</h5>

                  <p>
                    <strong>Buyer:</strong> {o?.buyer?.name || "N/A"}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <Select
                      bordered={false}
                      value={o?.status}
                      onChange={(value) => handleChange(o._id, value)}
                    >
                      {statusValues.map((s, idx) => (
                        <Option key={idx} value={s}>
                          {s}
                        </Option>
                      ))}
                    </Select>
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

                  {/* DELIVERY ADDRESS */}
                  <div className="card p-3 bg-light mb-2">
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
                </div>

                {/* PRODUCTS TABLE */}
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>

                  <tbody>
                    {o?.products
                      ?.filter((p) =>
                        p.name
                          ?.toLowerCase()
                          .includes(searchProduct.toLowerCase()),
                      )
                      .map((p, idx) => (
                        <tr key={idx}>
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
                          <td>₹ {p.price * (1)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                {/* TOTAL */}
                <div className="text-end">
                  <h5>
                    Total Amount: ₹{" "}
                    {o?.products?.reduce(
                      (total, item) =>
                        total + item.price * ( 1),
                      0,
                    )}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
