const express = require("express");
const WebSocket = require("ws");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

let auctionData = [];

// Obtiene las subastas desde el `Manager Service`
app.get("/auctions", async (req, res) => {
    try {
        const response = await axios.get("http://manager:8080/status");

        if (!response.data || !response.data.auctions.length) {
            return res.status(200).json({ message: "No auctions available. Please try later." });
        }

        auctionData = response.data.auctions;
        res.json({ auctions: auctionData });
    } catch (error) {
        console.error("Error fetching auctions:", error.message);
        res.status(500).json({ error: "Could not retrieve auctions from Manager Service." });
    }
});

// Servidor WebSocket para recibir actualizaciones
const server = app.listen(8081, () => console.log("Bidder service running on port 8081"));
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("WebSocket connection established");
    ws.send(JSON.stringify({ message: "Connected to Bidder Service", auctions: auctionData }));
});
