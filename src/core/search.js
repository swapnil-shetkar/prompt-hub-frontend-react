import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apicore";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Card from './card';
const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    console.log(search, category);
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>

        <Row>
          {results.map((product, i) => (
            <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
              <Card key={i} product={product} />
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  const searchForm = () => (
    <Form onSubmit={searchSubmit}>
      <Form.Group controlId="searchForm">
        <Form.Label srOnly>Search</Form.Label>
        <Form.Control
          type="search"
          placeholder="Search by name"
          onChange={handleChange("search")}
        />
        <Form.Control as="select" onChange={handleChange("category")}>
          <option value="All">All</option>
          {categories.map((c, i) => (
            <option key={i} value={c._id}>
              {c.name}
            </option>
          ))}
        </Form.Control>
        <Button type="submit" variant="primary">
          Search
        </Button>
      </Form.Group>
    </Form>
  );

  return (
    <Container fluid>
      <Container className="mb-3">{searchForm()}</Container>
      <Container fluid className="mb-3">
        {searchedProducts(results)}
      </Container>
    </Container>
  );
};

export default Search;