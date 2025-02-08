// src/components/dashboard/Dashboard.tsx
import React from 'react';
import OrderForm from '../components/orders/OrderForm';
import ServiceForm from '../components/services/ServiceForm';
import EmployeeForm from '../components/employees/EmployeeForm';

const Dashboard: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Crear Nueva Orden</h2>
        <OrderForm customerId={1} />
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Agregar Nuevo Servicio</h2>
        <ServiceForm />
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Registrar Nuevo Empleado</h2>
        <EmployeeForm />
      </section>
    </div>
  );
};

export default Dashboard;