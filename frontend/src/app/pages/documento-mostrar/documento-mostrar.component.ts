import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ColumnHeader from 'src/app/models/columnHeader';
import { PedidoCab } from 'src/app/models/pedidocab';
import { PedidoDet } from 'src/app/models/pedidodet';
import { TablaGeneral } from 'src/app/models/tablageneral';
import { DocumentoService } from 'src/app/services/documento.service';
import { MaestroService } from 'src/app/services/maestro.service';
import { environment } from 'src/environment/enviroment'

@Component({
  selector: 'app-documento-mostrar',
  templateUrl: './documento-mostrar.component.html',
  styleUrls: ['./documento-mostrar.component.scss']
})
export class DocumentoMostrarComponent implements OnInit {
  pedido: PedidoCab = {
    idPedido: 0,
    nroPedido: '',
    codCliente: '',
    condPago: '',
    nroOC: '',
    subTotal: 0,
    descuento: 0,
    importeTotal: 0,
    moneda: '',
    estado: '',
    comentario: '',
    codVendedor: '',
    codDireccion: '',
    direccion: '',
    codTransTramo1: '',
    rucTransTramo1: '',
    nomTransTramo1: '',
    dirTransTramo1: '',
    userReg: '',
    latitud: '',
    longitud: '',
    nomCliente: '',
    rucCliente: '',
    tipoDoc: '',
    tipoOperacion: '',
    series: '',
    listaDetalle: [],
    archivo: '',
    nomArchivo: '',
    sucursal: 0,
    codAgTra: '',
    nomAgTra: '',
    rucAgTra: '',
    dirAgTra: '',
    cdiAgTra: '',
    zonAgTra: '',
    medioEnvio: -1,
    estadoPed: ''
  };
  pedidoDet: PedidoDet[] = [];
  headerDocumento: ColumnHeader[] = [];

  headerProducto: ColumnHeader[] = [];
  headerCliente: ColumnHeader[] = [];

  listaAlmacen: TablaGeneral[] = [];
  listaAlmacenCliente: TablaGeneral[] = [];
  listaCondPago: TablaGeneral[] = [];
  listaMoneda: TablaGeneral[] = [];
  listaImpuesto: TablaGeneral[] = [];
  listaSucursales: TablaGeneral[] = [];

  listaDim1: TablaGeneral[] = [];
  listaDim2: TablaGeneral[] = [];
  listaDim3: TablaGeneral[] = [];
  listaDim4: TablaGeneral[] = [];
  listaDim5: TablaGeneral[] = [];
  listaProyecto: TablaGeneral[] = [];
  listaTpoOper: TablaGeneral[] = [];
  listaSeries: TablaGeneral[] = [];

  dataUsuario: any;

  codVendedor: string = "";
  tipoDoc: string = "";
  _titulo: string = "";
  valorProducto = "";
  valorCliente = "";
  dimencion1: string = "";
  dimencion2: string = "";
  dimencion3: string = "";
  dimencion4: string = "";
  dimencion5: string = "";
  _dimencion1: string = "";
  _dimencion2: string = "";
  _dimencion3: string = "";
  _dimencion4: string = "";
  _dimencion5: string = "";

  nroDoc: number = 0;
  numeDoc: string = "";
  key: string = "";

  productDialog: boolean = false;
  clienteDialog: boolean = false;
  deleteProductDialog: boolean = false;
  errorDialog: boolean = false;
  confirmDialog: boolean = false;
  copyTo: boolean = false;
  editCoti: boolean = false;

  msgError: string = "";

  codCliente: string = "";
  nomCliente: string = "";
  codAlmacen: string = "";
  codCondPag: string = "";
  codDireccion: string = "";
  codMoneda: string = "SOL";
  user: string = "";
  rucCliente: string = "";
  commentario: string = "";
  codImpuesto: string = "IGV";
  subTotal: string = "";
  docTotal: string = "";
  impuesto: string = "";
  tipoOperacion: string = "";
  series: string = "";
  nroDocumento: string | null = "";
  _idDocumento: Number = 0;
  idSucursal: Number = 0;

  fecNecesaria: string = new Date().toISOString().slice(0, 10);//toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' });
  fecDocumento: string = new Date().toISOString().slice(0, 10);
  fecContabilizacion: string = new Date().toISOString().slice(0, 10);

  idGridDoc: string = "gridDoc";
  idGridCli: string = "gridCli";
  idGridPro: string = "gridPro";

  precioLista: string = "1";

