import React, { useState } from 'react';
import { auth,provider } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom'; 
import { signInWithPopup } from 'firebase/auth';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            login(email, password);
        } else {
            register(email, password);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
            navigate('/home');
        } catch (error) {
            console.error("Error al iniciar sesión con Google:", error);
            alert("Error al iniciar sesión. Intenta nuevamente.");
        }
    };


    // Función para verificar si el usuario ya existe
    const checkUserExists = async (email) => {
        const methods = await fetchSignInMethodsForEmail(auth, email);
        return methods.length > 0;
    };

    // Función de registro
    const register = async (email, password) => {
        const userExists = await checkUserExists(email);
        if (userExists) {
            alert("Este correo electrónico ya está registrado. Intenta iniciar sesión.");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Usuario registrado:", userCredential.user);
                navigate('/home'); 
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert("Error en el registro: " + errorMessage);
            });
    };

    // Función de inicio de sesión
    const login = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Usuario logueado:", userCredential.user);
                navigate('/home');
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert("Error en el login: " + errorMessage);
            });
    };

    return (
        <div>
            <h2>{isLogin ? "Login" : "Registro"}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">{isLogin ? "Iniciar Sesión" : "Registrar"}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia Sesión"}
            </button>
            <button onClick={handleGoogleSignIn}>Iniciar sesión con Google</button>
            <a href="/recuperar">¿Olvidaste tu contraseña?</a>
        </div>
    );
};

export default Auth;
