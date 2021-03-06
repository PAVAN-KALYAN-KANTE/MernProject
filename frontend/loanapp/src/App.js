import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/admin/AdminDashboard";
import CustomerDashboard from "./components/customer/CustomerDashboard";
import Expired from "./components/Expired";
import LendorDashboard from "./components/lender/LenderDashboard";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/lender/dashboard" element={<LendorDashboard />} />
        <Route path="/expired" element={<Expired />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
