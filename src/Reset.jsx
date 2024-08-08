import React, { useState } from 'react';
import { auth } from './firebase'; // Asegúrate de que la ruta sea correcta
import { sendPasswordResetEmail } from 'firebase/auth';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Se ha enviado un correo para restablecer la contraseña. Revisa tu bandeja de entrada.');
        } catch (error) {
            console.error("Error al enviar el correo de restablecimiento:", error);
            setMessage('Error al enviar el correo. Asegúrate de que el correo esté registrado.');
        }
    };

    return (
        <div>
            <h1>Restablecer Contraseña</h1>
            <form onSubmit={handleResetPassword}>
                <input
                    type="email"
                    placeholder="Ingresa tu correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Enviar Correo de Restablecimiento</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;
