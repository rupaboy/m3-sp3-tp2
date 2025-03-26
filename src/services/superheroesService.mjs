//Implementa la lógica de negocio, con los métodos de repositorio
//Para búsqueda, recuperción y filtrado de datos.

import SuperHeroRepository from '../repositories/SuperHeroRepository.mjs';

export async function obtenerTodosLosSuperheroes() { 
    return await SuperHeroRepository.obtenerTodos();
} 

export async function obtenerSuperheroePorId(id){
    return await SuperHeroRepository.obtenerPorId(id)
}

export async function buscarSuperheroesPorAtributo(atributo, valor) {
    return await SuperHeroRepository.buscarPorAtributo(atributo, valor)
}

export async function obtenerSuperheroesMasPoderosos() {
    return await SuperHeroRepository.obtenerMasPoderosos();
}

export async function obtenerSuperheroesMasPoderososPlaneta(planeta) {
    return await SuperHeroRepository.obtenerMasPoderososPlaneta(planeta);
}

export async function obtenerSuperheroesMenosPoderosos() {
    return await SuperHeroRepository.obtenerMenosPoderosos();
}

export async function obtenerSuperheroesMenosPoderososPlaneta(planeta) {
    return await SuperHeroRepository.obtenerMenosPoderososPlaneta(planeta);
}

export async function obtenerSuperheroesSinPoderes() {
    return await SuperHeroRepository.obtenerSinPoderes();
}

export async function obtenerSuperheroesSinPoderesPlaneta(planeta) {
    return await SuperHeroRepository.obtenerSinPoderesPlaneta(planeta);
}

export async function agregarNuevoSuperheroe() {
    return await SuperHeroRepository.agregarNuevo();
}

export async function agregarNuevoTemplateSuperheroe() {
    return await SuperHeroRepository.agregarNuevoTemplate();
}

export async function agregarNuevoArraySuperheroes() {
    return await SuperHeroRepository.agregarNuevoArray();
}

export async function editarSuperheroePorId(id) {
    return await SuperHeroRepository.editar(id);
}

export async function editarSuperheroePorIdAtributoValor(id, atributo, valor) {
    return await SuperHeroRepository.editarPorIdAtributoValor(id, atributo, valor)
}

export async function editarSuperheroePorIdAgregarPoder(id, poder) {
    return await SuperHeroRepository.editarPorIdAgregarPoder(id, poder)
}

export async function editarSuperheroePorIdQuitarPoder(id, poder) {
    return await SuperHeroRepository.editarPorIdQuitarPoder(id, poder)
}

export async function editarSuperheroePorIdAgregarAliado(id, aliado) {
    return await SuperHeroRepository.editarPorIdAgregarAliado(id, aliado)
}

export async function editarSuperheroePorIdQuitarAliado(id, aliado) {
    return await SuperHeroRepository.editarPorIdQuitarAliado(id, aliado)
}

export async function editarSuperheroePorIdAgregarEnemigo(id, enemigo) {
    return await SuperHeroRepository.editarPorIdAgregarEnemigo(id, enemigo)
}

export async function editarSuperheroePorIdQuitarEnemigo(id, enemigo) {
    return await SuperHeroRepository.editarPorIdQuitarEnemigo(id, enemigo)
}

export async function borrarSuperheroePorId(id) {
    return await SuperHeroRepository.borrarPorId(id); 
}


export async function borrarSuperheroePorNombre(nombreSuperheroe) {
    return await SuperHeroRepository.borrarPorNombre(nombreSuperheroe); 
}