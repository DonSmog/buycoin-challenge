import React, { useState } from "react";
import "./search.css";

function Search({ setSearchTerm }) {
  const [search, setSearch] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (search !== "") {
      setSearchTerm(search);
      setSearch("");
    }
  };

  const handleSearchChange = (e) => {
    let value = e.target.value;
    setSearch(value);
  };

  return (
    <form onSubmit={handleOnSubmit} className="form">
      <input
        className="search"
        type="text"
        placeholder="Search for News"
        value={search}
        onChange={handleSearchChange}
      />
      <input
        disabled={search === ""}
        type="submit"
        value="Search"
        className="submit"
      />
    </form>
  );
}

export default Search;
