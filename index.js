const express = require('express');
const cors = require('cors'); // Importa CORS

const app = express();
const encryptionRoutes = require('./routes/encryptionRoutes');

app.use(cors({
  origin: 'https://cifrar-front.vercel.app', // Permite el acceso solo desde este dominio
}));
app.use(express.json());
app.use('/api', encryptionRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
