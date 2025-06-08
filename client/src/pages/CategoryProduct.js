import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.slug) getProductsByCategory(params.slug);
  }, [params?.slug]);

  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <>
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
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .results-count {
      text-align: center;
      font-size: 1.1rem;
      font-weight: 500;
      color: #555;
      margin-bottom: 1.5rem;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
  `}</style>
        </>

        <div className="row">
          {/* Product Listing */}
          <div className="col-md-12">
            <div className="row">
              {products.length > 0 ? (
                products.map((p) => (
                  <div key={p._id} className="col-md-4 mb-4">
                    <div className="card">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">
                          {p.description.substring(0, 60)}...
                        </p>
                        <p className="card-text">₹{p.price}</p>
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          View Details
                        </button>
                        <button className="btn btn-dark text-white   ">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">No products found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
