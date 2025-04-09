
//gestionar las solicitudes HTTP , llamando a los servidores correspondientes y utilizando las vistas para presentar los datos 
//usa uperheroesService.mjs para acceder a los datos de superhéroes.
//usa  responseView.mjs para presentar los datos formateados en la respuesta.

import {   obtenerSuperheroePorId, obtenerTodosLosSuperheroes, buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30, crearNuevoSuperheroe,
    actualizarSuperheroe,
    eliminarSuperheroePorId,
    eliminarSuperheroePorNombre} from "../services/superheroesService.mjs";

import { renderizarListaSuperheroes, renderizarSuperheroe } from "../views/responseView.mjs";

export async function obtenerSuperheroePorIdController(req,res){
    const {id} = req.params; // Obtiene el ID del superhéroe de los parámetros de la URL.
    const superheroe = await obtenerSuperheroePorId(id); 

    if(superheroe){
        res.send(renderizarSuperheroe(superheroe)); // Si existe, renderiza y envía el superhéroe.
    }else{
        res.status(404).send({mensaje:"Superheroe no encontrado"}); // Si no existe, envía un mensaje de error 404.
    }
}

export async function obtenerTodosLosSuperheroesController(req,res){
    const superheroes = await obtenerTodosLosSuperheroes();
    console.log(superheroes.length) // Muestra en consola la cantidad de superhéroes obtenidos.
    res.send(renderizarListaSuperheroes(superheroes)); // Renderiza y envía la lista de superhéroes.
}

export async function buscarSuperheroesPorAtributoController(req,res){
    try{const {atributo, valor} = req.params; // Obtiene el atributo y su valor de los parámetros de la URL.
    const superheroes = await buscarSuperheroesPorAtributo(atributo,valor);

    if(superheroes.length > 0){
        res.send(renderizarListaSuperheroes(superheroes)); // Si encuentra resultados, renderiza y envía la lista de superhéroes.
    }else{
        res.status(404).send({mensaje: "No se encontraron superheroes con ese atributo"}) // Si no hay resultados, envía mensaje de error 404.
    }}catch(error){
        res.status(500).send('Error al buscar superhéroes por atributo');
    }
}



export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        res.status(200).send(renderizarListaSuperheroes(superheroes)); //Renderiza y envía la lista de superhéroes mayores de 30 años.
    } catch (error) {
        res.status(500).send('Error al obtener superhéroes mayores de 30 años'); // Captura errores y envía un mensaje de error 500.
    }
}



// -----------------------------------------------------------------

export async function crearNuevoSuperheroeController(req, res) {
    try {

        const datos = req.body;

        const superheroeCreado = await crearNuevoSuperheroe(datos);
        if (!superheroeCreado) {
            return res.status(404).send({ mensaje: 'Superhéroe nuevo no encontrado' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroeCreado);
        res.status(200).json(superheroeFormateado);

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al crear el nuevo superhéroe', error: error.message });
    }

}

export async function actualizarSuperheroeController(req, res) {
    try {

        const { id } = req.params;
        const datosActualizar = req.body;

        console.log(id);
        console.log(typeof (id));
        const superheroeActualizado = await actualizarSuperheroe(id, datosActualizar);

        if (!superheroeActualizado) {
            return res.status(404).send({ mensaje: 'Superhéroe a actualizar no encontrado.' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroeActualizado);
        res.status(200).json(superheroeFormateado);


    } catch (error) {
        res.status(500).send({ mensaje: 'Error al actualizar el superhéroe', error: error.message });
    }
}

export async function eliminarSuperheroePorIdController(req, res) {
    try {

        const { id } = req.params;

        const superheroeEliminado = await eliminarSuperheroePorId(id);
        if (!superheroeEliminado) {
            return res.status(404).send({ mensaje: 'Superhéroe a eliminar por ID no encontrado.' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
        res.status(200).json(superheroeFormateado);
        
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el superhéroe por ID', error: error.message });
    }
}

export async function eliminarSuperheroePorNombreController(req, res) {
    try {

        const { nombre } = req.params;

        const superheroeEliminado = await eliminarSuperheroePorNombre(nombre);
        if (!superheroeEliminado) {
            return res.status(404).send({ mensaje: 'Superhéroe a eliminar por nombre no encontrado.' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
        res.status(200).json(superheroeFormateado);
        
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el superhéroe por nombre', error: error.message });
    }
}