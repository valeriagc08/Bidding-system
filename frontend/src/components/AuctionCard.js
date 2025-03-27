import React, { useState } from "react";
import { Link } from "react-router-dom";

const AuctionCard = ({ auction }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      to={`/auction/${encodeURIComponent(auction.title)}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <article
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          borderRadius: "12px",
          marginBottom: "1.5rem",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          padding: "1.5rem",
          cursor: "pointer",
          transition: "transform 0.25s, box-shadow 0.25s",
          backgroundColor: "#fff",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.015)";
          e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
        }}
      >
        <figure
          style={{
            margin: 0,
            flexShrink: 0,
            marginRight: "1.5rem",
            width: "180px",
            height: "180px",
            backgroundColor: "#f9f9f9",
            border: "1px solid #eee",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {imageError ? (
            <span
              style={{
                color: "red",
                fontSize: "0.9rem",
                textAlign: "center",
              }}
            >
              Error al cargar<br />la imagen
            </span>
          ) : (
            <img
              src={auction.image}
              alt={auction.title}
              onError={() => setImageError(true)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
          )}
        </figure>

        <section>
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
              color: "#333",
            }}
          >
            {auction.title}
          </h3>
          
          {/* <p
            style={{
              fontSize: "1rem",
              color: "#777",
              marginBottom: "0.5rem",
            }}
          >
            {auction.description ? auction.description.slice(0, 100) + "..." : "Sin descripción"}
          </p> */}
          <p
            style={{
              fontSize: "0.9rem",
              color: "#999",
            }}
          >
            Pintor: {auction.painter ?? "Fecha no disponible"}
          </p>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#999",
            }}
          >
            Título: {auction.title ?? "Fecha no disponible"}
          </p>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#999",
            }}
          >
            Año: {auction.year  ?? "Fecha no disponible"}
          </p>
          <p
            style={{
              color: "#28a745",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Precio base: ${auction.price}
          </p>
          
        </section>
      </article>
    </Link>
  );
};

export default AuctionCard;
