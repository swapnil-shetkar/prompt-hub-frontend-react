import React, { useState, useEffect } from 'react';
import { Container, Row, Col, } from 'react-bootstrap';
import Layout from './layouts';
import { getProducts } from './apicore';
import Card from './card';
import Search from './search';

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = async () => {
    try {
      const data = await getProducts('sold');
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    } catch (error) {
      console.error('Error loading products by sell:', error);
      setError('Error loading products by sell');
    }
  };

  const loadProductsByArrival = async () => {
    try {
      const data = await getProducts('createdAt');
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    } catch (error) {
      console.error('Error loading products by arrival:', error);
      setError('Error loading products by arrival');
    }
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title="PromptHub"
      description="A vibrant marketplace for buying and selling prompts."
      className="container-fluid"
    >
      {error && <div className="alert alert-danger">{error}</div>}
      <Search />
      <Row>
        <Col>
          <h2 className="mb-4">New Arrival</h2>
        </Col>
      </Row>
      <Row>
        {productsByArrival.map((product) => (
          <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card product={product} />
          </Col>
        ))}
      </Row>

      <Row>
        <Col>
          <h2 className="mb-4">Best Sellers</h2>
        </Col>
      </Row>
      <Row>
        {productsBySell.map((product) => (
          <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card product={product} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default Home;