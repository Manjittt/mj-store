// import { useState, useEffect } from "react";
// import { useCart } from "../context/cart";
// import { useAuth } from "../context/auth";
// import Layout from "../components/layout/Layout";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import DropIn from "braintree-web-drop-in-react";

// const CartPage = () => {
//   const { auth } = useAuth();
//   const { cart, setCart } = useCart();
//   const navigate = useNavigate();
//   const [clientToken, setClientToken] = useState("");
//   const [instance, setInstance] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Get payment getway Token
//   const getToken = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/product/braintree/token");
//       setClientToken(data?.clientToken);
//     } catch (error) {
//       console.error("Token fetch error:", error);
//     }
//   };

//   useEffect(() => {
//     getToken();
//   }, [auth?.token]);

//   // Remove item from cart
//   const removeCartItem = (pid) => {
//     try {
//       const updatedCart = cart.filter((item) => item._id !== pid);
//       setCart(updatedCart);
//       localStorage.setItem("cart", JSON.stringify(updatedCart));
//       toast.success("Item removed from cart");
//     } catch (error) {
//       console.error("Remove item error:", error);
//     }
//   };

//   // Calculate total price
//   const totalPrice = cart
//     .reduce((acc, item) => acc + Number(item.price || 0), 0)
//     .toFixed(2);

//   // Handle Payment
//   const handlePayment = async () => {
//     try {
//       setLoading(true);
//       const { nonce } = await instance.requestPaymentMethod();
//       const { data } = await axios.post("/api/v1/product/braintree/payment", {
//         nonce,
//         cart,
//       });

//       if (data.success) {
//         setCart([]);
//         localStorage.removeItem("cart");
//         toast.success("Payment successful!");
//         navigate("/dashboard/user/orders");
//       } else {
//         toast.error(data.message || "Payment failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Payment error:", error);
//       toast.error("An error occurred while processing your payment.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Layout>
//       <div className="container py-4">
//         <div className="row">
//           <div className="col-md-12 text-center mb-4">
//             <h1 style={{ fontSize: "2rem", fontWeight: 600 }}>
//               Hello {auth?.user?.name || "Guest"}
//             </h1>
//             <h4 className="text-secondary">
//               {cart.length > 0
//                 ? `You have ${cart.length} item(s) in your cart`
//                 : "Your cart is empty."}
//             </h4>
//           </div>
//         </div>

//         <div className="row">
//           {/* Cart Items */}
//           <div className="col-md-8">
//             {cart?.map((p) => (
//               <div
//                 key={p._id}
//                 className="card mb-3 shadow-sm"
//                 style={{
//                   border: "1px solid #e0e0e0",
//                   borderRadius: "12px",
//                   padding: "10px",
//                 }}
//               >
//                 <div className="row g-0 align-items-center">
//                   <div className="col-md-4 text-center">
//                     <img
//                       src={`/api/v1/product/product-photo/${p._id}`}
//                       alt={p.name}
//                       className="img-fluid rounded"
//                       style={{
//                         maxHeight: "120px",
//                         objectFit: "contain",
//                         padding: "10px",
//                       }}
//                     />
//                   </div>
//                   <div className="col-md-8">
//                     <div className="card-body">
//                       <h5 className="card-title">{p.name}</h5>
//                       <p className="card-text text-muted">
//                         {p.description?.substring(0, 60)}...
//                       </p>
//                       <p className="card-text">
//                         <strong>Price:</strong> ₹{p.price}
//                       </p>
//                       <button
//                         className="btn btn-outline-danger btn-sm"
//                         onClick={() => removeCartItem(p._id)}
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Cart Summary & Payment */}
//           <div className="col-md-4">
//             <div
//               className="card shadow-sm p-3"
//               style={{ borderRadius: "12px", background: "#f8f9fa" }}
//             >
//               <h4 className="mb-3">Cart Summary</h4>
//               <p>
//                 Total Items: <strong>{cart.length}</strong>
//               </p>
//               <hr />
//               <h5>Total Price: ₹{totalPrice}</h5>
//               <hr />

//               {/* Address */}
//               {auth?.user?.address ? (
//                 <>
//                   <h5 className="mt-3">Delivery Address</h5>
//                   <p className="text-muted">{auth.user.address}</p>
//                   <button
//                     className="btn btn-warning btn-sm"
//                     onClick={() => navigate("/dashboard/user/profile")}
//                   >
//                     Update Address
//                   </button>
//                 </>
//               ) : (
//                 <div>
//                   {auth?.token ? (
//                     <button
//                       className="btn btn-warning btn-sm"
//                       onClick={() => navigate("/dashboard/user/profile")}
//                     >
//                       Add Address
//                     </button>
//                   ) : (
//                     <button
//                       className="btn btn-outline-primary btn-sm"
//                       onClick={() => navigate("/login", { state: "/cart" })}
//                     >
//                       Please login to checkout
//                     </button>
//                   )}
//                 </div>
//               )}

//               {/* Payment */}
//               <div className="mt-2">
//                 <DropIn
//                   options={{
//                     authorization: clientToken,
//                     paypal: { flow: "vault" },
//                   }}
//                   onInstance={(instance) => setInstance(instance)}
//                 />
//                 <button
//                   className="btn btn-primary"
//                   onClick={handlePayment}
//                   disabled={
//                     !clientToken || loading || instance || !auth?.user?.address
//                   }
//                 >
//                   {loading ? "Processing..." : "Make Payment"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };
// export default CartPage;
