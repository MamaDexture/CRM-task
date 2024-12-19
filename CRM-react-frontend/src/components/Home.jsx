import React from "react";
import { Button, Container, Typography, Paper } from "@mui/material";
import CustomerTable from "./CustomerTable";

const Home = ({ customers, onEdit, onDelete }) => (
  <Container maxWidth="lg" sx={{ marginTop: 4 }}>
    <Typography variant="h4" gutterBottom>
      CRM - Customer Management
    </Typography>
    <Button
      variant="contained"
      color="primary"
      onClick={() => onEdit(null)}
      sx={{ marginBottom: "20px" }}
    >
      Create Customer
    </Button>
    <Paper elevation={3} sx={{ padding: 2 }}>
      <CustomerTable customers={customers} onEdit={onEdit} onDelete={onDelete} />
    </Paper>
  </Container>
);

export default Home;
