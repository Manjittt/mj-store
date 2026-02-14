import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { Select } from "antd";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment";

const { Option } = Select;

const status = [
  "Not Processed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const {auth} = useAuth();

  // get all orders
  const getAllOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/all-orders", {
        headers: {
          Authorization: auth?.token,
        },
      });
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getAllOrders();
    }
  }, [auth?.token]);

  // update order status
  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      toast.success("Status Updated Successfully");
      getAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="All Orders Data">
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>

        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>

          {orders?.map((o, i) => (
            <div className="border shadow mb-4" key={o._id}>
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Status</th>
                    <th>Buyer</th>
                    <th>Date</th>
                    <th>Payment</th>
                    <th>Quantity</th>
                    <th>Address</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>{i + 1}</td>

                    <td>
                      <Select
                        bordered={false}
                        value={o?.status}
                        onChange={(value) => handleChange(o._id, value)}
                      >
                        {status.map((s) => (
                          <Option key={s} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </td>

                    <td>{o?.buyer?.name}</td>
                    <td>{moment(o?.createdAt).fromNow()}</td>
                    <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                    <td>{o?.products?.length}</td>
                    <td>{o?.address}</td>
                  </tr>
                </tbody>
              </table>

              <div className="container">
                {o?.products?.map((p) => (
                  <div className="row mb-2 p-3 card flex-row" key={p._id}>
                    <div className="col-md-4">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        width="100"
                        height="100"
                      />
                    </div>

                    <div className="col-md-8">
                      <p>
                        <strong>{p.name}</strong>
                      </p>
                      <p>{p.description.substring(0, 30)}...</p>
                      <p>Price : ₹{p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
