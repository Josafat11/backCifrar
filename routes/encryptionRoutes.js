const express = require('express');
const router = express.Router();
const encryptionController = require('../controllers/encryptionController');

// Ruta para cifrado AES
router.post('/encrypt/aes', (req, res) => {
  const { text, key } = req.body;
  const encrypted = encryptionController.aesEncrypt(text, key);
  res.json({ encrypted });
});

// Ruta para descifrado AES
router.post('/decrypt/aes', (req, res) => {
  const { encrypted, key } = req.body;
  const decrypted = encryptionController.aesDecrypt(encrypted, key);
  res.json({ decrypted });
});

// Ruta para cifrado RSA
router.post('/encrypt/rsa', (req, res) => {
  const { text, publicKey } = req.body;
  console.log('Texto:', text); // Muestra el texto que se intenta cifrar
  console.log('Clave pública:', publicKey); // Muestra la clave pública
  try {
    const encrypted = encryptionController.rsaEncrypt(text, publicKey);
    res.json({ encrypted });
  } catch (error) {
    console.error('Error al cifrar:', error); // Muestra el error si ocurre
    res.status(500).json({ error: 'Error al cifrar el texto' });
  }
});


// Ruta para descifrado RSA
router.post('/decrypt/rsa', (req, res) => {
  const { encrypted, privateKey } = req.body;
  console.log('Texto cifrado:', encrypted); // Muestra el texto cifrado
  console.log('Clave privada:', privateKey); // Muestra la clave privada
  try {
    const decrypted = encryptionController.rsaDecrypt(encrypted, privateKey);
    res.json({ decrypted });
  } catch (error) {
    console.error('Error al descifrar:', error); // Muestra el error si ocurre
    res.status(500).json({ error: 'Error al descifrar el texto' });
  }
});



// Ruta para generar hash MD5
router.post('/hash/md5', (req, res) => {
  const { data } = req.body;
  const hash = encryptionController.md5Hash(data);
  res.json({ hash });
});

module.exports = router;
