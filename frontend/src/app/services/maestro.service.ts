import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environment/enviroment'
import { TablaGeneral } from '../models/tablageneral';

@Injectable({
  providedIn: 'root'
})
export class MaestroService {
  url: string= environment.url;
  constructor(private http: HttpClient) { }

  obtenerMedioEnvio(){
    return this.http.get(`${ this.url }Maestro?id=21`);
  }

  obtenerZona(){
    return this.http.get(`${ this.url }Maestro?id=20`);
  }

  obtenerGiroNegocio(){
    return this.http.get(`${ this.url }Maestro?id=19&valor=x`);
  }

  obtenerListaVendedor(){
    return this.http.get(`${ this.url }Maestro?id=18&valor=x`);
  }

  obtenerListaPrecio(){
    return this.http.get(`${ this.url }Maestro?id=17&valor=x`);
  }

  obtenerSucursales(){
    return this.http.get(`${ this.url }Maestro?id=16&valor=x`);
  }

  obtenerGrupoCliente(){
    return this.http.get(`${ this.url }Maestro?id=15&valor=x`);
  }

  obtenerDistrito(codProvincia: string){
    return this.http.get(`${ this.url }Maestro?id=14&valor=${ codProvincia }`);
  }

  obtenerProvincia(codDepartamento: string){
    return this.http.get(`${ this.url }Maestro?id=13&valor=${ codDepartamento }`);
  }

  obtenerDepartamento(){
    return this.http.get(`${ this.url }Maestro?id=12&valor=x`);
  }

  obtenerUnidadMedida(codArticulo: string){
    return this.http.get(`${ this.url }Maestro?id=11&valor=${ codArticulo }`);
  }

  obtenerSeries(tipo: string, idSucursal: string){
    return this.http.get(`${ this.url }Maestro?id=10&valor=${ tipo }&valor2=${ idSucursal }`);
  }

  obtenerProyectos(){
    return this.http.get(`${ this.url }Maestro?id=9&valor=x`);
  }

  obtenerTioOperacion(){
    return this.http.get(`${ this.url }Maestro?id=8&valor=x`);
  }

  obtenerSubDimencion(codDim: string){
    return this.http.get(`${ this.url }Maestro?id=7&valor=${ codDim }`);
  }

  obtenerDimencion(){
    return this.http.get(`${ this.url }Maestro?id=6&valor=x`);
  }

  obtenerImpuesto(){
    return this.http.get(`${ this.url }Maestro?id=5&valor=x`);
  }

  obtenerMoneda(){
    return this.http.get(`${ this.url }Maestro?id=4&valor=x`);
  }

  obtenerAlmacenVenta(idSucursal: string){
    return this.http.get(`${ this.url }Maestro?id=3&valor=${ idSucursal }`);
  }

  obtenerAlmacenCliente(codCliente: string){
    return this.http.get(`${ this.url }Maestro?id=2&valor=${ codCliente }`);
  }

  obtenerCondicionPago(){
    return this.http.get(`${ this.url }Maestro?id=1&valor=x`);
  }
}
