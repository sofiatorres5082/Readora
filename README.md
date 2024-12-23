# 🌟 **Readora** 🌟  

Una aplicación web para explorar y gestionar libros digitales, utilizando la API de Gutendex. 

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

<p align="center">
  <img src="https://github.com/user-attachments/assets/6bdd6b82-03a5-446d-b445-a68f303a96f3" alt="LandingPage" width="45%"/>
  <img src="https://github.com/user-attachments/assets/80a24569-aa91-4a9e-8810-b1bce1a6c2f4" alt="BooksPage" width="45%"/>
  <img src="https://github.com/user-attachments/assets/58986034-921b-44a1-9a87-ffe879cd9f8c" alt="BooksSearch" width="45%"/>
  <img src="https://github.com/user-attachments/assets/24b6a7c6-e139-4120-b90f-0a6a16d34fcc" alt="BooksFilter" width="45%"/>
  <img src="https://github.com/user-attachments/assets/3e1c8eb6-b995-45ab-9fed-824f04006bc4" alt="BookDetail" width="45%"/>
  <img src="https://github.com/user-attachments/assets/08ac397f-3386-408d-bc04-f9ad5df4f7b1" alt="AuthorsPage" width="45%"/>
  <img src="https://github.com/user-attachments/assets/981b47ca-fb4a-4988-8f05-52c13aaec80c" alt="AuthorDetail" width="45%"/>
  <img src="https://github.com/user-attachments/assets/8538d16f-22b5-48c4-a795-137ee62d8f8e" alt="Stats" width="45%"/>
</p>

---
