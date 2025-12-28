import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [id, setId] = useState("");

  // ---------------- SINGLE PRODUCT ----------------
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setId(data.product._id);
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  // ---------------- CATEGORIES ----------------
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) setCategories(data.category);
      else toast.error("Failed to fetch categories");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // ---------------- UPDATE PRODUCT ----------------
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      if (photo) productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.success("Product updated successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // ---------------- DELETE PRODUCT ----------------
  const handleDelete = async () => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      await axios.delete(`/api/v1/product/delete/${id}`);
      toast.success("Product deleted successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Dashboard - Update Product">
      <div className="container-fluid m-3 p-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1>Update Product</h1>

            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
                value={category}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? "Change Photo" : "Upload Photo"}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </label>
              </div>

              <div className="mb-3 text-center">
                <img
                  src={
                    photo
                      ? URL.createObjectURL(photo)
                      : `/api/v1/product/product-photo/${id}`
                  }
                  alt="product"
                  height={200}
                  className="img img-responsive"
                />
              </div>

              <input
                type="text"
                value={name}
                placeholder="Product Name"
                className="form-control mb-3"
                onChange={(e) => setName(e.target.value)}
              />

              <textarea
                className="form-control mb-3"
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="number"
                className="form-control mb-3"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <input
                type="number"
                className="form-control mb-3"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />

              <Select
                bordered={false}
                size="large"
                className="form-select mb-3"
                value={shipping ? "Yes" : "No"}
                onChange={(value) => setShipping(value === "Yes")}
              >
                <Option value="Yes">Yes</Option>
                <Option value="No">No</Option>
              </Select>

              <button className="btn btn-primary me-2" onClick={handleUpdate}>
                UPDATE PRODUCT
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                DELETE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
