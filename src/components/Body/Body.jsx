import React, { useState, useEffect, useCallback } from "react";
import "./body.css";
import { HashLoader } from "react-spinners";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { useQuery } from "react-query";
import Search from "../Search/Search";
import Filter from "../Filter/Filter";

function Body() {
  const [page, setPage] = useState(1);
  const [group, setGroup] = useState([]);
  const [searchTerm, setSearchTerm] = useState("bitcoin");
  const [sortBy, setSortBy] = useState("");

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getData = useCallback(
    ({ queryKey }) => {
      console.log("queryKey", queryKey);
      return axios.get(
        "https://newsapi.org/v2/everything?q=" +
          searchTerm +
          "&language=en&from=2022-07-01&page=" +
          queryKey[1] +
          "&sortBy=" +
          sortBy +
          "&apiKey=" +
          process.env.REACT_APP_API_KEY
      );
    },
    [searchTerm, sortBy]
  );

  const { isLoading, data, isError } = useQuery(
    [searchTerm + sortBy, page],
    getData,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  useEffect(() => {
    if (isLoading) {
      return;
    } else if (isError) {
      return;
    } else {
      const groupData = data.data.articles.reduce((group, product) => {
        const { publishedAt } = product;
        const date = new Date(publishedAt);
        const dateString = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        group[dateString] = group[dateString] ?? [];
        group[dateString].push(product);
        return group;
      }, {});

      const convertGroupData = Object.entries(groupData).map(
        ([date, articles]) => {
          return {
            title: date,
            articles,
          };
        }
      );
      setGroup(convertGroupData);
    }
  }, [isLoading, data, searchTerm, setGroup, isError]);

  const year = new Date().getFullYear();

  return (
    <div className="body">
      <Search setSearchTerm={setSearchTerm} />
      <Filter setSortBy={setSortBy} group={group} />

      {isLoading ? (
        <HashLoader color="#007ee5" />
      ) : (
        <>
          {isError ? (
            <h1>
              Sorry, my daily limit has been exceeded. <br /> Please try again
              tomorrow. Thank you.
            </h1>
          ) : (
            <div className="body_content">
              {group
                .sort((a, b) => {
                  return new Date(b.title) - new Date(a.title);
                })
                .map((group) => {
                  return (
                    <div className="body-section" key={uuid()}>
                      <h2>{group.title}</h2>

                      {group.articles.map((article) => {
                        const { title, url, urlToImage, description, author } =
                          article;
                        return (
                          <div className="body-section_items" key={uuid()}>
                            <img src={urlToImage} alt={title} />
                            <div>
                              <p>
                                <b>Title: </b>
                                {title}
                              </p>
                              <p>
                                <b>Author: </b>
                                {author}
                              </p>
                              <p>
                                <b>Description: </b> {description}
                              </p>
                              <a href={url} target="_blank" rel="noreferrer">
                                Read More Here
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}

              <div className="pagination">
                <button
                  disabled={page === 1}
                  onClick={() => {
                    setPage((old) => old - 1);
                    goToTop();
                  }}
                >
                  Prev
                </button>

                <button
                  disabled={page === Math.ceil(data.data.totalResults / 100)}
                  onClick={() => {
                    setPage((old) => old + 1);
                    goToTop();
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <h5>Samuel Olufeyimi {year} </h5>
    </div>
  );
}

export default Body;
