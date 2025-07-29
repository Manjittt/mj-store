import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts((prev) => [...prev, ...data.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    let updatedChecked = [...checked];
    if (value) {
      updatedChecked.push(id);
    } else {
      updatedChecked = updatedChecked.filter((c) => c !== id);
    }
    setChecked(updatedChecked);
  };

  const handlePriceFilter = (e) => {
    setRadio(e.target.value);
  };

  const clearFilters = () => {
    setChecked([]);
    setRadio([]);
    setPage(1);
    setProducts([]);
    getAllProducts();
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      setProducts([]);
      setPage(1);
    }
  }, [checked, radio]);

  useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllProducts();
    }
  }, [page]);

  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="home-container mt-3">
        <div className="row">
          {/* Sidebar Filters */}
          <div className="col-md-2 filter-sidebar">
            <h4>Filter by Category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                  checked={checked.includes(c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            <h4 className="mt-4">Filter by Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={handlePriceFilter} value={radio}>
                {prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>

            <button onClick={clearFilters} className="clear-filter-btn">
              Clear Filters
            </button>
          </div>

          {/* Product Listing */}
          <div className="col-md-10 product-area">
            <div className="product-list">
              {products.length > 0 ? (
                products.map((p) => (
                  <div key={p._id} className="product-card">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="product-image"
                      alt={p.name}
                      loading="lazy"
                             style={{
                        maxHeight: "220px",
                        objectFit: "contain",
                        padding: "10px",
                      }}
                    />
                    <div className="product-details">
                      <h5 className="product-title">{p.name}</h5>
                      <p className="product-description">
                        {p.description.substring(0, 30)}...
                      </p>
                      <p className="product-price">₹{p.price}</p>
                      <div className="product-actions">
                        <button
                          className="btn-details"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          VIEW DETAILS
                        </button>
                        <button
                          className="btn-add-cart"
                          onClick={() => {
                            setCart([...cart, p]);
                            
                            localStorage.setItem("cart", JSON.stringify([...cart, p]));
                            toast.success("Item added to cart");
                          }}
                        >
                          ADD TO CART{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">No products found.</p>
              )}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-4">
              {!checked.length && !radio.length && products.length < total && (
                <button
                  className="load-more-btn mb-4"
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Load More.."}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default HomePage;
