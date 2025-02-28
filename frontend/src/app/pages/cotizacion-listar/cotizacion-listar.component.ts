import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ColumnHeader from 'src/app/models/columnHeader';
import { PedidoCab } from 'src/app/models/pedidocab';
import { DocumentoService } from 'src/app/services/documento.service';

@Component({
  selector: 'app-cotizacion-listar',
  templateUrl: './cotizacion-listar.component.html',
  styleUrls: ['./cotizacion-listar.component.css']
})
export class CotizacionListarComponent implements OnInit {
  public listaHeader: ColumnHeader[] = [];
  public fecDesde: string = new Date().toISOString().slice(0, 10);
  public fecHasta: string = new Date().toISOString().slice(0, 10);
  public codVendedor: number = 0;
  public tipoDoc: any = 0;
  public valCliente: string = "";
  listaDocumento: PedidoCab[] = [];
  listaPaginas: number[] = [];
  pagina: number = 0;
  lblMensajeVacio = "";

  dataUsuario: any;
  constructor(private documentoService: DocumentoService, private _route: ActivatedRoute, private router: Router) { 
    
    let dataTemp: any = localStorage.getItem("dataUsuario");
    this.dataUsuario = JSON.parse(dataTemp);
    if(this.dataUsuario == null || this.dataUsuario == undefined){
      this.router.navigateByUrl('/login', { replaceUrl: true })
      // this.codVendedor = 2;
    }else{
      this.codVendedor = this.dataUsuario.codVendedor
    }
  }

  ngOnInit(): void {
    this.tipoDoc = this._route.snapshot.paramMap.get("tipo");

    this.listaHeader = [
      {
        label: "NroPed",
        key: "nroPedido",
        subKey: "",
        customClass: "",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Cliente",
        key: "nomCliente",
        subKey: "",
        customClass: "",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Fecha",
        key: "fecPedido",
        subKey: "",
        customClass: "fecha",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Moneda",
        key: "moneda",
        subKey: "",
        customClass: "",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Importe",
        key: "importeTotal",
        subKey: "",
        customClass: "derecha",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Estado",
        key: "estadoPed",
        subKey: "",
        customClass: "",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "",
        key: "nroPedido",
        subKey: "",
        customClass: "btnEdit",
        type: "buttonSearch",
        value: "",
        visible: true
      },
    ];

    const _txtDesde = document.getElementById("input-fecdesde") as HTMLInputElement;
    _txtDesde.value = this.fecDesde;
    const _txtHasta = document.getElementById("input-fechasta") as HTMLInputElement;
    _txtHasta.value = this.fecHasta;
  }

  buscarDocumentos(){
    this.listaDocumento = [];
    this.listaPaginas = [];
    this.pagina = 0;
    let fecIni: string = "";
    let fecFin: string = "";    

    const _txtDesde = document.getElementById("input-fecdesde") as HTMLInputElement;
    fecIni = _txtDesde.value.replace('-', '').replace('-', '');
    if (fecIni == "") fecIni = "0";

    const _txtHasta = document.getElementById("input-fechasta") as HTMLInputElement;    
    fecFin = _txtHasta.value.replace('-', '').replace('-', '');
    if (fecFin == "") fecFin = "0";

    const _cmbEstado = document.getElementById("input-estado") as HTMLSelectElement;
    const estado: string = _cmbEstado.value;

    this.documentoService.obtenerDocumentos(fecIni, fecFin, this.codVendedor.toString(), this.tipoDoc.toString(), this.valCliente, estado).subscribe((data: any) => {
      if(data.estado == "True"){
        this.lblMensajeVacio = "";
        this.listaDocumento = data.listaPedido;
        console.log("lista", this.listaDocumento);
        const residuo: number = this.listaDocumento.length % 10;
        const cociente: string = (this.listaDocumento.length / 10).toString().split('.')[0];
        let total: number;
  
        if(residuo > 0){
          total = Number(cociente)+1
        }else{
          total = Number(cociente);
        }
  
        for(let i=1; i <= total; i++){
          this.listaPaginas.push(i);
        }
  
        this.pagina = 1
      }else{
        this.lblMensajeVacio = data.mensaje;
      }
    })
  }

  searchRow(row: any){
    console.log(row);
    this.router.navigateByUrl(`/doc-mostrar/${ row.idPedido }/${ this.tipoDoc }`, { replaceUrl: true });
  }

  selectPagina(pag: number){
    this.pagina = pag;
  }

  crearDocumentos(){
    console.log("----->Crear");
    
    this.router.navigateByUrl(`/doc-crear/0/${ this.tipoDoc }`, { replaceUrl: true });
  }
}
