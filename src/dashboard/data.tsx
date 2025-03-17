export interface SalesData {
    month: string;
    revenue: number;
    orders: number;
  }
  
  export interface Service {
    id: number;
    name: string;
    status: string;
  }
  
  export interface Order {
    id: number;
    client: string;
    amount: number;
    date: string;
    status: string; // Agregado para resolver el error
  }
  
  export interface Invoice {
    id: number;
    amount: number;
    status: string;
  }
  
  export interface Provider {
    id: number;
    name: string;
    service: string;
  }
  
  export interface Employee {
    id: number;
    name: string;
    role: string;
  }
  
  export interface Sales {
    totalRevenue: number;
    pendingPayments: number; // Agregado para resolver el error
    monthlyTrend: SalesData[];
    categoryBreakdown: {
      digital: number;
      physical: number;
    };
  }
  
  export interface Orders {
    total: number;
    status: {
      pending: number;
      processing: number;
      completed: number;
    };
    recent: Order[]; // Usamos la interfaz Order aquí
  }
  
  export interface MockData {
    sales: Sales;
    services: Service[];
    orders: Orders;
    invoices: Invoice[];
    providers: Provider[];
    employees: Employee[];
  }
  
  export const mockData: MockData = {
    sales: {
      totalRevenue: 50000,
      pendingPayments: 15, // Valor agregado
      monthlyTrend: [
        { month: 'Ene', revenue: 12000, orders: 40 },
        { month: 'Feb', revenue: 18000, orders: 55 },
        { month: 'Mar', revenue: 15000, orders: 50 },
        { month: 'Abr', revenue: 22000, orders: 65 },
        { month: 'May', revenue: 25000, orders: 70 },
        { month: 'Jun', revenue: 28000, orders: 75 }
      ],
      categoryBreakdown: {
        digital: 32000,
        physical: 18000
      }
    },
    services: [
      { id: 1, name: "Branding Premium", status: "Activo" },
      { id: 2, name: "Desarrollo Web", status: "En proceso" },
      { id: 3, name: "Gestión de Redes", status: "Finalizado" },
    ],
    orders: {
      total: 120,
      status: {
        pending: 15,
        processing: 30,
        completed: 75
      },
      recent: [
        { 
          id: 101, 
          client: 'Cliente A', 
          amount: 2500, 
          date: '2023-03-15',
          status: 'Pendiente' // Agregado
        },
        { 
          id: 102, 
          client: 'Cliente B', 
          amount: 1800, 
          date: '2023-03-18',
          status: 'Completado' // Agregado
        }
      ]
    },
    invoices: [
      { id: 201, amount: 1200, status: "Pagado" },
      { id: 202, amount: 800, status: "Pendiente" },
    ],
    providers: [
      { id: 301, name: "Proveedor X", service: "Impresión" },
      { id: 302, name: "Proveedor Y", service: "Hosting" },
    ],
    employees: [
      { id: 401, name: "John Doe", role: "Diseñador" },
      { id: 402, name: "Jane Smith", role: "Desarrollador" },
    ],
  };