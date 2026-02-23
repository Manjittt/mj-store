import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import Layout from "../components/layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";

const CartPage = () => {
  const { auth } = useAuth();
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const [clientToken, setClientToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [showAddress, setShowAddress] = useState(false);

  const instanceRef = useRef(null);

  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/payment/braintree/token",
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );
      if (data?.success) setClientToken(data.clientToken);
    } catch (error) {
      toast.error("Unable to load payment system");
    }
  };

  useEffect(() => {
    if (auth?.token) getToken();
  }, [auth?.token]);

  const removeCartItem = (pid) => {
    const updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed");
  };

  const totalPrice = cart
    .reduce((acc, item) => acc + Number(item.price || 0), 0)
    .toFixed(2);

  const validateAddress = () => {
    const required = [
      "fullName",
      "phone",
      "email",
      "area",
      "city",
      "state",
      "pincode",
    ];
    for (let field of required) {
      if (!deliveryAddress[field]) {
        toast.error("Please fill complete delivery address");
        return false;
      }
    }
    return true;
  };

  const handlePayment = async () => {
    if (!auth?.token) return navigate("/login");
    if (!validateAddress()) return;
    if (!instanceRef.current) return toast.error("Payment system loading");

    try {
      setLoading(true);
      const { nonce } = await instanceRef.current.requestPaymentMethod();

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/payment/braintree/payment",
        { nonce, cart, address: deliveryAddress },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );

      if (data?.success) {
        setCart([]);
        localStorage.removeItem("cart");
        toast.success("Payment Successful 🎉");
        navigate("/dashboard/user/orders");
      } else toast.error(data?.message);
    } catch (error) {
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCODPayment = async () => {
    if (!auth?.token) return navigate("/login");
    if (!validateAddress()) return;

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/payment/cod/payment",
        { cart, address: deliveryAddress },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );

      if (data?.success) {
        setCart([]);
        localStorage.removeItem("cart");
        toast.success("Order Placed 🎉");
        navigate("/dashboard/user/orders");
      } else toast.error(data?.message);
    } catch (error) {
      toast.error("COD order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={{ padding: "40px", background: "#f1f3f6", minHeight: "100vh" }}>
        <div style={{ maxWidth: "1200px", margin: "auto" }}>
          <h2 style={{ marginBottom: "25px", textAlign: "center" }}>
            Hello {auth?.user?.name || "Guest"} 👋
          </h2>

          <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>

            {/* CART ITEMS */}
            <div style={{ flex: 2 }}>
              {cart.map((p) => (
                <div
                  key={p._id}
                  style={{
                    display: "flex",
                    background: "#fff",
                    padding: "20px",
                    marginBottom: "15px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    style={{
                      width: "110px",
                      height: "110px",
                      objectFit: "contain",
                      marginRight: "20px",
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <h5 style={{ marginBottom: "8px" }}>{p.name}</h5>
                    <p style={{ fontWeight: "600", color: "#B12704" }}>
                      ₹ {p.price}
                    </p>

                    <button
                      onClick={() => removeCartItem(p._id)}
                      style={{
                        background: "#fff",
                        color: "#d9534f",
                        border: "1px solid #d9534f",
                        padding: "6px 14px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "0.3s",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div
              style={{
                flex: 1,
                background: "#fff",
                padding: "25px",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                height: "fit-content",
              }}
            >
              <h4>Cart Summary</h4>
              <p>Total Items: {cart.length}</p>
              <h5 style={{ color: "#B12704" }}>Total Price: ₹ {totalPrice}</h5>

              <hr />

              {/* ADDRESS DROPDOWN */}
              <div
                onClick={() => setShowAddress(!showAddress)}
                style={{
                  cursor: "pointer",
                  fontWeight: "600",
                  marginBottom: "10px",
                }}
              >
                Delivery Address {showAddress ? "▲" : "▼"}
              </div>

              {showAddress && (
                <div
                  style={{
                    maxHeight: "500px",
                    overflow: "hidden",
                    transition: "all 0.4s ease",
                  }}
                >
                  {Object.keys(deliveryAddress).map((key) => (
                    <input
                      key={key}
                      type="text"
                      placeholder={key}
                      value={deliveryAddress[key]}
                      onChange={(e) =>
                        setDeliveryAddress({
                          ...deliveryAddress,
                          [key]: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "12px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                      }}
                    />
                  ))}
                </div>
              )}

              <hr />

              <h5>Payment Method</h5>

              <div style={{ marginBottom: "8px" }}>
                <input
                  type="radio"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                />{" "}
                Online Payment
              </div>

              <div>
                <input
                  type="radio"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />{" "}
                Cash on Delivery
              </div>

              {paymentMethod === "online" && clientToken && (
                <div style={{ marginTop: "15px" }}>
                  <DropIn
                    options={{ authorization: clientToken }}
                    onInstance={(instance) =>
                      (instanceRef.current = instance)
                    }
                  />
                </div>
              )}

              <button
                disabled={loading}
                onClick={
                  paymentMethod === "online"
                    ? handlePayment
                    : handleCODPayment
                }
                style={{
                  width: "100%",
                  padding: "14px",
                  marginTop: "20px",
                  background: "#FFD814",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;