const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let liveData = {
  location: "N/A",
  people: 0,
  risk: "LOW"
};

function calculateRisk(people) {
  if (people >= 300) return "HIGH";
  if (people >= 100) return "MEDIUM";
  return "LOW";
}

app.post("/sensor", (req, res) => {
  const { location, people } = req.body;

  liveData = {
    location,
    people,
    risk: calculateRisk(people)
  };

  res.json({ message: "sensor data received" });
});

app.get("/status", (req, res) => {
  res.json(liveData);
});

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
