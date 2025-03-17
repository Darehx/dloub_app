import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { mockData } from "./data";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import ModalChart from './ModalChart';

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const [expandedChart, setExpandedChart] = useState<'sales' | 'orders' | null>(null);

  return (
   // En Dashboard.tsx
<div className="w-full min-h-screen flex flex-col items-center justify-start p-6 text-amber-50 bg-gray-900">
  <div className="max-w-7xl w-full mx-auto">
    <h1 className="text-4xl font-extrabold mb-6 text-white text-center">Dashboard</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {[
        { 
          title: "Ventas", 
          content: (
            <>
              <p className="text-lg">Ingresos: <span className="font-semibold">${mockData.sales.totalRevenue}</span></p>
              <p className="text-lg">Órdenes: <span className="font-semibold">{mockData.orders.total}</span></p>
              <p className="text-lg">Pagos Pendientes: <span className="text-red-400 font-semibold">{mockData.sales.pendingPayments}</span></p>
            </>
          )
        },
        { 
          title: "Gráfica de Ventas", 
          content: (
            <div className="cursor-pointer" onClick={() => setExpandedChart('sales')}>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={mockData.sales.monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                  <XAxis dataKey="month" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#facc15" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )
        },
        { 
          title: "Órdenes por Mes", 
          content: (
            <div className="cursor-pointer" onClick={() => setExpandedChart('orders')}>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={mockData.sales.monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                  <XAxis dataKey="month" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Line type="monotone" dataKey="orders" stroke="#14b8a6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )
        },
        { 
          title: "Últimos Servicios", 
          content: mockData.services.map((service) => (
            <p key={service.id} className="text-lg">{service.name} - <span className="font-semibold text-blue-300">{service.status}</span></p>
          ))
        },
        { 
          title: "Últimos Pedidos", 
          content: mockData.orders.recent.map((order) => (
            <p key={order.id} className="text-lg">
              {order.client} - 
              <span className={`font-semibold ${order.status === 'Completado' ? 'text-green-300' : 'text-yellow-300'}`}>
                {order.status}
              </span>
            </p>
          ))
        },
      ].map((panel, index) => (
        <div key={index} className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 hover:shadow-xl transition-all flex flex-col justify-center items-center text-center">
          <h2 className="text-2xl font-bold mb-3 text-white">{panel.title}</h2>
          <div className="space-y-2 w-full">{panel.content}</div>
        </div>
      ))}
    </div>
  </div>

  {expandedChart && (
    <ModalChart 
      type={expandedChart}
      onClose={() => setExpandedChart(null)}
    />
  )}
</div>
  );
};

export default Dashboard;