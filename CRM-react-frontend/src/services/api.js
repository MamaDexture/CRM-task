import axios from "axios";

const API_URL = "http://localhost:5000/api/customers"; 

// Fetch all customers
export const fetchCustomers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

// Create a new customer
export const createCustomer = async (customerData) => {
  try {
    const response = await axios.post(API_URL, customerData);
    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

// Update an existing customer
export const updateCustomer = async (id, customerData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, customerData);
    return response.data;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

// Fetch a single customer by ID
export const fetchCustomerById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`); 
      return response.data;
    } catch (error) {
      console.error("Error fetching customer by ID:", error);
      throw error;
    }
  };
  
// Delete a customer
export const deleteCustomer = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};
