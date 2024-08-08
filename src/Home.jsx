import React from "react";
import { auth } from './firebase'; // Asegúrate de que la ruta sea correcta
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/'); 
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            alert("Error al cerrar sesión. Intenta nuevamente.");
        }
    };

  return (
    <div>
      <p>Bienvenido a la app</p>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Sunt animi at dicta? Recusandae, totam perferendis. Aut, ab. Eos fugiat minus labore excepturi enim iure soluta aperiam voluptate, obcaecati non maiores?</p>
        <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Home;
