import React, { useState, useEffect, useCallback } from "react";
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
  const [showFilter, setShowFilter] = useState(false);

  // ---------------- CATEGORIES ----------------
  const getAllCategory = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) setCategories(data.category);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // ---------------- TOTAL COUNT ----------------
  const getTotal = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // ---------------- PRODUCTS ----------------
  const getAllProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setProducts((prev) => [...prev, ...data.products]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [page]);

  const filterProduct = useCallback(async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  }, [checked, radio]);

  // ---------------- FILTER HANDLERS ----------------
  const handleFilter = (value, id) => {
    let updatedChecked = [...checked];
    if (value) updatedChecked.push(id);
    else updatedChecked = updatedChecked.filter((c) => c !== id);
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
  };

  // ---------------- EFFECTS ----------------
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, [getAllCategory, getTotal]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      setProducts([]);
      setPage(1);
    }
  }, [checked, radio, filterProduct]);

  useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllProducts();
    }
  }, [page, checked.length, radio.length, getAllProducts]);

  // ---------------- UI ----------------
  return (
    <Layout title="All Products - Best Offers">
      <h3
        className="text-center"
        style={{
          fontFamily: "Georgia, serif",
          fontWeight: "700",
          padding: "10px",
        }}
      >
        All Products
      </h3>

      <div className="home-container mt-3">
        <div className="row">
          {/* FILTER SIDEBAR */}
          <div
            className={`col-md-2 filter-sidebar ${showFilter ? "active" : ""}`}
          >
            <div className="d-flex justify-content-between align-items-center mb-3 d-md-none">
              <h4>Filters</h4>
              <button
                className="btn-close"
                onClick={() => setShowFilter(false)}
              />
            </div>

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
            <Radio.Group onChange={handlePriceFilter} value={radio}>
              {prices.map((p) => (
                <Radio key={p._id} value={p.array}>
                  {p.name}
                </Radio>
              ))}
            </Radio.Group>

            <button onClick={clearFilters} className="clear-filter-btn">
              Clear Filters
            </button>
          </div>

          {/* PRODUCTS */}
          <div className="col-md-10 product-area">
            <div className="mobile-filter-btn d-md-none mb-3 px-2">
              <button
                className="btn btn-outline-dark w-100"
                onClick={() => setShowFilter(true)}
              >
                ☰ Filter Products
              </button>
            </div>

            <div className="product-list">
              {products.length ? (
                products.map((p) => (
                  <div key={p._id} className="product-card">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      loading="lazy"
                      className="product-image"
                    />
                    <div className="product-details">
                      <h5>{p.name}</h5>
                      <p>{p.description.substring(0, 30)}...</p>
                      <p className="product-price">₹{p.price}</p>

                      <div className="product-actions">
                        <button onClick={() => navigate(`/product/${p.slug}`)}>
                          VIEW DETAILS
                        </button>
                        <button
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item added to cart");
                          }}
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">No products found.</p>
              )}
            </div>

            {!checked.length && !radio.length && products.length < total && (
              <div className="text-center mt-4">
                <button
                  className="load-more-btn"
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Load More.."}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
