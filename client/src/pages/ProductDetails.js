import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params.slug) getProduct();
  }, [params.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      if (data?.success) {
        setProduct(data.product);
        getSimilarProducts(data.product._id, data.product.category._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      if (data?.success) {
        setRelatedProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={product?.name}>
      <h3 className="text-center mt-3">{product?.name} Details </h3>
      <div style={{ minHeight: "75.8vh" }}>
        <div className="container py-5">
          <div className="row align-items-center g-4">
            <div className="col-md-6 text-center">
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                className="img-fluid rounded shadow"
                alt={product.name}
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-6">
              <h2 className="mb-3">{product.name}</h2>
              <p className="text-muted">{product.description}</p>
              <h4 className="text-success mb-3">₹{product.price}</h4>
              <h6>Category: {product?.category?.name}</h6>
              <p className="mb-1">
                <strong>In Stock:</strong> {product.quantity}
              </p>
              <button className="btn btn-primary mt-3 px-4 py-2">
                ADD TO CART
              </button>
            </div>
          </div>

          <div className="row mt-5">
            <h4>Similar Products</h4>
            {relatedProducts.length === 0 && <p>No similar products found.</p>}
            {relatedProducts.map((item) => (
              <div className="col-md-4 mt-3" key={item._id}>
                <div className="card h-100 shadow">
                  <img
                    src={`/api/v1/product/product-photo/${item._id}`}
                    className="card-img-top"
                    alt={item.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text text-muted">
                      {item.description?.substring(0, 30)}...
                    </p>
                    <p className="text-success">₹{item.price}</p>
                    <button className="btn btn-primary">ADD TO CART</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
