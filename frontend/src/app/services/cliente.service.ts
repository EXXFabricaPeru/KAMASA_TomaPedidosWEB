import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environment/enviroment'
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url: string= environment.url;
  constructor(private http: HttpClient) { }

  obtenerCliente(valor: string, vendedor: string, flag: string){
    return this.http.get(`${ this.url }Cliente?valor=${ valor }&codvendedor=${ vendedor }&flag=${ flag }`);
  }

  obtenerClienteCod(codCliente: string){
    return this.http.get(`${ this.url }Cliente/Buscar?codCliente=${ codCliente }`);
  }

  obtenerEstadoCuenta(codCliente: string){
    return this.http.get(`${ this.url }Cliente/EeCcLista?codCliente=${ codCliente }`);
  }

  obtenerEstadoCuentaDownload(codCliente: string){
    return this.http.get(`${ this.url }Cliente/eeccRpt?codCliente=${ codCliente }`);
  }

  registrarCliente(cliente: Cliente){
    return this.http.post(`${ this.url }Cliente`, cliente);
  }

  editarCliente(cliente: Cliente){
    return this.http.put(`${ this.url }Cliente`, cliente);
  }

  obtenerTransportista(){
    return this.http.get(`${ this.url }Cliente/transportista`);
  }

  //------------------->API CONSULTA RUC<-------------------//
  consultaRUC(ruc: string, accessToken: string){
    // const _headers = new Headers({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${accessToken}`
    // })
    return this.http.get(`http://192.168.1.235:8081/api/ConsultaGeneral/${ ruc }`, { headers: { 'Authorization': `Bearer ${accessToken}` } })
    // return this.http.get(`https://localhost:44389/api/Contribuyente/${ ruc }`, { headers: { 'Authorization': `Bearer ${accessToken}` } })
  }
  
  loginConsultaRUC(data: any){
    // return this.http.post (`https://localhost:44389/api/Autenticacion`, data);    
    return this.http.post (`http://192.168.1.235:8081/api/Autenticacion`, data);    
  }
}
