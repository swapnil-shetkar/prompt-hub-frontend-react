import React from "react";

const ShowImage = ({ product }) => {
    if (!product || !product.photo || !product.photo.data) {
      return null; // Or render a placeholder image or handle it in a way that makes sense for your application
    }
  
    return (
      <div className="product-img">
        <img
          src={product.photo.data}
          alt={product.name}
          className="mb-3"
          style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
      </div>
    );
  };
  

export default ShowImage;
