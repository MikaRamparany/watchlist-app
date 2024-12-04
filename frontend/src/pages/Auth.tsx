import React, { useState } from 'react';
import axios from 'axios';

const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleAuth = async () => {
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    try {
      const response = await axios.post(endpoint, { email, password });
      if (isLogin) {
        localStorage.setItem('token', response.data.token);
        alert('Connexion réussie.');
      } else {
        alert('Inscription réussie.');
        setIsLogin(true);
      }
    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">{isLogin ? 'Connexion' : "Inscription"}</h1>
      <input
        className="mb-2 p-2 border border-gray-300 rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mb-2 p-2 border border-gray-300 rounded"
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleAuth}
      >
        {isLogin ? 'Se connecter' : "S'inscrire"}
      </button>
      <p
        className="mt-4 text-sm text-gray-600 cursor-pointer"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Pas encore inscrit ? S'inscrire" : 'Déjà inscrit ? Se connecter'}
      </p>
    </div>
  );
};

export default Auth;
