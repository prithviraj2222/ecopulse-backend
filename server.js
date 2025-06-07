import express from "express";
import cors from "cors";

const app = express();

// ✅ Set CORS for Netlify frontend
app.use(cors({
  origin: "https://684371c4ef497ab2dafc7099--legendary-taiyaki-caddff.netlify.app",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.post("/calculate", (req, res) => {
  const { distance, electricity, fuel, meat, waste, water } = req.body;

  if (
    typeof distance !== "number" ||
    typeof electricity !== "number" ||
    typeof fuel !== "number" ||
    typeof meat !== "number" ||
    typeof waste !== "number" ||
    typeof water !== "number"
  ) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  const carbonFromTravel = distance * 0.21;
  const carbonFromElectricity = electricity * 0.92;
  const carbonFromFuel = fuel * 2.31;
  const carbonFromMeat = meat * 27;
  const carbonFromWaste = waste * 1.9;
  const carbonFromWater = water * 0.0003;

  const totalCarbon =
    carbonFromTravel +
    carbonFromElectricity +
    carbonFromFuel +
    carbonFromMeat +
    carbonFromWaste +
    carbonFromWater;

  res.json({
    total: totalCarbon.toFixed(2),
    travel: carbonFromTravel.toFixed(2),
    electricity: carbonFromElectricity.toFixed(2),
    fuel: carbonFromFuel.toFixed(2),
    meat: carbonFromMeat.toFixed(2),
    waste: carbonFromWaste.toFixed(2),
    water: carbonFromWater.toFixed(2)
  });
});

// ✅ This is necessary for Render deployment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
