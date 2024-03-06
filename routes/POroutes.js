const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const ProductOwner = require('../models/Po');
const { generateJWTToken } = require('../utils/authUtils');
const { isValidPassword } = require('../utils/Verifier');
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');

router.post('/reset-password-email', async (req, res) => {
  const { email, password } = req.body;

  const user = await ProductOwner.findOne({ email });

  if (!user) {
    return res.status(404).send("Email not found");
  }

  // Hacher le nouveau mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Mettre à jour l'utilisateur avec le nouveau mot de passe
  await user.updateOne({ email }, { password: hashedPassword });

  res.status(200).send("Password reset successfully");
});
router.get('/check-email', async (req, res) => {
  try {
      const { email } = req.query;
      const user = await ProductOwner.findOne({ email });
      res.status(200).json({ exists: !!user });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});
router.post('/', async (req, res) => {
    try {
      const { nom, prenom, email, password, code } = req.body;
  
      const existingUser = await ProductOwner.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Cet utilisateur existe déjà' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await ProductOwner.create({ nom, prenom, email, password: hashedPassword, CodePo });
  
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
router.post('/signup', async (req, res) => {
  try {
    const { nom, prenom, email, password, code } = req.body;

    const existingUser = await ProductOwner.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet ProductOwner existe déjà' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = await ProductOwner.create({ nom, prenom, email, password: hashedPassword, CodePo: code });
    

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await ProductOwner.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    if (!user.password) {
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }

    const isPasswordValid = await isValidPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = generateJWTToken(user);
    localStorage.setItem('token', token);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
