//inicializar el servidor , conectar con la BD y cargas las rutas para gestionar todas las solicitudes relacionadas con los superheroes
import express from 'express'; 
import { connectDB } from './config/dbConfig.mjs'; 
import superHeroRoutes from './routes/superHeroRoutes.mjs'; 

const app = express(); 
const PORT = process.env.PORT || 3000; 

// Middleware para parsear JSON 
app.use(express.json()); 

// Conexión a MongoDB 
connectDB(); 

// Configuración de rutas 
app.use('/api', superHeroRoutes); 

// Manejo de errores para rutas no encontradas 
app.use((req, res) => { 
    res.status(404).send({ mensaje: "Ruta no encontrada" }); 
}); 

// Iniciar el servidor 
app.listen(PORT, () => { 
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`); 
}); 

/* ejemplo
http://localhost:3000/api/heroes
http://localhost:3000/api/heroes/672531113498a48a7ce9ea22
http://localhost:3000/api/heroes/mayores-30
http://localhost:3000/api/heroes/buscar/nombreSuperheroe/Superman
*/