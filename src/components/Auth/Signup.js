import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function Signup (){
   

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [code, setCode] = useState('');
    const [role, setRole] = useState('Devellopeurs'); // Définition de l'état pour le rôle de l'utilisateur
    const [developerType, setDeveloperType] = useState('UI/UX Design'); // Définition de l'état pour le type de développeur

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleDeveloperTypeChange = (event) => {
        setDeveloperType(event.target.value);
    };

   

        const handleSubmit = async (event) => {
            event.preventDefault();
        
            try {
                let userData = {
                    nom: firstName,
                    prenom: lastName,
                    email: email,
                    password: password,
                };
        
                if (role === 'Devellopeurs') {
                    userData = {
                        ...userData,
                       
                        type: developerType,
                    };
                } else {
                    userData = {
                        ...userData,
                        code: code, // ou tout autre champ pertinent pour les autres rôles
                    };
                }
        
                // Envoyer une requête POST au backend avec les informations d'inscription adaptées au rôle sélectionné
                await axios.post(`http://localhost:3000/api/${role}/signup`, userData);
        
                // Rediriger l'utilisateur vers la page de connexion après l'inscription
                window.location.href = `${process.env.PUBLIC_URL}/sign-in?role=${role}`;
        } catch (error) {
            // Gérer les erreurs en cas de problème lors de l'inscription
            console.error('Error signing up:', error);
        }
    };

    return(
        <div className="main p-2 py-3 p-xl-5 ">
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <div className="body d-flex p-0 p-xl-5">
            <div className="container-xxl">
                <div className="row g-0">
                    <LeftSide />
        <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
            <div className="w-100 p-3 p-md-5 card border-0 bg-dark text-light" style={{maxWidth: "32rem"}}>
                <form className="row g-1 p-3 p-md-4" onSubmit={handleSubmit}>
                    <div className="col-12 text-center mb-1 mb-lg-5">
                        <h1>Create your account</h1>
                        <span>Free access to our dashboard.</span>
                    </div>
                    <div className="col-6">
                        <div className="mb-2">
                            <label className="form-label">First name</label>
                            <input type="text" className="form-control form-control-lg" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-2">
                            <label className="form-label">Last name</label>
                            <input type="text" className="form-control form-control-lg" placeholder="Parker" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-2">
                            <label className="form-label">Email address</label>
                            <input type="email" className="form-control form-control-lg" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-2">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control form-control-lg" placeholder="8+ characters required" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-2">
                            <label className="form-label">Confirm password</label>
                            <input type="password" className="form-control form-control-lg" placeholder="8+ characters required" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-2">
                            <label className="form-label">Role</label>
                            <select className="form-select form-select-lg" value={role} onChange={handleRoleChange}>
                                <option value="Devellopeurs">Devellopeurs</option>
                                <option value="ProductOwners">ProductOwners</option>
                                <option value="scrumMasters">scrumMasters</option>
                            </select>
                        </div>
                    </div>
                    {(role === 'Devellopeurs') && (
                        <div className="col-12">
                            <div className="mb-2">
                                <label className="form-label">Developer Type</label>
                                <select className="form-select form-select-lg" value={developerType} onChange={handleDeveloperTypeChange}>
                                    <option value="UI/UX Design">UI/UX Design</option>
                                    <option value="Website Design">Website Design</option>
                                    <option value="App Development">App Development</option>
                                    <option value="Quality Assurance">Quality Assurance</option>
                                    <option value="Development">Development</option>
                                    <option value="Backend Development">Backend Development</option>
                                    <option value="Software Testing">Software Testing</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="SEO">SEO</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    )}
                    {(role !== 'Devellopeurs') && (
                        <div className="col-12">
                            <div className="mb-2">
                                <label className="form-label">Code</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} />
                            </div>
                        </div>
                    )}
                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                I accept the <a href="#!" title="Terms and Conditions" className="text-secondary">Terms and Conditions</a>
                            </label>
                        </div>
                    </div>
                    <div className="col-12 text-center mt-4">
                        <button type="submit" className="btn btn-lg btn-block btn-light lift text-uppercase" alt="SIGNUP">SIGN UP</button>
                    </div>
                    <div className="col-12 text-center mt-4">
                        <span className="text-muted">Already have an account? <Link to={`${process.env.PUBLIC_URL}/sign-in`} title="Sign in" className="text-secondary">Sign in here</Link></span>
                    </div>
                </form>
            </div>
        </div>
       </div>
       </div>
       </div>
       </div>
    );
}

export default Signup;//To ignore, add // eslint-disable-next-line to the line before.
