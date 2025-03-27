import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const AuctionPage = () => {
  const { title } = useParams();
  const [auction, setAuction] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/auctions")
      .then((res) =>
        setAuction(
          res.data.auctions.find(
            (a) => a.title.toLowerCase() === title.toLowerCase()
          )
        )
      )
      .catch((err) => console.error(err));
  }, [title]);

  if (!auction)
    return (
      <div style={{ textAlign: "center", color: "gray", marginTop: "2rem" }}>
        Auction not found.
      </div>
    );

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "2rem auto",
        padding: "1.5rem",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          padding: "2rem",
        }}
      >
        {/* Imagen de la subasta */}
        <div
          style={{
            alignSelf: "center",
            border: "1px solid #eee",
            borderRadius: "8px",
            padding: "1rem",
            backgroundColor: "#fafafa",
            maxWidth: "300px",
            maxHeight: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={auction.image}
            alt={auction.title}
            style={{
              width: "70%",
              height: "70%",
              objectFit: "contain",
              borderRadius: "4px",
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = ""; 
              e.target.alt = "Imagen no disponible";
            }}
          />
        </div>

{/* Información de la subasta */}
<div>
  <h2
    style={{
      fontSize: "2rem",
      color: "#333",
      marginBottom: "1rem",
      textAlign: "center",
    }}
  >
    Obra: {auction.title}
  </h2>

  <div style={{ textAlign: "left", maxWidth: "500px", margin: "0 auto" }}>
    <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: "0.5rem" }}>
      <strong>Pintor:</strong> {auction.painter}
    </p>
    <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: "0.5rem" }}>
      <strong>Título:</strong> {auction.title}
    </p>
    <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: "0.5rem" }}>
      <strong>Año:</strong> {auction.year}
    </p>
    <p
      style={{
        fontSize: "1.5rem",
        color: "green",
        fontWeight: "bold",
        marginTop: "1rem",
      }}
    >
      Precio base: ${auction.price}
    </p>
  </div>
</div>



        {/* Botón de regreso */}
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link
            to="/"
            style={{
              color: "#007bff",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "1rem",
            }}
          >
            ← Back to Auctions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuctionPage;
