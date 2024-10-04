const crypto = require('crypto');

// AES Encryption
exports.aesEncrypt = (text, key) => {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

// AES Decryption
exports.aesDecrypt = (encrypted, key) => {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');  
  return decrypted;
};

// RSA Encryption
exports.rsaEncrypt = (text, publicKey) => {
  try {
    console.log("Texto:", text);
    console.log("Clave Pública:", publicKey);
    return crypto.publicEncrypt(publicKey, Buffer.from(text)).toString('hex');
  } catch (error) {
    console.error("Error al cifrar:", error);
    throw error; // Lanza el error para que el middleware de Express lo maneje
  }
};



// RSA Decryption
exports.rsaDecrypt = (encrypted, privateKey) => {
  const staticPrivateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArJ9HhjVQ6j4Nn9sGJb8L
Z6E9Dxy5k4W6N5oLp2hDBn5gY1Ak5N1jA7kFpFcFJQGx9OaH6qL7Tmyj09Grs5A4
D5B3hbb5yE91D9y4krKc5cr9nJ8MNXATZPQJt6sm9YwATKpLzxfG5zXs4FSKNwNA
4D/ToC7UuDN9vFKdd4gPBBGrWy61ZP0ci+5NjF9hzBtiHk0EhHqReJLDtxzM1E8Q
F7bY7Ew8GOM/rDytO8gkSR6xVtqfVtaZDEilU/IEoW7PKYX+Y1P7UIc+aAu0FS3F
4DUBvHo3ku8Ws5dPd3uTBAqxrD9OW9nF9Y0A1Q1TEZ/CzG6sp0E40ZT70ifLxy+O
wQIDAQAB
-----END PRIVATE KEY-----`;

  try {
    console.log('Texto cifrado para descifrar:', encrypted);
    console.log('Clave privada utilizada:', staticPrivateKey);
    const bufferEncrypted = Buffer.from(encrypted, 'hex');
    console.log('Buffer del texto cifrado:', bufferEncrypted); // Para ver el buffer
    return crypto.privateDecrypt(staticPrivateKey, bufferEncrypted).toString('utf8');
  } catch (error) {
    console.error('Error al descifrar:', error.message);
    console.error('Detalles del error:', error);
    throw error;
  }
};





// MD5 Hashing
exports.md5Hash = (data) => {
  return crypto.createHash('md5').update(data).digest('hex');
};
