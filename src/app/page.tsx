'use client';

import { useState } from 'react';

const Home = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleSubmit = async () => {
    const response = await fetch('https://iloveyou-backend.fly.dev/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-xl font-bold">Iniciar Intenção de Compra</h1>
        <input
          className="w-full p-2 mb-4 border"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full p-2 mb-4 border"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="p-2 text-white bg-blue-500 rounded"
          onClick={handleSubmit}
        >
          Finalizar
        </button>
      </div>
    </div>
  );
};

export default Home;
