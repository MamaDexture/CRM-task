import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { fetchCustomers, deleteCustomer } from "./services/api";
import Home from "./components/Home";
import CreateCustomer from "./components/CreateCustomer";
import EditCustomer from "./components/EditCustomer";

const App = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const data = await fetchCustomers();
    setCustomers(data);
  };

  const handleDelete = async (id) => {
    await deleteCustomer(id);
    loadCustomers(); // Refresh data
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            customers={customers}
            onEdit={(customer) =>
              handleNavigate(customer ? `/edit/${customer.id}` : "/create")
            }
            onDelete={handleDelete}
          />
        }
      />
      <Route path="/create" element={<CreateCustomer onCustomerCreated={loadCustomers} />} />
      <Route path="/edit/:id" element={<EditCustomer onCustomerUpdated={loadCustomers} />} />
    </Routes>
  );
};

export default () => (
  <Router>
    <App />
  </Router>
);
