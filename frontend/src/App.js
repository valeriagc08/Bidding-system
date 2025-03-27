import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ReactComponent as ListIcon } from './assets/icons/list.svg'; 
import { ReactComponent as AdminIcon } from './assets/icons/admin.svg'; 

import AuctionList from "./components/AuctionList";
import AuctionPage from "./components/AuctionPage";
import AdminPanel from "./components/AdminPanel";

function App() {
  return (
    <Router>
      <div
        style={{
          fontFamily: "Segoe UI, sans-serif",
          backgroundColor: "#f4f6f8",
          minHeight: "100vh"
        }}
      >
        {/* Encabezado */}
        <header
          style={{
            backgroundColor: "#ffffff",
            padding: "1.5rem 2rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            marginBottom: "1rem",
            textAlign: "center"
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#333",
              margin: 0
            }}
          >
            Remote Auction System
          </h1>
        </header>

        {/* Navegación */}
        <nav
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            backgroundColor: "#ffffff",
            padding: "1rem",
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            borderBottom: "1px solid #e0e0e0",
            marginBottom: "2rem"
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "#007bff",
              fontWeight: "500",
              fontSize: "1.1rem"
            }}
          >
            <ListIcon
              style={{ width: 20, height: 20, marginRight: "0.5rem" }}
            />
            Subastas
          </Link>
          <Link
            to="/admin"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "#007bff",
              fontWeight: "500",
              fontSize: "1.1rem"
            }}
          >
            <AdminIcon
              style={{ width: 20, height: 20, marginRight: "0.5rem" }}
            />
            Administración
          </Link>
        </nav>

        {/* Contenido */}
        <main
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "1rem"
          }}
        >
          <Routes>
            <Route path="/" element={<AuctionList />} />
            <Route path="/auction/:title" element={<AuctionPage />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
