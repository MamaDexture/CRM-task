import React, { useState, useEffect } from "react";
import { createCustomer, updateCustomer } from "../services/api";

const CustomerModal = ({ data, onClose }) => {
  const isEdit = data !== null; // Determine if it's edit mode
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({}); // Track form validation errors
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent duplicate submissions

  // Populate form data in edit mode
  useEffect(() => {
    if (isEdit && data) {
      setFormData(data);
    }
  }, [data, isEdit]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error for the field
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      if (isEdit) {
        await updateCustomer(data.id, formData);
      } else {
        await createCustomer(formData);
      }
      onClose(); // Close modal and refresh the list
    } catch (error) {
      console.error("Error saving customer:", error);
      alert("An error occurred while saving the customer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{isEdit ? "Edit Customer" : "Create Customer"}</h2>
        <form>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>
          <div className="modal-actions">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isEdit ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;