  constructor (private _route: ActivatedRoute, 
               private router: Router, 
               private maestroService: MaestroService, 
               private documentoService: DocumentoService
               ){
    let dataTemp: any = localStorage.getItem("dataUsuario");
    this.dataUsuario = JSON.parse(dataTemp);
    if(this.dataUsuario == null || this.dataUsuario == undefined){
      this.router.navigateByUrl('login', { replaceUrl: true })
    }else{
      this.codVendedor = this.dataUsuario.codVendedor
      this.user = this.dataUsuario.usuario;
    }
  }

  async ngOnInit(): Promise<void> {
    let xTipoDoc: string | null;
    let xNroDoc: string | null;

    xTipoDoc = this._route.snapshot.paramMap.get("tipo") || "";
    xNroDoc = this._route.snapshot.paramMap.get("nro") || "";

    console.log("NroDoc", xNroDoc);
    console.log("TipoDoc", xTipoDoc);
    

    this.tipoDoc = xTipoDoc;
    this.numeDoc = xNroDoc;

    if(this.tipoDoc == "1")
      this._titulo = "COTIZACIÓN";

    if(this.tipoDoc == "2")
      this._titulo = "PEDIDO VENTA";

    if(this.tipoDoc == "3")
      this._titulo = "PEDIDO BORRADOR";

    // const dataDimension: any = await this.maestroService.obtenerDimencion().toPromise();
    
    // if (dataDimension.estado == "True") {
    //   for (let i = 0; i < dataDimension.listaTablaGeneral.length; i++) {
    //     console.log("dimension", dataDimension.listaTablaGeneral[i].descripcion);

    //     switch (dataDimension.listaTablaGeneral[i].descripcion) {
    //       case "Dimension 1":
    //         this.dimencion1 = dataDimension.listaTablaGeneral[i].valor01;
    //         this._dimencion1 = dataDimension.listaTablaGeneral[i].descripcion;
    //         break;
    //       case "Dimension 2":
    //         this.dimencion2 = dataDimension.listaTablaGeneral[i].valor01;
    //         this._dimencion2 = dataDimension.listaTablaGeneral[i].descripcion;
    //         break;
    //       case "Dimension 3":
    //         this.dimencion3 = dataDimension.listaTablaGeneral[i].valor01;
    //         this._dimencion3 = dataDimension.listaTablaGeneral[i].descripcion;
    //         break;
    //       case "Dimension 4":
    //         this.dimencion4 = dataDimension.listaTablaGeneral[i].valor01;
    //         this._dimencion4 = dataDimension.listaTablaGeneral[i].descripcion;
    //         break;
    //       case "Dimension 5":
    //         this.dimencion5 = dataDimension.listaTablaGeneral[i].valor01;
    //         this._dimencion5 = dataDimension.listaTablaGeneral[i].descripcion;
    //         break;
    //     }
    //   }
    // }      

    this.headerDocumento = [
      {
        label: "Código",
        key: "idProducto",
        subKey: "",
        customClass: "",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Descripción",
        key: "descripcion",
        subKey: "",
        customClass: "",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Precio",
        key: "precioUnit",
        subKey: "",
        customClass: "derecha",
        type: "",
        value: "",
        visible: true
      },
      // {
      //   label: "Stock",
      //   key: "stockDisponible",
      //   subKey: "",
      //   customClass: "derecha",
      //   type: "",
      //   value: ""
      // },
      {
        label: "UndMed",
        key: "unidad",
        subKey: "",
        customClass: "",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Almacén",
        key: "codAlmacen",
        subKey: "",
        customClass: "",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Cantidad",
        key: "cantidad",
        subKey: "",
        customClass: "derecha",
        type: "",
        value: "",
        visible: true
      },        
      {
        label: "Total",
        key: "precioTotal",
        subKey: "",
        customClass: "derecha",
        type: "",
        value: "",
        visible: true
      },
      // {
      //   label: "Proyecto",
      //   key: "proyecto",
      //   subKey: "",
      //   customClass: "",
      //   type: "",
      //   value: ""
      // },
      // {
      //   label: this.dimencion1,
      //   key: "dimension1",
      //   subKey: "",
      //   customClass: "",
      //   type: "",
      //   value: ""
      // },
      // {
      //   label: this.dimencion2,
      //   key: "dimension2",
      //   subKey: "",
      //   customClass: "",
      //   type: "",
      //   value: ""
      // },
      // {
      //   label: this.dimencion3,
      //   key: "dimension3",
      //   subKey: "",
      //   customClass: "",
      //   type: "",
      //   value: ""
      // },
      // {
      //   label: this.dimencion4,
      //   key: "dimension4",
      //   subKey: "",
      //   customClass: "",
      //   type: "",
      //   value: ""
      // },
      // {
      //   label: this.dimencion5,
      //   key: "dimension5",
      //   subKey: "",
      //   customClass: "",
      //   type: "",
      //   value: ""
      // }
    ];

    const dataCondPago: any = await this.maestroService.obtenerCondicionPago().toPromise();
    if(dataCondPago.estado == "True"){
      this.listaCondPago = dataCondPago.listaTablaGeneral;
    }

    const dataMoneda: any = await this.maestroService.obtenerMoneda().toPromise();
    if(dataMoneda.estado == "True"){
      this.listaMoneda = dataMoneda.listaTablaGeneral;      
    }
    
    const dataImpuesto: any = await this.maestroService.obtenerImpuesto().toPromise();
    if(dataImpuesto.estado == "True"){
      this.listaImpuesto = dataImpuesto.listaTablaGeneral;
    }

    const dataTipoOperacion: any = await this.maestroService.obtenerTioOperacion().toPromise();
    if(dataTipoOperacion.estado == "True"){
      this.listaTpoOper = dataTipoOperacion.listaTablaGeneral;
    }

    const dataDocumento: any = await this.documentoService.obtenerDocumento(this.numeDoc, this.tipoDoc).toPromise();

    console.log("documento", dataDocumento);    

    if(dataDocumento.estado == "True"){
      this.pedido = dataDocumento.listaPedido[0];
      this.idSucursal = this.pedido.sucursal;
      this.nroDocumento = this.pedido.nroPedido;
      this._idDocumento = this.pedido.idPedido;
      await this.obtenerListaxSucursal();

      const dataAlmCli: any = await this.maestroService.obtenerAlmacenCliente(this.pedido.codCliente).toPromise();
      if(dataAlmCli.estado == "True"){
        this.listaAlmacenCliente = dataAlmCli.listaTablaGeneral;
      }

      const _txtCodCli = document.getElementById("input-cod-cliente") as HTMLInputElement;
      _txtCodCli.value = this.pedido.codCliente;
      const _txtNomCli = document.getElementById("input-razon-social") as HTMLInputElement;
      _txtNomCli.value = this.pedido.nomCliente;
      const _txtFecDoc = document.getElementById("input-fecha-docu") as HTMLInputElement;
      _txtFecDoc.value = this.pedido.fecContabilizacion.toString().substring(0, 10) || "";
      const _txtFecNec = document.getElementById("input-fecha-necesaria") as HTMLInputElement;
      _txtFecNec.value = this.pedido.fecSolicitado.toString().substring(0, 10) || "";
      const _txtComent = document.getElementById("input-comment") as HTMLInputElement;
      _txtComent.value = this.pedido.comentario || "";
      const _cmbSeries = document.getElementById("input-serie") as HTMLSelectElement
      _cmbSeries.value = this.pedido.series;
      const _cmbMoneda = document.getElementById("input-cod-moneda") as HTMLSelectElement
      _cmbMoneda.value = this.pedido.moneda;
      const _cmbAlmCli = document.getElementById("input-dir-cli") as HTMLSelectElement
      _cmbAlmCli.value = this.pedido.codDireccion;
      const _cmbAlmVen = document.getElementById("input-alm-ven") as HTMLSelectElement
      _cmbAlmVen.value = this.pedido.listaDetalle[0].codAlmacen;
      const _cmbImpues = document.getElementById("input-cod-imp") as HTMLSelectElement
      _cmbImpues.value = this.pedido.listaDetalle[0].tipoImpuesto;
      const _cmbCndPag = document.getElementById("input-cond-pago") as HTMLSelectElement
      _cmbCndPag.value = this.pedido.condPago;
      const _cmbTpoOpe = document.getElementById("input-tip-ope") as HTMLSelectElement
      _cmbTpoOpe.value = this.pedido.tipoOperacion;
      // const _txtPorDescuento = document.getElementById("input-por-descuento") as HTMLInputElement;
      // _txtPorDescuento.value = this.pedido.descuento.toFixed(2)

      this.pedidoDet = this.pedido.listaDetalle;
      this._titulo = `${ this._titulo } N° ${ this.pedido.nroPedido }`

      let _subTotal: Number = 0; 
      let _impuesto: Number = 0; 
      let _docTotal: Number = 0; 

      for(let i = 0; i < this.pedidoDet.length; i++){
        _subTotal = Number(_subTotal) + Number(this.pedidoDet[i].precioTotal);
      }

      if(this.pedidoDet[0].tipoImpuesto == "IGV"){
        _impuesto = (Number(_subTotal) * (1-(Number(this.pedido.descuento)/100))) * 0.18
      }

      _docTotal = Number(_subTotal) + Number(_impuesto);
      
      this.subTotal = _subTotal.toLocaleString("es-PE", { style: "currency", currency: this.pedido.moneda });
      this.impuesto = _impuesto.toLocaleString("es-PE", { style: "currency", currency: this.pedido.moneda });
      this.docTotal = _docTotal.toLocaleString("es-PE", { style: "currency", currency: this.pedido.moneda });
  
      const _txtSubTotal = document.getElementById("input-subtotal") as HTMLInputElement;
      _txtSubTotal.value = this.subTotal;
      const _txtImpuesto = document.getElementById("input-impuesto") as HTMLInputElement;
      _txtImpuesto.value = this.impuesto;
      const _txtDocTotal = document.getElementById("input-total") as HTMLInputElement;
      _txtDocTotal.value = this.docTotal;

      if(this.pedido.estado == "Y"){
        this.copyTo = true;
      }else{
        this.copyTo = false;
      }

      if( this.pedido.estado == "Y" && this.tipoDoc == "1")
        this.editCoti = true;
    }
  }

