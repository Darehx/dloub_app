// src/components/orders/OrderForm.tsx
import React, { useState } from 'react';
import api from '../../utils/api';

interface OrderFormProps {
  customerId: number;
}

const OrderForm: React.FC<OrderFormProps> = ({ customerId }) => {
  const [services, setServices] = useState<{ service: number; quantity: number }[]>([]);
  const [note, setNote] = useState<string>('');

  const handleAddService = () => {
    setServices([...services, { service: 0, quantity: 1 }]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post('/orders/', {
        customer: customerId,
        services: services.map((s) => ({
          service: s.service,
          quantity: s.quantity,
        })),
        note,
      });
      alert('Orden creada exitosamente');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Crear Nueva Orden</h2>
      {services.map((service, index) => (
        <div key={index} className="flex space-x-2">
          <input
            type="number"
            value={service.service}
            onChange={(e) =>
              setServices(
                services.map((s, i) =>
                  i === index ? { ...s, service: parseInt(e.target.value) } : s
                )
              )
            }
            placeholder="ID del servicio"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            value={service.quantity}
            onChange={(e) =>
              setServices(
                services.map((s, i) =>
                  i === index ? { ...s, quantity: parseInt(e.target.value) } : s
                )
              )
            }
            placeholder="Cantidad"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddService}
        className="px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Agregar Servicio
      </button>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Notas adicionales"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-md"
      >
        Crear Orden
      </button>
    </form>
  );
};

export default OrderForm;