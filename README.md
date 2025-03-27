# Bidding System

A real-time bidding system that allows users to participate in auctions through a web interface. The system consists of:

**Manager Service:** Handles auction configurations.

**Bidder Service:** Allows users to place bids and receive updates.

**Frontend:** Displays auction information and provides a bidding interface.


**Team Contributions:**
- Nahomy	Developed the Manager Service, set up WebSocket communication, wrote Docker configurations, and ensured backend stability.
- Melisa	Designed and implemented the Frontend using React, connected it to the Bidder Service, and handled user interactions.
- Mateo	Developed the Bidder Service, implemented WebSocket updates, and worked on handling real-time bid placement.



## **How to Run the Project:**
The project is containerized using Docker, so it can be deployed easily.

**1. Running the Backend (Docker Containers)**
To start the services, run:
```
docker run -d --name bidding-system-manager mafuertes/bidding-system:manager
docker run -d --name bidding-system-bidder mafuertes/bidding-system:bidder
```

To stop the containers:

```
docker stop bidding-system-manager bidding-system-bidder
docker rm bidding-system-manager bidding-system-bidder
```

If you prefer not to use the image, you can alternatively run the services using Docker Compose:
```
docker-compose up
```


**2. Running the Frontend**
```
cd frontend
npm start
```


API Endpoints
Manager Service (http://localhost:8080)
POST /configure – Configure auctions.

GET /status – Get auction details.

Bidder Service (http://localhost:8081)
GET /auctions – Fetch auction list.

POST /bid – Place a bid.

## Arquitectura del Software

1. **Servicios**:
   - **Manager Service**: Manages auctions and their logic.
   - **Bidder Service**: Allows users to place bids in auctions.

2. **Tecnologías**:
   - **Backend**: Node.js with Express.
   - **Frontend**: React.
   - **WebSockets**: Used for real-time updates.
   - **Docker**: Both services run in Docker containers.

```
Bidding-system/
│
├── bidder-service/       # Code for the bidder service
├── frontend/             # Source code for the frontend application (React)
│   ├── node_modules/     # npm dependencies
│   ├── public/           # Static files (HTML, icons, etc.)
│   └── src/              # React components and logic
│
├── manager-service/      # Code for the auction manager service
│   ├── node_modules/     # npm dependencies
│   └── ...               # Configuration files and backend logic
│
└── docker-compose.yml    # Docker Compose configuration to bring up the services

```
