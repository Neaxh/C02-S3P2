//gestionar las solicitudes HTTP , llamando a los servidores correspondientes y utilizando las vistas para presentar los datos 
import{Router} from'express'; // Importa Router desde Express para crear rutas 
import{
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    crearNuevoSuperheroeController,
    actualizarSuperheroeController,
    eliminarSuperheroePorIdController,
    eliminarSuperheroePorNombreController
} from '../controllers/superheroesController.mjs';   // Importa los controladores que manejan las operaciones para superhéroes

import { nuevoSuperHeroeValidationRules } from '../validation/validationRules.mjs';
import { handleValidationErrors } from '../validation/errorMiddleware.mjs';

const router = Router(); // Crea una instancia de Router para definir las rutas del módulo


// Define una ruta GET para obtener y buscar segun los controladores
router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);

//-------------------------------
//router.post('/heroes/crear', crearNuevoSuperheroeController);

router.post('/heroes/crear',
    nuevoSuperHeroeValidationRules(), // ✅ reglas
    handleValidationErrors,           // ✅ middleware de error
    crearNuevoSuperheroeController    // ✅ tu controlador original
);

router.put('/heroes/actualizar/:id', actualizarSuperheroeController);
router.delete('/heroes/eliminar/id/:id', eliminarSuperheroePorIdController);
router.delete('/heroes/eliminar/nombre/:nombre', eliminarSuperheroePorNombreController);

export default router;


/* ejemplo
http://localhost:3000/api/heroes
http://localhost:3000/api/heroes/672531113498a48a7ce9ea22
http://localhost:3000/api/heroes/mayores-30
http://localhost:3000/api/heroes/buscar/nombreSuperheroe/Superman
*/