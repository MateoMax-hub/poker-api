
# Poker Planning Backend 🌐🚀

Backend desarrollado con **Node.js** y **Express** para gestionar la lógica del servidor y las API de la aplicación **Poker Planning**. Este servidor es el núcleo de la comunicación entre los clientes y el procesamiento de datos.

---

## 🎯 Funcionalidades Principales

- **Gestión de sesiones**: Creación, actualización y eliminación de sesiones de Poker Planning.  
- **Socket.IO**: Para la interacción en tiempo real
- **APIs RESTful**: Endpoints bien estructurados para interactuar con el frontend.  

---

## 🚀 Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.  
- **Express**: Framework minimalista para la creación de aplicaciones web.  
- **dotenv**: Manejo de variables de entorno.  
- **Nodemon**: Reinicio automático del servidor durante el desarrollo.  
- **Socket.IO**: Para habilitar la interacción en tiempo real.  

---

## ⚙️ Instalación

Sigue estos pasos para poner en marcha el backend en tu entorno local:  

1. Clona el repositorio:  
   ```bash
   git clone https://github.com/MateoMax-hub/poker-api.git
   ```
2. Accede al directorio del proyecto:  
   ```bash
   cd poker-planning-backend
   ```
3. Instala las dependencias:  
   ```bash
   npm install
   ```
4. Configura las variables de entorno:  
   - Crea un archivo `.env` en la raíz del proyecto.  
   - Define las siguientes variables:  
     ```env
     PORT=3001
     DATABASE_URL=tu-url-de-base-de-datos
     JWT_SECRET=tu-clave-secreta
     ```
5. Inicia el servidor en modo desarrollo:  
   ```bash
   npm run dev
   ```
6. El servidor estará disponible en [http://localhost:3001](http://localhost:3001).  

---


## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas agregar nuevas funcionalidades, corregir errores o mejorar la documentación:  

1. Haz un fork del repositorio.  
2. Crea una rama para tu funcionalidad o corrección:  
   ```bash
   git checkout -b mi-nueva-funcionalidad
   ```
3. Realiza tus cambios y haz un commit:  
   ```bash
   git commit -m "Descripción breve del cambio"
   ```
4. Sube los cambios:  
   ```bash
   git push origin mi-nueva-funcionalidad
   ```
5. Abre un Pull Request.  

---
