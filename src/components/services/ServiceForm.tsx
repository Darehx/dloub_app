// src/components/services/ServiceForm.tsx
import React, { useState } from 'react';
import api from '../../utils/api';

const ServiceForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post('/services/', { name, description, price });
      alert('Servicio creado exitosamente');
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Agregar Nuevo Servicio</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del servicio"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        placeholder="Precio"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-md"
      >
        Crear Servicio
      </button>
    </form>
  );
};

export default ServiceForm;