import express from "express";
import { procesarSignup, procesarLogin, logout } from "../controllers/authController.js";

const router = express.Router();

// Mostrar formularios
router.get('/signup', (req, res) => res.render('auth/signup', { error: null }));
router.get('/login', (req, res) => res.render('auth/login', { error: null }));

router.post("/signup", procesarSignup);
router.post("/login", procesarLogin);
router.get("/logout", logout);

export default router;