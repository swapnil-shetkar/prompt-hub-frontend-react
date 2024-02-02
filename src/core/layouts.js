import React from 'react';
import Menu from './menu';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles.css';

const Layout = ({
    title = 'Title',
    description = 'Description',
    className,
    children
}) => (
    <div  >
        
            
                <Menu />
           
        <Row>
            <Col >
            <div className="jumbotron">
                <h1>{title}</h1>
                <p className="lead">{description}</p>
             </div>
            </Col>
        </Row>
        <Row className="p-3">
            <Col className={className}>{children}</Col>
        </Row>
        </div>
);

export default Layout;