const express = require("express");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let auctions = [];
let wsClients = [];

//  Ruta para agregar subastas desde React
app.post("/create-auction", (req, res) => {
    const { title, price, order, image, painter, year } = req.body;

    if (!title || !price || !order || !image || !painter || !year) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    const newAuction = {
        id: Date.now().toString(),
        title,
        price: Number(price),
        order: Number(order),
        image,
        painter,
        year
    };

    auctions.push(newAuction);
    auctions.sort((a, b) => a.order - b.order);

    wsClients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ message: "Nueva subasta agregada!", auctions }));
        }
    });

    console.log("Auction added:", newAuction);
    res.json({ message: "Subasta agregada correctamente!", auctions });
});



// Ruta para obtener el estado de las subastas
app.get("/status", (req, res) => {
    res.json({ auctions });
});

// Servidor WebSocket para actualizaciones en tiempo real
const server = app.listen(8080, () => console.log("Manager service running on port 8080"));
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    wsClients.push(ws);
    console.log("Nueva conexión WebSocket establecida");

    //  Notificar a los postores si no hay subastas configuradas
    if (auctions.length === 0) {
        ws.send(JSON.stringify({ message: "No hay subastas aún. Espera la configuración del administrador." }));
    } else {
        ws.send(JSON.stringify({ auctions }));
    }

    ws.on("close", () => {
        wsClients = wsClients.filter(client => client !== ws);
    });
});

app.put("/update-auction/:id", (req, res) => {
    const { id } = req.params;
    const { title, price, order, image, painter, year } = req.body;

    const index = auctions.findIndex((a) => a.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Subasta no encontrada." });
    }

    auctions[index] = {
        ...auctions[index],
        title,
        price: Number(price),
        order: Number(order),
        image,
        painter,
        year
    };

    auctions.sort((a, b) => a.order - b.order);
    res.json({ message: "Subasta actualizada correctamente", auctions });
});

app.delete("/delete-auction/:id", (req, res) => {
    const { id } = req.params;

    const index = auctions.findIndex((a) => a.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Subasta no encontrada." });
    }

    auctions.splice(index, 1); 

    res.json({ message: "Subasta eliminada correctamente", auctions });
});
