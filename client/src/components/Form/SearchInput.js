import React from "react";
import { useSearch } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const { search, setSearch } = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${search.keyword}`
      );
      // make sure data is an array or extract correct key
      const resultsArray = Array.isArray(data) ? data : data.products || [];
      setSearch({ ...search, results: resultsArray });
      navigate("/search");
    } catch (error) {
      console.log("Search error:", error);
    }
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search.keyword}
          onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
