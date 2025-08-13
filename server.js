const express = require("express");
const XLSX = require("xlsx");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

let registros = [];

app.use(express.json());
app.use(express.static("public")); // Carpeta para servir el HTML, CSS, JS

// Guardar datos del formulario
app.post("/registrar", (req, res) => {
  registros.push(req.body);
  res.sendStatus(200);
});

// Descargar Excel con los registros
app.get("/descargar-excel", (req, res) => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(registros);
  XLSX.utils.book_append_sheet(wb, ws, "Registros");

  const filePath = path.join(__dirname, "registros.xlsx");
  XLSX.writeFile(wb, filePath);

  res.download(filePath);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
