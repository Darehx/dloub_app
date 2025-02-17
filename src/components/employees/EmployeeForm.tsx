import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

interface JobPosition {
  id: number;
  name: string;
}

const EmployeeForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [position, setPosition] = useState<number | null>(null);
  const [jobPositions, setJobPositions] = useState<JobPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchJobPositions = async () => {
      try {
        const response = await api.get('/jobpositions/');
        setJobPositions(response.data);
      } catch (error) {
        console.error('Error fetching job positions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobPositions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para registrar un empleado.');
      return;
    }
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nombre de usuario"
        required
      />
      {/* Repite para otros campos */}
      <select
        value={position || ''}
        onChange={(e) => setPosition(Number(e.target.value))}
        required
      >
        <option value="">Selecciona un puesto</option>
        {jobPositions.map((job) => (
          <option key={job.id} value={job.id}>
            {job.name}
          </option>
        ))}
      </select>
      <button type="submit">Registrar Empleado</button>
    </form>
  );
};

export default EmployeeForm;