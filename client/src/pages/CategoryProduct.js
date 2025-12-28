import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const { cart, setCart } = useCart();

  useEffect(() => {
    if (params?.slug) {
      getProductsByCategory();
    }
    // eslint-disable-next-line
  }, [params?.slug]);

  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products || []);
      setCategory(data?.category || {});
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item added to cart");
  };

  return (
    <Layout title={category?.name}>
      <div className="container mt-3">
        <h1 className="category-title">{category?.name}</h1>
        <h6 className="results-count">
          {products.length} result{products.length !== 1 && "s"} found
        </h6>

        <style>{`
          .category-title {
            text-align: center;
            font-size: 2rem;
            font-weight: 600;
            color: #2d2d2d;
            margin-bottom: 0.5rem;
          }
          .results-count {
            text-align: center;
            font-size: 1.1rem;
            font-weight: 500;
            color: #555;
            margin-bottom: 1.5rem;
          }
        `}</style>

        <div className="row">
          {products.length > 0 ? (
            products.map((p) => (
              <div key={p._id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  {/* ✅ FIXED IMAGE RATIO */}
                  {p?._id && (
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "1 / 1",
                        overflow: "hidden",
                        backgroundColor: "#fff",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        alt={p?.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  )}

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{p?.name}</h5>
                    <p className="card-text text-muted">
                      {p?.description?.substring(0, 60)}...
                    </p>
                    <p className="card-text fw-bold text-success">
                      ₹{p?.price}
                    </p>

                    <div className="mt-auto">
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        View Details
                      </button>

                      <button
                        className="btn btn-dark"
                        onClick={() => handleAddToCart(p)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No products found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
