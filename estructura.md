dloub/
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── auth/         # Componentes relacionados con autenticación
│   │   │   ├── Login.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── customers/    # CRUD para clientes
│   │   │   ├── CustomerList.tsx
│   │   │   ├── CustomerForm.tsx
│   │   │   └── CustomerDetail.tsx
│   │   ├── dashboard/    # Componentes del dashboard
│   │   │   ├── Dashboard.tsx
│   │   │   └── Sidebar.tsx
│   │   └── shared/       # Componentes compartidos
│   │       ├── Modal.tsx
│   │       ├── Table.tsx
│   │       └── Form.tsx
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