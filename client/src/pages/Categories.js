
import useCategory from "../hooks/useCategory";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title="All Categories - E-commerce App">
      <div className="container mt-4">
        <h2 className="text-center mb-4">All Categories</h2>
        <div className="row">
          {categories?.length ? (
            categories.map((c) => (
              <div className="col-md-4 mb-3" key={c._id}>
                <Link
                  to={`/category/${c.slug}`}
                  className="btn btn-dark text-white w-100 py-3 fs-5"
                >
                  {c.name}
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center">
              <p>No categories found.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
