import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles.css'; 

const AdminPanel = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [order, setOrder] = useState("");
  const [image, setImage] = useState("");
  const [auctions, setAuctions] = useState([]);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [painter, setPainter] = useState("");
  const [year, setYear] = useState("");


  useEffect(() => {
    loadAuctions();
  }, []);

  const loadAuctions = () => {
    axios
      .get("http://localhost:8080/status")
      .then((res) => setAuctions(res.data.auctions || []))
      .catch((err) => console.error("Error fetching auctions:", err));
  };

  const createAuction = (e) => {
    e.preventDefault();
    const newAuction = { title, price, order, image, painter, year };


    axios
      .post("http://localhost:8080/create-auction", newAuction)
      .then((res) => {
        setMessage(res.data.message);
        setTitle("");
        setPrice("");
        setOrder("");
        setImage("");
        setPainter("");
        setYear("");
        loadAuctions();
      })
      .catch((err) => console.error("Error creating auction:", err));
  };

  const updateAuction = (id, updatedData) => {
    axios
      .put(`http://localhost:8080/update-auction/${id}`, updatedData)
      .then(() => {
        setMessage("Subasta actualizada con éxito");
        setEditingId(null);
        loadAuctions();
      })
      .catch((err) => console.error("Error updating auction:", err));
  };

  const deleteAuction = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta subasta?")) {
      axios
        .delete(`http://localhost:8080/delete-auction/${id}`)
        .then(() => {
          setMessage("Subasta eliminada");
          loadAuctions();
        })
        .catch((err) => console.error("Error deleting auction:", err));
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f9" }}>
      <h2>Admin Panel - Crear Subasta</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}

      <form
        onSubmit={createAuction}
    
    style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",         
        maxWidth: "100%",               
        width: "100%",
        paddingInline: "1rem",        
        boxSizing: "border-box",
    }}


      >
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Orden"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="URL de la imagen"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          style={inputStyle}
        />
        <input
            type="text"
            placeholder="Pintor"
            value={painter}
            onChange={(e) => setPainter(e.target.value)}
            required
            style={inputStyle}
            />
            <input
            type="number"
            placeholder="Año"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            style={inputStyle}
            />

        <button type="submit" style={buttonStyle}>
          Agregar Subasta
        </button>
      </form>

      <h2>Lista de Subastas</h2>
      {auctions.length === 0 ? (
        <p>No hay subastas aún.</p>
      ) : (
        <div 
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          width: "100%",
          paddingInline: "1rem",
          boxSizing: "border-box",
        }}
      >
      
          {auctions.map((auction) =>
            editingId === auction.id ? (
              <EditableAuctionCard
                key={auction.id}
                auction={auction}
                onCancel={() => setEditingId(null)}
                onSave={(updated) => updateAuction(auction.id, updated)}
              />
            ) : (
              <AuctionCard
                key={auction.id}
                auction={auction}
                onEdit={() => setEditingId(auction.id)}
                onDelete={() => deleteAuction(auction.id)}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

//  Tarjeta de vista normal
const AuctionCard = ({ auction, onEdit, onDelete }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article style={cardStyle}>
      <figure style={figureStyle}>
        {imageError ? (
          <span style={errorStyle}>Error al cargar<br />la imagen</span>
        ) : (
          <img
            src={auction.image}
            alt={auction.title}
            onError={() => setImageError(true)}
            style={imgStyle}
          />
        )}
      </figure>
      <section style={{ flex: 1 }}>
        <h3 style={titleStyle}>{auction.title}</h3>
        <p style={priceStyle}>Precio: ${auction.price}</p>
        <p style={textStyle}>Orden: {auction.order}</p>
        <p style={textStyle}>Url: {auction.image}</p>
        <p style={textStyle}>Pintor: {auction.painter}</p>
       
        <p style={textStyle}>Año: {auction.year}</p>
        
        
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={onEdit} style={editButtonStyle}>Editar</button>
          <button onClick={onDelete} style={deleteButtonStyle}>Eliminar</button>
        </div>
      </section>
    </article>
  );
};

//  Tarjeta en modo edición
const EditableAuctionCard = ({ auction, onCancel, onSave }) => {
    const [formData, setFormData] = useState({
        title: auction.title,
        price: auction.price,
        order: auction.order,
        image: auction.image,
        painter: auction.painter || "",
        year: auction.year || "",
        });
      
  const [imageError, setImageError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={cardStyle}>
      <figure style={figureStyle}>
        {imageError ? (
          <span style={errorStyle}>Error al cargar<br />la imagen</span>
        ) : (
          <img
            src={formData.image}
            alt={formData.title}
            onError={() => setImageError(true)}
            style={imgStyle}
          />
        )}
      </figure>
      <section style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          type="number"
          value={formData.order}
          onChange={(e) => setFormData({ ...formData, order: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          type="text"
          value={formData.image}
          onChange={(e) => {
            setImageError(false);
            setFormData({ ...formData, image: e.target.value });
          }}
          required
          style={inputStyle}
        />
        <input
        type="text"
        value={formData.painter}
        onChange={(e) => setFormData({ ...formData, painter: e.target.value })}
        required
        style={inputStyle}
        />
        <input
        type="number"
        value={formData.year}
        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
        required
        style={inputStyle}
        />


        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button type="submit" style={buttonStyle}>Guardar</button>
          <button type="button" onClick={onCancel} style={cancelButtonStyle}>Cancelar</button>
        </div>
      </section>
    </form>
  );
};

//  Estilos
const inputStyle = {
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "100%",
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const cancelButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#999",
};

const editButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#007bff",
};

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#dc3545",
};

const cardStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "12px",
    width: "100%",             
    maxWidth: "900px",    
    minWidth: "300px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    padding: "1.5rem",
    backgroundColor: "#fff",
    flexWrap: "wrap",
    boxSizing: "border-box",
};

const figureStyle = {
  margin: 0,
  flexShrink: 0,
  marginRight: "1.5rem",
  width: "150px",
  height: "150px",
  backgroundColor: "#f9f9f9",
  border: "1px solid #eee",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const imgStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "6px",
};

const errorStyle = {
  color: "red",
  fontSize: "0.9rem",
  textAlign: "center",
};

const titleStyle = {
  fontSize: "1.25rem",
  fontWeight: "600",
  marginBottom: "0.5rem",
  color: "#333",
};

const priceStyle = {
  color: "#28a745",
  fontWeight: "bold",
  fontSize: "1rem",
  marginBottom: "0.5rem",
};

const textStyle = {
    fontSize: "0.9rem",
    color: "#999",
  };
