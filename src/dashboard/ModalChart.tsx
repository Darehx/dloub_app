import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { mockData } from './data';

interface Filters {
  dateRange: string;
  category: string;
  metric: string; // Nueva propiedad para seleccionar métrica
}

interface ModalChartProps {
  type: 'sales' | 'orders';
  onClose: () => void;
}

const ModalChart: React.FC<ModalChartProps> = ({ type, onClose }) => {
  const [filters, setFilters] = React.useState<Filters>({
    dateRange: 'all',
    category: 'all',
    metric: 'revenue' // Valor predeterminado
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Filtrar datos según los filtros seleccionados
  const filteredData = mockData.sales.monthlyTrend
    .filter(item => {
      if (filters.dateRange === 'last3') {
        return mockData.sales.monthlyTrend.indexOf(item) >= 
               mockData.sales.monthlyTrend.length - 3;
      }
      return true;
    })
    .map(item => ({
      ...item,
      revenue: filters.category === 'digital' ? mockData.sales.categoryBreakdown.digital : item.revenue,
      orders: filters.metric === 'orders' ? item.orders : item.revenue
    }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-2xl w-11/12 max-w-4xl relative">
        <button onClick={onClose} className="text-white absolute top-2 right-2 text-2xl">
          &times;
        </button>
        
        <div className="flex gap-4 mb-4">
          {/* Filtro de rango de fechas */}
          <select 
            name="dateRange"
            value={filters.dateRange}
            onChange={handleFilterChange}
            className="bg-gray-700 p-2 rounded"
          >
            <option value="all">Todo</option>
            <option value="last3">Últimos 3 meses</option>
            <option value="custom">Personalizado</option>
          </select>

          {/* Filtro de categoría */}
          <select 
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="bg-gray-700 p-2 rounded"
          >
            <option value="all">Todas</option>
            <option value="digital">Digital</option>
            <option value="physical">Físico</option>
          </select>

          {/* Filtro de métrica */}
          <select 
            name="metric"
            value={filters.metric}
            onChange={handleFilterChange}
            className="bg-gray-700 p-2 rounded"
          >
            <option value="revenue">Ingresos</option>
            <option value="orders">Órdenes</option>
          </select>
        </div>

        {type === 'sales' && (
          <BarChart width={730} height={400} data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey={filters.metric} fill="#facc15" />
          </BarChart>
        )}

        {type === 'orders' && (
          <LineChart width={730} height={400} data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={filters.metric} stroke="#14b8a6" />
          </LineChart>
        )}
      </div>
    </div>
  );
};

export default ModalChart;