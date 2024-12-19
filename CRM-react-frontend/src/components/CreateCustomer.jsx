import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "../services/api";
import { TextField, Button, Grid, Container, Typography } from "@mui/material";

const CreateCustomer = ({ onCustomerCreated }) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error for the field
  };

  const validate = () => {
    const newErrors = {};
    // Name validation
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    
    // Phone validation (ensuring it's numeric and at least 10 digits long)
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{11}$/.test(formData.phone)) {
      newErrors.phone = "Phone number should be 11 digits.";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await createCustomer(formData);
      onCustomerCreated();
      navigate("/"); // Redirect to home
    } catch (error) {
      console.error("Error creating customer:", error);
      alert("An error occurred while creating the customer.");
    }
  };

  return (
    <Container maxWidth="sm" style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>Create Customer</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Grid item>
            <Button type="submit" variant="contained" color="primary" size="large">
              Create
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              size="large"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateCustomer;
