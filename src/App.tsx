import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import Dashboard from "./layouts/Dashboard";
import ProductsList from "./pages/ProductsList";
import AddProduct from "./pages/AddProduct";
import AddCategory from "./pages/AddCategory";
import Cart from "./pages/Cart";


const App: React.FC = () => {

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </div>
  )
}

export default App
