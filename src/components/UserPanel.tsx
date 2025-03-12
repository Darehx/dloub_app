// src/components/UserPanel.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';



 

interface User {
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
}

interface Order {
  id: number;
  status: string;
  total_amount: number;
}

const UserPanel: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await api.get(`/customers/${username}/`);
        setUser(userResponse.data);

        const ordersResponse = await api.get(`/customers/${username}/orders/`);
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [username]);

  if (!user) {
    return (
      <div className="p-8">
        <Skeleton height={30} width={200} />
        <Skeleton height={20} width={150} />
        <Skeleton height={20} width={150} />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Bienvenido, {user.first_name} {user.last_name}</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Teléfono:</strong> {user.phone}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Dirección:</strong> {user.address}
        </p>
      </div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Historial de Pedidos</h2>
      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Estado</th>
            <th className="py-2 px-4 border-b">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b">{order.status}</td>
              <td className="py-2 px-4 border-b">${order.total_amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPanel;