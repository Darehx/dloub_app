dloub/
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── auth/         # Componentes relacionados con autenticación
│   │   ├── customers/    # CRUD para clientes
│   │   ├── employees/    # CRUD para empleados
│   │   ├── orders/       # Gestión de órdenes y pedidos
│   │   ├── services/     # Gestión de servicios, sub-servicios, paquetes y campañas
│   │   ├── dashboard/    # Componentes del dashboard
│   │   └── shared/       # Componentes compartidos (tablas, formularios, modales)
│   ├── layouts/          # Layouts globales
│   │   └── Layout.astro  # Layout principal
│   ├── pages/            # Páginas de Astro
│   │   ├── index.astro   # Página inicial (Login)
│   │   └── dashboard.astro # Página del dashboard
│   ├── hooks/            # Hooks personalizados
│   │   └── useApi.ts     # Hook para manejar llamadas a la API
│   ├── context/          # Contextos globales
│   │   └── AuthContext.tsx # Contexto de autenticación
│   ├── utils/            # Funciones utilitarias
│   │   └── api.ts        # Configuración de Axios
│   └── types/            # Tipos de TypeScript
│       └── api.ts        # Tipos relacionados con la API
├── public/               # Archivos estáticos
├── astro.config.mjs      # Configuración de Astro
└── package.json          # Dependencias y scripts