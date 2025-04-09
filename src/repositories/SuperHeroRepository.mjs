/* implementa los metodos definidos en la interfaz*/
import SuperHero from "../models/SuperHero.mjs";
 // Importa el modelo SuperHero, que representa la estructura de los datos de un superhéroe
import IRepository from "./IRepository.mjs";
// Importa la interfaz IRepository que define los métodos requeridos



// Define la clase SuperHeroRepository que extiende IRepository, lo cual significa que debe implementar sus métodos
class SuperHeroRepository extends IRepository{
  async obtenerPorId(id){
    return await SuperHero.findById(id); // / Usa findById del modelo SuperHero para buscar por ID en la base de datos
  
  }

  async obtenerTodos(){
    return await SuperHero.find({}); // Usa find sin condiciones para obtener todos los superheroe
  }

  async buscarPorAtributo(atributo,valor){
    return await SuperHero.find({ [atributo]: valor }); // Usa find con condiciones para determinado atributo y valor
  }

  async obtenerMayoresDe30() {
     return await SuperHero.find({ edad: { $gt: 30 } , planetaOrigen:"Tierra", poder: { $type: "array" },  
      $expr: { 
        $gte: [{ $size: "$poder" }, 2]  
    }});
  }

  //------------------------------------------
  async crearSuperheroe(datosSuperheroe) {

    /* SuperHero.create(datosSuperheroe);
    const superheroeCreado = await SuperHero.find({ nombreSuperHeroe: datosSuperheroe.nombreSuperHeroe });

    console.log(`Superheroe: ${superheroeCreado}`);
    return superheroeCreado; */

    const nuevoHeroe = new SuperHero(datosSuperheroe);
    //console.log(nuevoHeroe);
    return await nuevoHeroe.save();

  }

  //    Actualizar Heroe    //
  async actualizarHeroe(id, datosActualizar) {
      
      /* updateOne() o updateMany() devuelven el resultado de la operación pero no el documento actualizado
      y findByIdAndUpdate() devuelve el documento modificado */

      //  { new: true } con este parámetro me devuelve el documento con los datos nuevos ya modificados
      //  Sin dicho parámetro se modifica el documento en la BD pero me devuelve el obj. literal con los datos sin modificar
      const heroeActualizado = await SuperHero.findByIdAndUpdate(id, datosActualizar, { new: true });
      console.log(heroeActualizado);
      return heroeActualizado;
      
  }

  //    Eliminar Heroe por ID     //
  async eliminarPorId(id){
      const heroeEliminado = await SuperHero.findByIdAndDelete(id);
      console.log(heroeEliminado);
      return heroeEliminado;
  }

  //    Eliminar Heroe por Nombre    //
  async eliminarPorNombre(nombre){
      // findByIdAndDelete() y findOneAndDelete() también devuelven el documento modificado
      const heroeEliminado = SuperHero.findOneAndDelete({nombreSuperheroe: nombre});
      console.log(heroeEliminado);
      return heroeEliminado;
  }
}

// Exporta una instancia de SuperHeroRepository para que pueda ser utilizada directamente en otros módulos
export default new SuperHeroRepository();