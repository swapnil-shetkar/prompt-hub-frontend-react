import { Routes, Route  } from "react-router-dom";
import Signin from "./user/signin";
import Signup from "./user/signup";
import Home from "./core/home";
import Dashboard from "./user/userdashboard";
import PrivateRoutes from "./auth/privateroute";
import AdminRoutes from "./auth/adminroute";
import AdminDashboard from "./user/admindashboard";
import AddCategory from "./admin/addcategory";
import AddProduct from "./admin/addproduct";
import Shop from "./core/shop";
import Product from "./core/product";
import Cart from "./core/cart";
import Orders from "./admin/order";
import Profile from "./user/profile";
import ManageProducts from "./admin/manageproducts";
import UpdateProduct from "./admin/updateproduct";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<Dashboard />} path="/user/dashboard" />
          <Route element={<Profile />} path="/profile/:userId" />
        </Route>

        <Route element={< AdminRoutes/>}>
          <Route element={<AdminDashboard />} path="/admin/dashboard" />
          <Route element={<AddCategory />} path="/create/category" />
          <Route element={<AddProduct />} path="/create/product" />
          <Route element={<Orders />} path="/admin/orders" />
          <Route element={<ManageProducts />} path="/admin/products" />
          <Route element={<UpdateProduct />} path="/admin/product/update/:productId" />
        </Route>

      </Routes>
    </div>
  );
}
export default App;
