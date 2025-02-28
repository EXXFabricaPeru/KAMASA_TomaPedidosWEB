import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ColumnHeader from 'src/app/models/columnHeader';
import { PedidoCab } from 'src/app/models/pedidocab';
import { DocumentoService } from 'src/app/services/documento.service';

@Component({
  selector: 'app-documento-listar',
  templateUrl: './documento-listar.component.html',
  styleUrls: ['./documento-listar.component.scss']
})
export class DocumentoListarComponent implements OnInit, AfterViewInit {
  public listaHeader: ColumnHeader[] = [];
  public fecDesde: string = new Date().toISOString().slice(0, 10);
  public fecHasta: string = new Date().toISOString().slice(0, 10);
  public codVendedor: number = 0;
  public tipoDoc: any = 0;
  listaDocumento: PedidoCab[] = [];
  valCliente:string = "";
  dataUsuario: any;
  listaPaginas: number[] = [];
  pagina: number = 0;
  mensajeVacio: string = "";

  constructor(private documentoService: DocumentoService, private _route: ActivatedRoute, private router: Router) { 
    console.log("listar documentos");
    
    let dataTemp: any = localStorage.getItem("dataUsuario");
    this.dataUsuario = JSON.parse(dataTemp);
    if(this.dataUsuario == null || this.dataUsuario == undefined){
      this.router.navigateByUrl('login', { replaceUrl: true });
    }else{
      this.codVendedor = this.dataUsuario.codVendedor;
    }
  }

  ngOnInit(): void {
    console.log("---listar documentos----");
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
        key: "estado",
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
    
    console.log("fecha hoy  ", this.fecDesde)

    const _txtDesde = document.getElementById("input-fecdesde") as HTMLInputElement;
    _txtDesde.value = this.fecDesde;
    const _txtHasta = document.getElementById("input-fechasta") as HTMLInputElement;
    _txtHasta.value = this.fecHasta;
  }

  ngAfterViewInit(): void{
    
  }

  buscarDocumentos(){
    this.listaDocumento = [];
    this.listaPaginas = [];
    this.pagina = 0;
    let fecIni: string;
    let fecFin: string;    

    const _txtDesde = document.getElementById("input-fecdesde") as HTMLInputElement;
    fecIni = _txtDesde.value.replace('-', '').replace('-', '');
    if (fecIni == "") fecIni = "0";

    const _txtHasta = document.getElementById("input-fechasta") as HTMLInputElement;    
    fecFin = _txtHasta.value.replace('-', '').replace('-', '');
    if (fecFin == "") fecFin = "0";

    const _cmbEstado = document.getElementById("input-estado") as HTMLSelectElement;
    const estado: string = _cmbEstado.value;
    // console.log("fec ini--->", fecIni);
    // console.log("fec Fin--->", fecFin);
    // console.log("tipo------>", this.tipoDoc);

    this.documentoService.obtenerDocumentos(fecIni, fecFin, this.codVendedor.toString(), this.tipoDoc.toString(), this.valCliente, estado).subscribe((data: any) => {
      if(data.estado == "True"){
        this.mensajeVacio = "";
        this.listaDocumento = data.listaPedido;
        const residuo: number = this.listaDocumento.length % 10;
        const cociente: string = (this.listaDocumento.length / 10).toString().split('.')[0];
        const x: number = residuo == 0 ? 0 : 1;
        for(let i = 1; i <= Number(cociente) + x; i++){
          this.listaPaginas.push(i);
        }
  
        this.pagina = 1;
      }else{
        this.mensajeVacio = data.mensaje;
      }
    })
  }

  searchRow(row: any){
    console.log(row);
    let tipo: string;
    if(row.estado == "CERRADO" || row.estado == "ABIERTO" || row.estado == "ANULADO")
      tipo = "2";
    else
      tipo ="3";

    this.router.navigateByUrl(`/doc-mostrar/${ row.idPedido }/${ tipo }`, { replaceUrl: true });
  }

  selectPagina(pag: number){
    this.pagina = pag;
  }

  crearDocumentos(){
    this.router.navigateByUrl(`/doc-crear/0/${ this.tipoDoc }`, { replaceUrl: true });
  }
}
