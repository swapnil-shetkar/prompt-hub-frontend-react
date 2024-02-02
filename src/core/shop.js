import React, { useState, useEffect } from "react";
import Card from "./card";
import Layout from "./layouts";
import { getCategories, getFilteredProducts } from "./apicore";
import Checkbox from "./checkbox";
import RadioBox from "./radiobox";
import { prices } from "./fixedprices";
import { Row, Col } from "react-bootstrap";
import CardSkeleton from './cardskeleton';

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const init = () => {
    getCategories()
      .then((data) => {
        if (data.error) {
          console.error(data.error);
          setError(data.error);
        } else {
          setCategories(data);
        }
      })
      .catch((error) => {
        console.error(error);
        setError("An unexpected error occurred.");
      });
  };

  const loadFilteredResults = (newFilters) => {
    setLoading(true); // Set loading to true when fetching data
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      setLoading(false); // Set loading to false once data is fetched
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layout
      title="Shop Page"
      description="Search and find books of your choice"
      className="container-fluid"
    >
      {error && <div className="alert alert-danger">{error}</div>}
      <Row>
        <Col md={4}>
        <h4>Filter by categories</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>

          <h4>Filter by price range</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </Col>
        <Col md={8}>
          <h2 className="mb-4">Products</h2>
          <Row>
            {loading ? (
              // Display 4 CardSkeleton horizontally
              Array.from({ length: 4 }).map((_, index) => (
                <Col xs={12} sm={6} md={3} key={index}>
                  <CardSkeleton cards={1} />
                </Col>
              ))
            ) : (
              // Display actual product cards once data is loaded
              filteredResults.map((product, i) => (
                <Col xs={12} sm={6} md={6} lg={4} key={i}>
                  <Card product={product} />
                </Col>
              ))
            )}
          </Row>
          <hr />
          {loadMoreButton()}
        </Col>
      </Row>
    </Layout>
  );
};


export default Shop;
