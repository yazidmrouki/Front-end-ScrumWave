import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const storedRole = localStorage.getItem("role");
  const handleSubmit = async (event) => {
    event.preventDefault();
 console.log(storedRole);
    if (password !== confirmPassword) {
      // Afficher un message d'erreur indiquant que les mots de passe ne correspondent pas
      console.error("Passwords do not match.");
      return;
    }

    const apiUrl = `http://localhost:3000/api/${storedRole}/reset-password-email`;

    const body = {
      email,
      password,
    };

    try {
      const response = await axios.post(apiUrl, body);
 
       
      if (response.status === 200) {
        console.log("Email sent with reset instructions");
        window.location.href = `${process.env.PUBLIC_URL}/sign-in`;
      } else {
        console.error("Error sending email:", response.data);
        // Afficher un message d'erreur à l'utilisateur
      }
    } catch (error) {
      console.error("Error sending email:", error);
      // Afficher un message d'erreur à l'utilisateur
    }
  };

  return (
    <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
      <div className="w-100 p-3 p-md-5 card border-0 bg-dark text-light" style={{ maxWidth: "32rem" }}>
        <form className="row g-1 p-3 p-md-4" onSubmit={handleSubmit}>
          <div className="col-12 text-center mb-1 mb-lg-5">
            <h1>Réinitialiser le mot de passe</h1>
            <span>
              Entrez l'adresse email que vous avez utilisée lors de votre inscription et votre nouveau mot de passe. Nous vous enverrons un email avec un lien pour confirmer la réinitialisation de votre mot de passe.
            </span>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <label className="form-label">Adresse email</label>
              <input
                type="email"
                className="form-control form-control-lg text-center"
                placeholder="Entrez votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <label className="form-label">Nouveau mot de passe</label>
              <input
                type="password"
                className="form-control form-control-lg text-center"
                placeholder="Entrez votre nouveau mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <label className="form-label">Confirmer le mot de passe</label>
              <input
                type="password"
                className="form-control form-control-lg text-center"
                placeholder="Confirmez votre nouveau mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-12 text-center mt-4">
            <button type="submit" className="btn btn-lg btn-block btn-light lift text-uppercase">
              Envoyer
            </button>
          </div>
          <div className="col-12 text-center mt-4">
            <span className="text-muted">
            <Link to={`${process.env.PUBLIC_URL}/sign-in`} className="text-secondary">
                Back to Sign in
              </Link>
            </span>
          </div>
        </form>
      </div>
            </div>
        )
    }


export default  ResetPassword;