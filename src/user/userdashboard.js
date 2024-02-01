import React, { useState, useEffect } from 'react';
import Layout from '../core/layouts';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getPurchaseHistory } from './apiuser';

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setHistory(data);
        }
      })
      .catch((error) => console.log('Error fetching purchase history:', error.message));
  };

  useEffect(() => {
    init(_id, token);
  }, [_id, token]);

  const userLinks = () => {
    return (
      <div className="card ">
        <h3 className="card-header">User Links</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              My cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              Update profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information </h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = (history) => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        <ul className="list-group">
          {history.map((h, index) => (
            <li key={index} className="list-group-item">
              {h.products.map((p, i) => (
                <div key={i}>
                  <hr />
                  <h6>Product name: {p.name}</h6>
                  <h6>Product price: ${p.price}</h6>
                  <h6>Purchased date: {moment(p.createdAt).fromNow()}</h6>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Layout title="Dashboard" description={`G'day ${name} !`} className="container-fluid">
      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
