import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environment/enviroment'
import { PedidoCab } from '../models/pedidocab';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  url: string= environment.url;
  constructor(private http: HttpClient) { }

  obtenerDocumentos(fecIni: string, fecFin: string, codVendedor: string, tipo: string, codCliente: string, estado: string){
    return this.http.get(`${ this.url }Pedido/Lista?CodVendedor=${ codVendedor }&FecIni=${ fecIni }&FecFin=${ fecFin }&Tipo=${ tipo }&cliente=${ codCliente }&Estado=${ estado }`);
  }

  registrarDocumento(documento: PedidoCab){
    return this.http.post(`${ this.url }Pedido`, documento);
  }

  editarDocumento(documento: PedidoCab){
    return this.http.put(`${ this.url }Pedido`, documento);
  }

  CopyToDocumento(documento: PedidoCab){
    return this.http.post(`${ this.url }Pedido/CopyPedido`, documento);
  }

  obtenerDocumento(nro: string, tipo: string){
    return this.http.get(`${ this.url }Pedido?id=${ nro }&tipo=${ tipo }`);
  }

  obtenerReporte(nro: string, tipo: string){
    return this.http.get(`${ this.url }Pedido/Reporte?id=${ nro }&tipo=${ tipo }`);
  }

  //Promociones
  obtenerPromo(pedido: PedidoCab){
    return this.http.post(`${ this.url }Pedido/Promociones`, pedido);
  }

  obtenerPromoSug(numeOpe: string){
    return this.http.get(`${ this.url }Pedido/PromoSugerida?numeroOperacion=${ numeOpe }`);
  }
}