  closeDialog(){
    this.errorDialog = false;
  }

  copiarPedido(){
    this.router.navigateByUrl(`/doc-crear/${ this.numeDoc }/3`, { replaceUrl: true });
  }  

  editarPedido(){
    this.router.navigateByUrl(`/doc-crear/${ this.numeDoc }/${ this.tipoDoc }`, { replaceUrl: true });
  }
  
  closeDialogConfirm(){
    this.confirmDialog = false;
    // this.router.navigateByUrl(`/mostrar/${ this.key }/3`, { replaceUrl: true });
    // window.location.reload();
  }

  async obtenerListaxSucursal(){
    // console.log("sucursal", this.idSucursal);
    
    const dataAlmVen: any = await this.maestroService.obtenerAlmacenVenta(this.idSucursal.toString()).toPromise();
    // console.log("almacen venta", dataAlmVen);    
    if(dataAlmVen.estado == "True"){
      this.listaAlmacen = dataAlmVen.listaTablaGeneral;
      this.codAlmacen = this.listaAlmacen[0].codigo;
      const _cmbAlmacen = document.getElementById("input-alm-ven") as HTMLSelectElement;
      _cmbAlmacen.value = this.codAlmacen;
    }
    
    let tipo: string;
    if(this.tipoDoc != "1")
      tipo = "2";
    else
      tipo = "1";

    const dataSerie: any = await this.maestroService.obtenerSeries(tipo, this.idSucursal.toString()).toPromise();
    // console.log("series", dataSerie);
    if(dataSerie.estado == "True"){
      this.listaSeries = dataSerie.listaTablaGeneral;
      this.series = this.listaSeries[0].codigo;    
      const _cmbSerie = document.getElementById("input-serie") as HTMLSelectElement;
      _cmbSerie.value = this.series;
    }
  }

