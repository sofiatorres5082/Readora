# 🌟 **Readora** 🌟  
Una aplicación web para explorar y gestionar libros digitales, utilizando la API de Gutendex. Readora combina un backend potente con una interfaz elegante para ofrecer una experiencia única a los amantes de la lectura.

---

## ☆ ───── **Características principales** ✨───── ☆

### 📖 **Sección de Libros**  
- **Búsqueda de libros**: Encuentra libros por título a través de la API de Gutendex.  
- **Biblioteca Personal**: Almacenamiento automático de libros consultados.  
- **Filtrado por Idiomas**: Filtra los libros almacenados en español, inglés, francés y chino.  
- **Detalles Completos**: Visualización detallada de la información de cada libro.  

### 📊 **Sección de Estadísticas**  
- **Distribución de idiomas**: Visualiza la cantidad de libros disponibles por idioma.  
- **Popularidad por descargas**: Estadísticas sobre descargas totales por idioma.  

### ✍️ **Sección de Autores**  
- **Filtro por año**: Encuentra autores vivos en un año específico.  
- **Catálogo de autores**: Lista detallada con información sobre los autores almacenados.  
- **Relación libros-autores**: Detalles completos de cada autor junto con los libros que escribieron.  

---

## ☆ ───── **Tecnologías utilizadas** 🛠️  ───── ☆

### **Backend**  
| Herramienta       | Uso                            |  
| ----------------- | ------------------------------ |  
| **Java 17**       | Lenguaje principal.            |  
| **PostgreSQL**    | Base de datos.                 |  
| **Spring Boot**   | Framework de desarrollo.       |  
| **JPA Hibernate** | Mapeo objeto-relacional.       |  
| **Maven**         | Gestión de dependencias.       |  
| **Jackson**       | Procesamiento de JSON.         |  

### **Frontend**  
| Herramienta          | Uso                   |  
| -------------------- | --------------------- |  
| **React**            | Biblioteca principal. |  
| **Axios**            | Cliente HTTP.         |  
| **Tailwind CSS**     | Estilos y diseño.     |  
| **React Router DOM** | Enrutamiento.         |  

---

## ☆ ───── **Estructura del proyecto** 📂  ───── ☆

```bash
Readora/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   ├── com.readora.Readora
│   │   │   │   │   ├── config/
│   │   │   │   │   ├── controller/
│   │   │   │   │   ├── dto/
│   │   │   │   │   ├── model/
│   │   │   │   │   ├── repository/
│   │   │   │   │   └── service/
│   │   │   │   └── ReadoraApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   └── pom.xml
└── frontend/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── pages/
    │   └── services/
    ├── .env
    ├── package.json
    └── tailwind.config.js
```

---
## ☆ ───── **Capturas de pantalla** ───── ☆

✨ **Interfaz del proyecto**  



---
