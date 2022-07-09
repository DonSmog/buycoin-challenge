import React from "react";
import "./filter.css";

function Filter({ setSortBy, group }) {
  return (
    <div className="filter">
      <button
        disabled={group.length === 0}
        onClick={() => setSortBy("popularity")}
      >
        Popularity
      </button>
      <button
        disabled={group.length === 0}
        onClick={() => setSortBy("publishedAt")}
      >
        Published At
      </button>
    </div>
  );
}

export default Filter;
