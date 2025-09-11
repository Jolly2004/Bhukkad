import http from "http";
import mongoose from "mongoose";

const PORT = 5000;
const MONGO_URI = "mongodb+srv://sarthakbhagwat314_db_user:Uh1Yezdz7HHdia81@cluster0.okeup8s.mongodb.net/testdb?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Simple HTTP server
const server = http.createServer((req, res) => {
  if (req.url === "/check-db") {
    const connectionState = mongoose.connection.readyState;
    let status = "Unknown";

    if (connectionState === 0) status = "Disconnected";
    if (connectionState === 1) status = "Connected";
    if (connectionState === 2) status = "Connecting";
    if (connectionState === 3) status = "Disconnecting";

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ database: "MongoDB Atlas", status }));
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Server is running. Go to /check-db to see DB status.");
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
