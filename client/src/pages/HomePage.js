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
  const [showFilter, setShowFilter] = useState(false);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) setCategories(data.category);
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
      setProducts((prev) => [...prev, ...data.products]);
      setLoading(false);
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
    let updated = [...checked];
    value ? updated.push(id) : (updated = updated.filter((c) => c !== id));
    setChecked(updated);
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
    <Layout title="All Products - Best Offers">
      {/* ===== BANNER SLIDER (NEW) ===== */}
      <div
        id="homeBanner"
        className="carousel slide mb-4 mx-auto banner-carousel"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner  ">
          <div className="carousel-item active">
            <img
              src="https://cdn.shopify.com/s/files/1/0629/7252/6778/files/bop-qr-banner_600x600.jpg?v=1671263330 "
              className="d-block w-100 banner-img"
              alt="Banner 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/d1895685-46e1-4da5-a761-36e1951b90c9.__CR0,0,970,300_PT0_SX970_V1___.jpg"
              className="d-block w-100 banner-img"
              alt="Banner 2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://www.thespruceeats.com/thmb/fLiRPJNTLyh596Z0hH2Sqv6gntY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SPE_SYS_MainBanner_Final-17a3970717244815b785f693fde69029.jpg"
              className="d-block w-100 banner-img"
              alt="Banner 3"
            />
          </div>
        </div>
      </div>
–
      <h3 className="text-center fw-bold mb-3">Our Products</h3> 

      <div className="home-container mt-3">
        <div className="row">
          {/* FILTER SIDEBAR */}
          <div
            className={`col-md-2 filter-sidebar ${showFilter ? "active" : ""}`}
          >
            <h4>Filter by Category</h4>
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                checked={checked.includes(c._id)}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}

            <h4 className="mt-4">Filter by Price</h4>
            <Radio.Group
              onChange={(e) => setRadio(e.target.value)}
              value={radio}
            >
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

          {/* PRODUCT LIST */}
          <div className="col-md-10 product-area">
          
            <div className="product-list">
              {products.length > 0 ? (
                products.map((p) => (
                  <div key={p._id} className="product-card">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="product-image"
                      alt={p.name}
                    />

                    <div className="product-details">
                      <h5 className="product-title">{p.name}</h5>
                      <p className="product-description">
                        {p.description.substring(0, 30)}...
                      </p>
                      <p className="product-price">₹{p.price}</p>

                      {/* ✅ BUTTONS UNCHANGED */}
                      <button
                        className="btn-details "
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        VIEW DETAILS
                      </button>

                      <button
                        className="btn-add-cart mt-2"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p]),
                          );
                          toast.success("Item added to cart");
                        }}
                      >
                        ADD TO CART
                      </button>
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
                  className="load-more-btn mb-4"
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
