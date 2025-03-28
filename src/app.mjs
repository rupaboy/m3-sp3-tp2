import express from 'express';
import { connectDB } from './config/dbConfig.mjs'
import router from './routes/superHeroRoutes.mjs'
import bodyParser from 'body-parser'

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware para parsear JSON
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

//Conexión a MongoDB
connectDB();

//Configuración de rutas
app.use('/api', router);

//Manejo de errores para rutas no encontradas
app.use((req,res) => {
    res.status(404).send({ mensaje: 'Ruta no encontrada.'});
});

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
