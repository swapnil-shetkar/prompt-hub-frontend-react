import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './layouts';
import { getCart } from './carthelpers';
import Card from './card';
import Checkout from './checkout';
import { Container, Row, Col } from 'react-bootstrap';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = items => {
    return (
      <Container>
        <Row>
          <Col>
            <h2>Your cart has {`${items.length}`} items</h2>
            <hr />
            {items.map((product, i) => (
              <Card
                key={i}
                product={product}
                showAddToCartButton={false}
                // cartUpdate={true}
                showRemoveProductButton={true}
                setRun={setRun}
                run={run}
              />
            ))}
          </Col>
        </Row>
      </Container>
    );
  };

  const noItemsMessage = () => (
    <Container>
      <Row>
        <Col>
          <h2>
            Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
          </h2>
        </Col>
      </Row>
    </Container>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add remove checkout or continue shopping."
      className="container-fluid"
    >
      <Container>
        <Row>
          <Col md={6}>{items.length > 0 ? showItems(items) : noItemsMessage()}</Col>

          <Col md={6}>
            <h2 className="mb-4">Your cart summary</h2>
            <hr />
            <Checkout products={items} setRun={setRun} run={run} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Cart;