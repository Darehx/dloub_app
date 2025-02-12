// src/components/employees/EmployeeForm.tsx
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

interface JobPosition {
  id: number;
  name: string;
}

const EmployeeForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [first_name, setFirstName] = useState<string>('');
  const [last_name, setLastName] = useState<string>('');
  const [position, setPosition] = useState<number | null>(null);
  const [jobPositions, setJobPositions] = useState<JobPosition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Cargar los puestos de trabajo al montar el componente
  useEffect(() => {
    const fetchJobPositions = async () => {
      try {
        const response = await api.get('/jobpositions/');
        setJobPositions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job positions:', error);
        setLoading(false);
      }
    };
    fetchJobPositions();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!position) {
      alert('Por favor, selecciona un puesto.');
      return;
    }
    try {
      await api.post('/employees/', {
        user: { username, email, password, first_name, last_name },
        position,
      });
      alert('Empleado registrado exitosamente');
    } catch (error) {
      console.error('Error registering employee:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Registrar Nuevo Empleado</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nombre de usuario"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        required
      />
      <input
        type="text"
        value={first_name}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Nombre"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        required
      />
      <input
        type="text"
        value={last_name}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Apellido"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        required
      />
      {loading ? (
        <p>Cargando puestos...</p>
      ) : (
        <select
          value={position || ''}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">Selecciona un puesto</option>
          {jobPositions.map((job) => (
            <option key={job.id} value={job.id}>
              {job.name}
            </option>
          ))}
        </select>
      )}
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-md"
      >
        Registrar Empleado
      </button>
    </form>
  );
};

export default EmployeeForm;