import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
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

  const carbonFromTravel = distance * 0.21; // kg CO2 per km
  const carbonFromElectricity = electricity * 0.92; // kg CO2 per kWh
  const carbonFromFuel = fuel * 2.31; // kg CO2 per liter
  const carbonFromMeat = meat * 27; // kg CO2 per kg meat
  const carbonFromWaste = waste * 1.9; // kg CO2 per kg waste
  const carbonFromWater = water * 0.0003; // kg CO2 per liter water

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
