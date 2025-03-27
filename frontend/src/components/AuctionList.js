import React, { useState, useEffect } from "react";
import axios from "axios";
import AuctionCard from "./AuctionCard";

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/auctions")
      .then((res) => setAuctions(res.data.auctions || []))
      .catch(() => setError("Error al cargar las subastas."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p style={{ textAlign: "center", color: "#666" }}>
        Cargando subastas...
      </p>
    );
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", color: "red" }}>
        {error}
      </p>
    );
  }

  if (auctions.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#666" }}>
       ¡Ups! Aún no hay subastas activas. <br />
       Estamos preparando algo especial para ti. ¡Vuelve más tarde y no te lo pierdas!
      </p>
    );
  }

  return (
    <main
      style={{
        margin: "0 auto",
        maxWidth: "800px", // Ancho máximo para las tarjetas
        padding: "1rem"
      }}
    >
      {auctions.map((auction, index) => (
        <AuctionCard key={index} auction={auction} />
      ))}
    </main>
  );
};

export default AuctionList;