  async descargarReporte(){
    let tipo: string;
    if(this.tipoDoc == "1")
      tipo = "cot"
     if(this.tipoDoc == "2")
      tipo = "ped"
    if(this.tipoDoc == "3")
      tipo = "bor"
    const xUrl: string = environment.urlrpt;
    const url: string = `${xUrl}/index.aspx?Parametros=P_DOCENTRY|${this._idDocumento},${tipo}`;

    window.open(url, "_blank");

    // const data: any = await this.documentoService.obtenerReporte(this._idDocumento.toString(), this.tipoDoc).toPromise();
    // console.log("Reporte", data)
    // if(data.estado){
    //   var byteCharacters = atob(data.rpt);
    //   var byteNumbers = new Array(byteCharacters.length);

    //   for (var i = 0; i < byteCharacters.length; i++) {
    //       byteNumbers[i] = byteCharacters.charCodeAt(i);
    //   }

    //   var byteArray = new Uint8Array(byteNumbers); 
 
    //   let filename = `${ this.nroDocumento }.pdf`;  
    //   let binaryData = [];
    //   binaryData.push(byteArray);
    //   let downloadLink = document.createElement('a');
    //   downloadLink.href = window.URL.createObjectURL(
    //   new Blob(binaryData, { type: 'blob' }));
    //   downloadLink.setAttribute('download', filename);
    //   document.body.appendChild(downloadLink);
    //   downloadLink.click();
    // }
  }
}
