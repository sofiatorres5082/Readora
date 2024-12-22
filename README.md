# Readora



[Inicio] - Breve introducción al catálogo.
[Libros] - Búsqueda, guardado y detalle de libros.
    - Libros almacenados.
    - Filtro por idioma.
[Autores] - Listado de autores y consulta de vivos por año.
[Estadísticas] - Gráficos o datos sobre libros y autores.


☆ ───── **Estructura del proyecto** ───── ☆
```bash 
Readora/
├── backend/
│   ├── src/
│   └── pom.xml
├── frontend/
│   ├── src/
│   └── package.json
└──  README.md
```

 ☆ ───── **Estructura del backend** ───── ☆

```bash 
backend/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── readora/
│   │   │           ├── config/              # Configuraciones generales (CORS, etc.)
│   │   │           │      └── WebConfig.java
│   │   │           ├── controller/          # Controladores de las rutas
│   │   │           │      └── ApiController.java     
│   │   │           ├── service/             # Lógica de negocio
│   │   │           │      └── BookService.java
│   │   │           ├── repository/          # Interacción con la base de datos
│   │   │           │      └── BookRepository.java
│   │   │           ├── model/               # Entidades JPA (Book, Author)
│   │   │           │      ├── Book.java
│   │   │           │      └── Author.java
│   │   │           ├── dto/                 # Clases de transferencia de datos (opcional)
│   │   │           │      └── BookDTO.java
│   │   │           └── ReadoraApplication.java  # Clase principal de Spring Boot
│   │   └── resources/
│   │       ├── application.properties       # Configuración de la aplicación
│   │       └── data.sql                     # Opcional: datos iniciales para la BD
│   │
├── pom.xml                                   # Dependencias y configuración del backend
└── target/                                   # Carpeta generada al compilar el proyecto
                             
```

☆ ───── **Estructura del frontend** ───── ☆
```bash 
frontend/
│
├── /public                # Archivos estáticos, favicon, index.html
│   ├── favicon.ico
│   └── index.html
├── /src
│   ├── /assets            # Archivos estáticos como imágenes y estilos CSS
│   │   └── logo.svg
│   ├── /components        # Componentes reutilizables (Navbar, Footer, etc.)
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── /pages             # Páginas principales (Home, Libros, Autores)
│   │   ├── Home.jsx
│   │   ├── Books.jsx
│   │   └── Authors.jsx
│   ├── /services          # Llamadas a la API con Axios
│   │   └── api.js
│   ├── App.jsx            # Componente raíz de la aplicación
│   └── index.js           # Punto de entrada principal
├── package.json           # Configuración del proyecto y dependencias
├── tailwind.config.js     # Configuración de Tailwind CSS
└── vite.config.js         # Configuración de Vite
```