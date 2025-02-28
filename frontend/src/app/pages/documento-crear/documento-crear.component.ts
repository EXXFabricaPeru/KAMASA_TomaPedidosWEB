import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Cliente } from 'src/app/models/cliente';
import ColumnHeader from 'src/app/models/columnHeader';
import { PedidoCab } from 'src/app/models/pedidocab';
import { PedidoDet } from 'src/app/models/pedidodet';
import { Producto } from 'src/app/models/producto';
import { TablaGeneral } from 'src/app/models/tablageneral';

import { ClienteService } from 'src/app/services/cliente.service';
import { DocumentoService } from 'src/app/services/documento.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { MaestroService } from 'src/app/services/maestro.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-documento-crear',
  templateUrl: './documento-crear.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./documento-crear.component.scss']
})
export class DocumentoCrearComponent implements OnInit {
//#region "Variables"
  flagLoad :boolean = false;
  pedidoCopy!: PedidoCab;
  listaDocumento: PedidoDet[] = [];
  listaBoniSug: any[] = [];
  headerDocumento: ColumnHeader[] = [];
  headerPromoSuge: ColumnHeader[] = [];

  listaProducto: Producto[] = [];
  listaProductoStock: Producto[] = [];
  listaTransportista: Cliente[] = [];

  headerProducto: ColumnHeader[] = [];
  headerProductoStock: ColumnHeader[] = [];
  descProducto: string = "";

  listaCliente: Cliente[] = [];
  clienteSelect: any;
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
  listaMedioEnvio: TablaGeneral[] = [];

  dataUsuario: any;

  product!: Producto;
  codVendedor: string = "";
  tipoDoc: string = "";
  _titulo: string = "";
  _tituloFecNec: string = "";
  valorProducto = "";
  valorCliente = "";
  dimencion1: string = "";
  dimencion2: string = "";
  dimencion3: string = "";
  dimencion4: string = "";
  dimencion5: string = "";
  _xDimencion1: string = "";
  _xDimencion2: string = "";
  _xDimencion3: string = "";
  _xDimencion4: string = "";
  _xDimencion5: string = "";
  _dimencion1: string = "";
  _dimencion2: string = "";
  _dimencion3: string = "";
  _dimencion4: string = "";
  _dimencion5: string = "";

  xdimencion1: boolean = false;
  xdimencion2: boolean = false;
  xdimencion3: boolean = false;
  xdimencion4: boolean = false;
  xdimencion5: boolean = false;
  xproyecto: boolean = false;
  xtipooperacion: boolean = false;
  xmoneda: boolean = false;
  xcondicion: boolean = false;
  xxtipooperacion: boolean = false;
  xxmoneda: boolean = false;
  xxcondicion: boolean = false;
  ximpuesto: boolean = false;
  xximpuesto: boolean = false;

  idSucursal: string = "";
  nroDoc: number = 0;
  listaPaginas: number[] = [];
  pagina: number = 0;
  diasVen: number = 0;
  
  medioEnvio: number = 0;
  productDialog: boolean = false;
  productStockDialog: boolean = false;
  clienteDialog: boolean = false;
  deleteProductDialog: boolean = false;
  errorDialog: boolean = false;
  confirmDialog: boolean = false;
  confirmDialogCliente: boolean = false;
  flagSelectCliente: boolean = false;
  listaPrecioBruto:boolean = false;
  promoSugDialog:boolean = false;

  msgError: string = "";

  codCliente: string = "";
  nomCliente: string = "";
  codAlmacen: string = "";
  codCondPag: string = "";
  codDireccion: string = "";
  codMoneda: string = "";
  user: string = "";
  rucCliente: string = "";
  commentario: string = "";
  codImpuesto: string = "";
  subTotal: string = "0.00";
  docTotal: string = "0.00";
  impuesto: string = "0.00";
  tipoOperacion: string = "";
  series: string = "";
  nroDocumento: string | null = "";
  _idDocumento: Number = 0;
  descuento: string = "0.00";
  _descuentoGlobal: number;
  lblMensajeVacio: string;
  numeroOperacion: string;

  codTransportista: string = ""
  nomTransportista: string = ""
  rucTransportista: string = ""
  dirTransportista: string = ""
  cdiTransportista: string = ""
  zonTransportista: string = ""

  fecNecesaria: string = new Date().toISOString().slice(0, 10);//toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' });
  fecDocumento: string = new Date().toISOString().slice(0, 10);
  fecContabilizacion: string = new Date().toISOString().slice(0, 10);

  idGridDoc: string = "gridDoc";
  idGridCli: string = "gridCli";
  idGridPro: string = "gridPro";

  precioLista: string = "1";
  unidadMedidaAux: string[] = [];

  archivo: any;
  nomArchivo: string = "";

  flagPromo: boolean = false;
  tipoPromo: string  = "";
  codiPromo: string  = "";
  valoPromo: number  = 0;
  asigPromo: number  = 0;
  coloPromo: string  = "";
  precPromo: number  = 0;
  refePromo: string  = ""
//#endregion "Variables"
 
  constructor(private _route: ActivatedRoute,
              private router: Router,
              private maestroService: MaestroService,
              private artService: ProductoService,
              private clienteService: ClienteService,
              private documentService: DocumentoService,
              private locationService: GeolocationService,
              private sanitizer: DomSanitizer
              ){
    let dataTemp: any = localStorage.getItem("dataUsuario");
    this.dataUsuario = JSON.parse(dataTemp);
    if(this.dataUsuario == null || this.dataUsuario == undefined){
      this.router.navigateByUrl('login', { replaceUrl: true })
    }else{
      
      this.codVendedor = this.dataUsuario.codVendedor
      this.user = this.dataUsuario.usuario;
      this.precioLista = this.dataUsuario.listaPrecio;
      this.codMoneda = this.dataUsuario.moneda;
      this.idSucursal = this.dataUsuario.sucursal;
      this.listaPrecioBruto = this.dataUsuario.listaPrecioBruto;
      this.diasVen = this.dataUsuario.diasVencim == "" ? 0 : parseInt(this.dataUsuario.diasVencim);

      const listConfig: any[] = this.dataUsuario.configuracion

      for(let i = 0; i<listConfig.length; i++){
        switch (listConfig[i].code){
          case "00001":{
            this.xtipooperacion = listConfig[i].visible;
            this.xxtipooperacion = listConfig[i].editable
            this.tipoOperacion = listConfig[i].valor;
            break;
          }
          case "00002":{
            this.xdimencion1 = listConfig[i].visible
            this._xDimencion1 = listConfig[i].valor;
            break;
          }
          case "00003":{
            this.xdimencion2 = listConfig[i].visible
            this._xDimencion2 = listConfig[i].valor;
            break;
          }
          case "00004":{
            this.xdimencion3 = listConfig[i].visible
            this._xDimencion3 = listConfig[i].valor;
            break;
          }
          case "00005":{
            this.xdimencion4 = listConfig[i].visible
            this._xDimencion4 = listConfig[i].valor;
            break;
          }
          case "00006":{
            this.xdimencion5 = listConfig[i].visible
            this._xDimencion5 = listConfig[i].valor;
            break;
          }
          case "00007":{
            this.xmoneda = listConfig[i].visible;
            this.xxmoneda = listConfig[i].editable;
            break;
          }
          case "00008":{
            this.xcondicion = listConfig[i].visible
            this.xxcondicion = listConfig[i].editable
            this.codCondPag = listConfig[i].valor
            break;
          }
          case "00009":{
            this.xproyecto = listConfig[i].visible
            break;
          }
          case "00010":{
            this.ximpuesto = listConfig[i].visible
            this.xximpuesto = listConfig[i].editable
            this.codImpuesto = listConfig[i].valor
            break;
          }
        }
      }    
    }            
  }

  async ngOnInit(): Promise<void> {
    // console.log(this.fecNecesaria);
    let xTipoDoc: string | null;

    if(this._route.snapshot.paramMap.get("tipo"))
      xTipoDoc = this._route.snapshot.paramMap.get("tipo");
    else
      xTipoDoc = "";

    this.tipoDoc = xTipoDoc || "";

    if(this.tipoDoc == "1"){
      this._titulo = "COTIZACIÓN";
      this._tituloFecNec = "Fecha de Vigencia";
    }
    if(this.tipoDoc == "2" || this.tipoDoc == "3"){
      this._titulo = "PEDIDO VENTA";
      this._tituloFecNec = "Fecha de Entrega";
    }

    // trae los nombres de los campos de las dimenciones
    const dataDimension: any = await this.maestroService.obtenerDimencion().toPromise();
    // console.log("Nombres Dimension", dataDimension)
    if (dataDimension.estado == "True") {
      for (let i = 0; i < dataDimension.listaTablaGeneral.length; i++) {
        // console.log("dimension", dataDimension.listaTablaGeneral[i].descripcion);

        switch (dataDimension.listaTablaGeneral[i].descripcion) {
          case "Dimensión 1":
            this.dimencion1 = dataDimension.listaTablaGeneral[i].valor01;
            this._dimencion1 = dataDimension.listaTablaGeneral[i].descripcion;
            break;
          case "Dimensión 2":
            this.dimencion2 = dataDimension.listaTablaGeneral[i].valor01;
            this._dimencion2 = dataDimension.listaTablaGeneral[i].descripcion;
            break;
          case "Dimensión 3":
            this.dimencion3 = dataDimension.listaTablaGeneral[i].valor01;
            this._dimencion3 = dataDimension.listaTablaGeneral[i].descripcion;
            break;
          case "Dimensión 4":
            this.dimencion4 = dataDimension.listaTablaGeneral[i].valor01;
            this._dimencion4 = dataDimension.listaTablaGeneral[i].descripcion;
            break;
          case "Dimensión 5":
            this.dimencion5 = dataDimension.listaTablaGeneral[i].valor01;
            this._dimencion5 = dataDimension.listaTablaGeneral[i].descripcion;
            break;
        }
      }
    }

    let headerDocumentoAux: ColumnHeader[] = [
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
      {
        label: "Stock",
        key: "stockDisponible",
        subKey: "",
        customClass: "derecha",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "UndMed",
        key: "",
        subKey: "",
        customClass: "listaUnd",
        type: "select",
        value: "",
        visible: true
      },
      {
        label: "Cantidad",
        key: "",
        subKey: "",
        customClass: "",
        type: "text",
        value: "",
        visible: true
      },
      {
        label: "Descuento",
        key: "descuento",
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
      {
        label: "Proyecto",
        key: "",
        subKey: "",
        customClass: "Proyecto",
        type: "select",
        value: "",
        visible: this.xproyecto
      },
      {
        label: this.dimencion1,
        key: "",
        subKey: "",
        customClass: this._dimencion1,
        type: "select",
        value: "",
        visible: this.xdimencion1
      },
      {
        label: this.dimencion2,
        key: "",
        subKey: "",
        customClass: this._dimencion2,
        type: "select",
        value: "",
        visible: this.xdimencion2
      },
      {
        label: this.dimencion3,
        key: "",
        subKey: "",
        customClass: this._dimencion3,
        type: "select",
        value: "",
        visible: this.xdimencion3
      },
      {
        label: this.dimencion4,
        key: "",
        subKey: "",
        customClass: this._dimencion4,
        type: "select",
        value: "",
        visible: this.xdimencion4
      },
      {
        label: this.dimencion5,
        key: "",
        subKey: "",
        customClass: this._dimencion5,
        type: "select",
        value: "",
        visible: this.xdimencion5
      },
      {
        label: "*",
        key: "codArticulo",
        subKey: "",
        customClass: "btnDelete",
        type: "buttonDelete",
        value: "",
        visible: true
      }
    ];

    // console.log("col con false",headerDocumentoAux)
    let colDel: string[] = []
    for(let i=0; i<headerDocumentoAux.length; i++){
      if(headerDocumentoAux[i].visible == false){
        colDel.push(headerDocumentoAux[i].label)
      }
    }
    // console.log(colDel)
    for(let j=0; j<colDel.length; j++){
      for(let x=0; x<headerDocumentoAux.length; x++){
        if(colDel[j] == headerDocumentoAux[x].label){
          headerDocumentoAux.splice(x, 1);
        }
      }
    }

    // console.log("col sin false",headerDocumentoAux)
    this.headerDocumento = headerDocumentoAux

    this.headerProducto = [
      {
        label: "Código",
        key: "codArticulo",
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
        label: "Unidad",
        key: "unidadMedida",
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
        customClass: "",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Stock",
        key: "cantActual",
        subKey: "",
        customClass: "",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Disponible",
        key: "stockDisponible",
        subKey: "",
        customClass: "",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "",
        key: "codArticulo",
        subKey: "",
        customClass: "btnEdit",
        type: "buttonSelect",
        value: "",
        visible: true
      },
    ];

    this.headerProductoStock = [
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
        label: "Stock",
        key: "cantActual",
        subKey: "",
        customClass: "derecha",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Disponible",
        key: "stockDisponible",
        subKey: "",
        customClass: "derecha",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Solicitado",
        key: "cantSolicitada",
        subKey: "",
        customClass: "derecha",
        type: "",
        value: "",
        visible: true
      },
    ];

    this.headerPromoSuge = [
      {
        label: "Artículo",
        key: "nomProduto",
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
        customClass: "right",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Tipo Dscto",
        key: "tipoDescuento",
        subKey: "",
        customClass: "",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Valor",
        key: "valor",
        subKey: "",
        customClass: "right",
        type: "",
        value: "",
        visible: true
      }
    ];

    this.headerCliente = [
      {
        label: "Código",
        key: "codigoCliente",
        subKey: "",
        customClass: "",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Razón Social",
        key: "nombre",
        subKey: "",
        customClass: "",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Linea Cred.",
        key: "lineaCredito",
        subKey: "",
        customClass: "right",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Saldo",
        key: "saldoDisponible",
        subKey: "",
        customClass: "right",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "",
        key: "codigoCliente",
        subKey: "",
        customClass: "btnEdit",
        type: "buttonSelect",
        value: "",
        visible: true
      },
    ];

    this.maestroService.obtenerCondicionPago().subscribe((data: any) => {
      if(data.estado == "True"){
        this.listaCondPago = data.listaTablaGeneral;
      }
    });

    const dataMoneda: any = await this.maestroService.obtenerMoneda().toPromise();
    if(dataMoneda.estado == "True"){
      this.listaMoneda = dataMoneda.listaTablaGeneral;      
    }
    
    this.maestroService.obtenerImpuesto().subscribe((data: any) => {
      // console.log(data);
      if(data.estado == "True"){
        this.listaImpuesto = data.listaTablaGeneral;
      }
    });


    //Obtener Subdimencion1
    if (this.xdimencion1){
      this.maestroService.obtenerSubDimencion("1").subscribe((data: any) => {
        // console.log(data);
        if(data.estado == "True"){
          this.listaDim1 = data.listaTablaGeneral;
        }
      });
    }

    //Obtener Subdimencion2
    if(this.xdimencion2){
      this.maestroService.obtenerSubDimencion("2").subscribe((data: any) => {
        // console.log(data);
        if(data.estado == "True"){
          this.listaDim2 = data.listaTablaGeneral;
        }
      });
    }

    //Obtener Subdimencion3
    if(this.xdimencion3){
      this.maestroService.obtenerSubDimencion("3").subscribe((data: any) => {
        // console.log(data);
        if(data.estado == "True"){
          this.listaDim3 = data.listaTablaGeneral;
        }
      });
    }

    //Obtener Subdimencion4
    if(this.xdimencion4){
      this.maestroService.obtenerSubDimencion("4").subscribe((data: any) => {
        // console.log(data);
        if(data.estado == "True"){
          this.listaDim4 = data.listaTablaGeneral;
        }
      });
    }

    //Obtener Subdimencion5
    if(this.xdimencion5){
      this.maestroService.obtenerSubDimencion("5").subscribe((data: any) => {
        // console.log(data);
        if(data.estado == "True"){
          this.listaDim5 = data.listaTablaGeneral;
        }
      });
    }

    //Obtener proyecto
    if(this.xproyecto){
      this.maestroService.obtenerProyectos().subscribe((data: any) => {
        console.log(data);
        if(data.estado == "True"){
          this.listaProyecto = data.listaTablaGeneral;
        }
      });
    }

    const dataTipoOper: any = await this.maestroService.obtenerTioOperacion().toPromise();
    if(dataTipoOper.estado == "True"){
      this.listaTpoOper = dataTipoOper.listaTablaGeneral;
    }

    const dataAgencia: any = await this.clienteService.obtenerTransportista().toPromise();
    if(dataAgencia.estado == "True"){
      this.listaTransportista = dataAgencia.listaCLiente
    }

    const dataMedioEnvio: any = await this.maestroService.obtenerMedioEnvio().toPromise();
    if(dataMedioEnvio.estado == "True"){
      this.listaMedioEnvio = dataMedioEnvio.listaTablaGeneral;
    }

    const dataSucursal: any = await this.maestroService.obtenerSucursales().toPromise();
    // console.log("sucursal", dataSucursal);
    if(dataSucursal.estado == "True"){
      this.listaSucursales = dataSucursal.listaTablaGeneral;
    }

    const _sucursal = document.getElementById("input-compania") as HTMLSelectElement;
    _sucursal.value = this.idSucursal;
    this.obtenerListaxSucursal();

    let nroDoc: string | null;
    if(this._route.snapshot.paramMap.get("nro"))
      nroDoc = this._route.snapshot.paramMap.get("nro");
    else
      nroDoc = "";

    if(this.tipoDoc == "3" || (this.tipoDoc == "1" && nroDoc != "0")){
      await this.buscarCotizacion(nroDoc);
      this.setValueGrilla(this.listaDocumento);
    }

    let xFecha: Date = new Date()
    
    const _txtFecDoc = document.getElementById("input-fecha-docu") as HTMLInputElement;
    _txtFecDoc.value = this.fecDocumento;
    const _txtFecNec = document.getElementById("input-fecha-necesaria") as HTMLInputElement;

    xFecha.setDate(xFecha.getDate() + this.diasVen)
    if(this.tipoDoc != "3"){
      this.fecNecesaria = xFecha.toISOString().slice(0, 10);      
    }

    _txtFecNec.value = this.fecNecesaria;
  }

  openCliente(){
    this.lblMensajeVacio = "";
    this.clienteDialog = true;
  }

  openProducto(){
    this.lblMensajeVacio = "";
    const _cmbAlmacen = document.getElementById("input-alm-ven") as HTMLSelectElement;
    this.codAlmacen = _cmbAlmacen.value;
    if(this.codAlmacen == ""){
      this.msgError = "Seleccione un almacén de venta"
      this.errorDialog = true;
    }else{
      this.productDialog = true;
      // this.modalService.open(content, { size: 'xl' });
    }

  }

  async buscarProducto(){
    this.lblMensajeVacio = "";
    this.listaPaginas = [];
    this.pagina = 0;
    this.listaProducto = [];
    // const _almacen: any = document.querySelector("#cmbAlmacen");
    // const almacen: string = _almacen.value;    
    const _flag = document.getElementById("input-cb-todos") as HTMLInputElement
    const xFlag: string = _flag.checked ? "1" : "0";
    // console.log(xFlag, this.valorProducto+"-"+this.codAlmacen+"-"+this.precioLista+"-"+this.codMoneda);
    const data: any = await this.artService.obtenerProducto(this.valorProducto, this.codAlmacen, this.precioLista, this.codMoneda, xFlag).toPromise();
    console.log("productos", data);
    
    if(data.estado == "True"){
      this.lblMensajeVacio = "";
      this.listaPaginas = [];
      this.pagina = 0;
      this.listaProducto = data.listaArticulo;
      const residuo: number = this.listaProducto.length % 7;
      const cociente: string = (this.listaProducto.length / 7).toString().split('.')[0];
      const x: number = residuo == 0 ? 0 : 1;
      for(let i = 1; i <= Number(cociente) + x; i++){
        this.listaPaginas.push(i);
      }
    }else{
      this.lblMensajeVacio = data.mensaje;
    }
  }

  buscarCliente(){    
    this.listaPaginas = [];
    this.pagina = 0;
    this.listaCliente = []
    const _cbTodos = document.getElementById("customCheck1") as HTMLInputElement
    let flag: string = "";
    if(_cbTodos.checked){
      flag = 'T'
    }
    // console.log(this.valorCliente, this.codVendedor+"-"+flag);
    
    this.clienteService.obtenerCliente(this.valorCliente, this.codVendedor, flag).subscribe((data: any) => {
      console.log("Lista Cliente", data);
      if(data.estado == "True"){
        this.lblMensajeVacio = "";
        this.listaCliente = data.listaCLiente;
        const residuo: number = this.listaCliente.length % 5;
        const cociente: string = (this.listaCliente.length / 5).toString().split('.')[0];
        const x: number = residuo == 0 ? 0 : 1;
        for(let i = 1; i <= Number(cociente) + x; i++){
          this.listaPaginas.push(i);
        }
      }else{
        this.lblMensajeVacio = data.mensaje;
      }
    });
  }

  deleteProduct( row: any){
    const index: number = this.listaDocumento.indexOf(row);
    if (index !== -1) {
        this.listaDocumento.splice(index, 1);
    }
    this.flagPromo = false;
    this.actualizarCantDel();
  }

  actualizarCant( row: any){
    if(row != ""){
      this.flagPromo = false;
    }

    const _table: any = document.querySelector("#gridDoc");
    let _subTotal: Number = 0;
    let _impuesto: Number = 0;
    let _docTotal: Number = 0;
    let _docTotalSD: Number = 0;

    for(let i = 1; i < _table.rows.length; i++){
      let _PrecioUnit: number = 0;

      // if (this.listaPrecioBruto){
      //   _PrecioUnit = Number(this.listaDocumento[i-1].precioBruto) / 1.18;
      // }else{
      //   _PrecioUnit = Number(this.listaDocumento[i-1].precioBruto);
      // }

      const xCant: Number = Number(_table.rows[i].cells[5].children[0].value);
      const xPrec: Number = this.listaDocumento[i-1].precioUnit;
      // const xPrec: Number = _PrecioUnit;
      const xDesc: Number = 1 - (Number(this.listaDocumento[i-1].descuento) / 100)
      let xPrecioTot: Number = Number((Number(xCant) * Number(xPrec) * Number(xDesc)).toFixed(2));
      let xPreSinDes: Number = Number((Number(xCant) * Number(xPrec)).toFixed(2));
      _docTotalSD = Number(_docTotalSD) + Number(xPreSinDes);

      this.listaDocumento[i-1].precioTotal = xPrecioTot;
      this.listaDocumento[i-1].cantidad = xCant;

      _subTotal = Number(_subTotal) + Number(xPrecioTot);
    }

    
    const _txtPorDescuento = document.getElementById("input-por-descuento") as HTMLInputElement;
    const _txtDescuento = document.getElementById("input-descuento") as HTMLInputElement;
    const _txtSubTotal = document.getElementById("input-subtotal") as HTMLInputElement;
    const _txtImouesto = document.getElementById("input-impuesto") as HTMLInputElement;
    const _txtTotal = document.getElementById("input-total") as HTMLInputElement;
    
    const descuento:number = Number((Number(_subTotal) * Number((_txtPorDescuento.value == "" ? "0" : _txtPorDescuento.value)) / 100).toFixed(2));
    _txtDescuento.value = descuento.toLocaleString("es-PE", { style: "currency", currency: this.codMoneda });
    
    if(this.codImpuesto == "IGV"){
      _impuesto = Number(((Number(_subTotal) - descuento )* 0.18).toFixed(2));
    }

    _docTotal = Number(_subTotal) + Number(_impuesto) - descuento

    this.subTotal = _subTotal.toLocaleString("es-PE", { style: "currency", currency: this.codMoneda });
    this.impuesto = _impuesto.toLocaleString("es-PE", { style: "currency", currency: this.codMoneda });
    this.docTotal = _docTotal.toLocaleString("es-PE", { style: "currency", currency: this.codMoneda });
    
    _txtSubTotal.value = this.subTotal;    
    _txtImouesto.value = this.impuesto;    
    _txtTotal.value = this.docTotal;
    
  }

  actualizarCantDel(){
    
    let _subTotal: Number = 0;
    let _impuesto: Number = 0;
    let _docTotal: Number = 0;

    for(let i = 0; i < this.listaDocumento.length; i++){
      const xCant: Number = this.listaDocumento[i].cantidad;
      const xPrec: Number = this.listaDocumento[i].precioUnit;
      let xPrecioTot: Number = Number((Number(xCant) * Number(xPrec)).toFixed(2));

      _subTotal = Number(_subTotal) + Number(xPrecioTot);
    }

    if(this.codImpuesto == "IGV"){
      _impuesto = Number((Number(_subTotal) * 0.18).toFixed(2));
    }

    _docTotal = Number(_subTotal) + Number(_impuesto)

    this.subTotal = _subTotal.toLocaleString("es-PE", { style: "currency", currency: this.codMoneda });
    this.impuesto = _impuesto.toLocaleString("es-PE", { style: "currency", currency: this.codMoneda });
    this.docTotal = _docTotal.toLocaleString("es-PE", { style: "currency", currency: this.codMoneda });

    const _txtSubTotal = document.getElementById("input-subtotal") as HTMLInputElement;
    _txtSubTotal.value = this.subTotal;

    const _txtImouesto = document.getElementById("input-impuesto") as HTMLInputElement;
    _txtImouesto.value = this.impuesto;

    const _txtTotal = document.getElementById("input-total") as HTMLInputElement;
    _txtTotal.value = this.docTotal;
  }

  actualizarDesc( row: any){
    // console.log(row);
    const _table: any = document.querySelector("#gridDoc");
    let _subTotal: Number = 0;
    let _impuesto: Number = 0;
    let _docTotal: Number = 0;
    let _descuento: Number = 0;

    for(let i = 1; i < _table.rows.length; i++){
      const xCant: Number = Number(_table.rows[i].cells[5].children[0].value);
      const xPrec: Number = this.listaDocumento[i-1].precioUnit;

      const xPorDescuento: Number = Number(_table.rows[i].cells[6].children[0].value);
      let xPrecioTot: Number = Number(xCant) * Number(xPrec);

      let xImporteConDesc: Number = Number(xPrecioTot) * ( 1 - (Number(xPorDescuento) / 100))

      this.listaDocumento[i-1].precioTotal = xImporteConDesc;

      _subTotal = Number(_subTotal) + Number(xImporteConDesc);
    }

    if(this.codImpuesto == "IGV"){
      _impuesto = Number(_subTotal) * 0.18;
    }

    _docTotal = Number(_subTotal) + Number(_impuesto)

    this.subTotal = _subTotal.toLocaleString("es-PE", { style: "currency", currency: this.codMoneda });
    this.impuesto = _impuesto.toLocaleString("es-PE", { style: "currency", currency: this.codMoneda });
    this.docTotal = _docTotal.toLocaleString("es-PE", { style: "currency", currency: this.codMoneda });

    const _txtSubTotal = document.getElementById("input-subtotal") as HTMLInputElement;
    _txtSubTotal.value = this.subTotal;

    const _txtImouesto = document.getElementById("input-impuesto") as HTMLInputElement;
    _txtImouesto.value = this.impuesto;

    const _txtTotal = document.getElementById("input-total") as HTMLInputElement;
    _txtTotal.value = this.docTotal;
  }

  async selectProduct( row: Producto){
    // console.log("art Sel", row);
    const listaAux: any = this.listaDocumento.filter(t => t.idProducto == row.codArticulo);
    // console.log(listaAux);
    if(listaAux.length > 0){
      this.productDialog = false;
      return;
    }
    
    if(row.precioUnit == 0 || row.precioUnit == null || row.precioUnit == undefined){
      this.msgError = "No sepuede agregar un articulo sin precio"
      this.productDialog = false;
      this.errorDialog = true;
      return;
    }

    const dataUndMed: any = await this.maestroService.obtenerUnidadMedida(row.codArticulo).toPromise();

    let _PrecioUnit: number = 0;

    if (this.listaPrecioBruto){
      _PrecioUnit = Number((Number(row.precioUnit) / 1.18).toFixed(2));
    }else{
      _PrecioUnit = Number(row.precioUnit);
    }

    let detalle: PedidoDet = {
      idProducto: row.codArticulo,
      descripcion: row.descripcion,
      cantidad: 0,
      unidad: row.codUndMed.toString(),
      codUndMed: 0,
      precioUnit: _PrecioUnit,
      precioBruto: Number(row.precioUnit),
      precioTotal: 0,
      tipoImpuesto: this.codImpuesto,
      codAlmacen: this.codAlmacen,
      stockDisponible: row.stockDisponible,
      dimension1: this._xDimencion1,
      dimension2: row.centroCosto,
      dimension3: this._xDimencion3,
      dimension4: this._xDimencion4,
      dimension5: this._xDimencion5,
      proyecto: "",
      lineNum: -1,
      descuento: 0,
      listaUnd: dataUndMed.listaTablaGeneral,
      u_EXP_CODIGO: '',
      u_EXP_PROMOCION: '',
      u_EXP_TIPO: '',
      u_EXP_VALOR: 0,
      u_EXP_ASIGNAR: 0,
      u_EXP_APLICACANT: 0,
      u_EXP_COLOR: '',
      u_EXP_TIPODSCTO: '',
      u_EXP_REFERENCIA: '',
      isBonificcion: false
    };
    // console.log(detalle);
    
    this.listaProducto = [];
    this.listaDocumento.push(detalle);
    this.unidadMedidaAux.push(row.codUndMed.toString())
    this.productDialog = false;
    this.flagPromo = false;
    this.setValueGrilla(this.listaDocumento)
  }

  async selectCliente( row: any ){
    this.clienteSelect = row;
    if(row.flag == false){
      this.confirmDialogCliente = true; 
    }else{
      this.seleccionarCliente(this.clienteSelect);
    }
    this.clienteDialog = false;
  }

  async seleccionarCliente( row: any ){
    this.codCliente = row.codigoCliente;
    this.nomCliente = row.nombre;
    console.log("Cli sel", row);
    if(this.codCondPag == "") this.codCondPag = row.codCondPago;
    this.rucCliente = row.ruc;
    this.medioEnvio = row.shipType;

    const _txtCodCli: any = document.getElementById("input-cod-cliente");
    _txtCodCli.value = this.codCliente;

    const _txtNomCli: any = document.getElementById("input-razon-social");
    _txtNomCli.value = this.nomCliente;

    // console.log(this.codCliente, this.nomCliente);
    
    const data: any = await    this.maestroService.obtenerAlmacenCliente(this.codCliente).toPromise();
    if(data.estado == "True"){
      this.codDireccion = data.listaTablaGeneral[0].codigo;
      this.listaAlmacenCliente = data.listaTablaGeneral;
    }

    // const _cmbMoneda = document.getElementById("input-cod-moneda") as HTMLSelectElement;
    // _cmbMoneda.value = this.codMoneda;

    const _cmbCondPago = document.getElementById("input-cond-pago") as HTMLSelectElement;
    _cmbCondPago.value = this.codCondPag;
    
    const _cmbMedEnv = document.getElementById("input-medio-envio") as HTMLSelectElement;
    _cmbMedEnv.value = this.medioEnvio.toString();

    // const _cmbTpoOpe = document.getElementById("input-tip-ope") as HTMLSelectElement;
    // _cmbTpoOpe.value = "01";
    
    this.listaCliente = [];
    this.confirmDialogCliente =  false;
  }

  confirmDelete(){

  }

  closeModalCli(){
    this.listaCliente = [];
    this.clienteDialog = false;
  }

  closeModalProd(){
    this.listaProducto = [];
    this.productDialog = false;
  }

  closeDialog(){
    this.errorDialog = false;
  }

  async guardar(){
    if(this.flagPromo != true){
      this.msgError = 'Antes de guardar debe dar clic en "Aplicar Promoción"';
      this.errorDialog = true;
      return;
    }

    const mensaje = await this.validarDatos();

    if(mensaje != ""){
      this.msgError = mensaje;
      this.errorDialog = true;
      return;
    }

    const _fecNecesaria: Date = new Date(this.fecNecesaria);
    const _fecDocumento: Date = new Date(this.fecDocumento);
    const _fecContabilizacion: Date = new Date(this.fecContabilizacion);

    const dir: any = this.listaAlmacenCliente.find(t => t.codigo === this.codDireccion);
    // console.log("almacen cliente", dir);
    // console.log("geolocation", this.locationService.userLocation);
    let latitude: string = "";
    let longitude: string = "";

    if(!!this.locationService.userLocation){
      longitude = this.locationService.userLocation[0].toString()
      latitude = this.locationService.userLocation[1].toString();
    }

    this.flagLoad = true;

    let pedido: PedidoCab = {
      idPedido: this._idDocumento,
      nroPedido: '',
      codCliente: this.codCliente,
      condPago: this.codCondPag,
      fecSolicitado: _fecNecesaria,
      fecPedido: _fecDocumento,
      fecContabilizacion: _fecContabilizacion,
      nroOC: '',
      subTotal: 0,
      descuento: this._descuentoGlobal,
      importeTotal: 0,
      moneda: this.codMoneda,
      estado: '',
      comentario: this.commentario,
      codVendedor: this.codVendedor.toString(),
      codDireccion: this.codDireccion,
      direccion: dir.descripcion,
      codTransTramo1: '',
      rucTransTramo1: '',
      nomTransTramo1: '',
      dirTransTramo1: '',
      userReg: this.user,
      latitud: latitude,
      longitud: longitude,
      nomCliente: this.nomCliente,
      rucCliente: this.rucCliente,
      tipoDoc: this.tipoDoc,
      tipoOperacion: this.tipoOperacion,
      series: this.series,
      listaDetalle: this.listaDocumento,
      archivo: this.archivo,
      nomArchivo: this.nomArchivo,
      sucursal: Number(this.idSucursal),
      codAgTra: this.codTransportista,
      nomAgTra: this.nomTransportista,
      rucAgTra: this.rucTransportista,
      dirAgTra: this.dirTransportista,
      cdiAgTra: this.cdiTransportista,
      zonAgTra: this.zonTransportista,
      medioEnvio: this.medioEnvio,
      estadoPed: ""
    };

    console.log(this.tipoDoc, pedido);

    if (this.tipoDoc == "3"){
      const data: any = await this.documentService.CopyToDocumento(pedido).toPromise();
      // console.log("rpta reg", data);
      this.flagLoad = false;

      this.msgError = data.mensaje;
      if(data.estado){
        if(this.msgError.includes("preliminar")){
          this.tipoDoc = "3";
        }
        this.confirmDialog = true;
        this.nroDoc = data.key;
      }else{
        this.errorDialog = true;
      }
    }else{
      if(pedido.idPedido == 0){
        const data: any = await this.documentService.registrarDocumento(pedido).toPromise();
        // console.log("rpta reg", data);
        this.flagLoad = false;
        
        this.msgError = data.mensaje;
        if(data.estado){
          if(this.msgError.includes("preliminar")){
            this.tipoDoc = "3";
          }
          this.confirmDialog = true;
          this.nroDoc = data.key;
        }else{
          this.errorDialog = true;
        }
      }else{
        const data: any = await this.documentService.editarDocumento(pedido).toPromise();
        // console.log("rpta reg", data);
        this.flagLoad = false;
        
        this.msgError = data.mensaje;
        if(data.estado){
          if(this.msgError.includes("preliminar")){
            this.tipoDoc = "3";
          }
          this.confirmDialog = true;
          this.nroDoc = data.key;
        }else{
          this.errorDialog = true;
        }
      }
    }
  }

  async validarDatos(): Promise<string> {
    let xRpta: string = "";

    const _cmbCompan = document.getElementById("input-compania") as HTMLSelectElement
    const _txtCodCli = document.getElementById("input-cod-cliente") as HTMLInputElement
    const _txtNomCli = document.getElementById("input-razon-social") as HTMLInputElement
    const _txtFecDoc = document.getElementById("input-fecha-docu") as HTMLInputElement
    const _txtFecNec = document.getElementById("input-fecha-necesaria") as HTMLInputElement
    const _cmbSeries = document.getElementById("input-serie") as HTMLSelectElement
    const _cmbMoneda = document.getElementById("input-cod-moneda") as HTMLSelectElement
    const _cmbDirCli = document.getElementById("input-dir-cli") as HTMLSelectElement
    const _cmbAlmVen = document.getElementById("input-alm-ven") as HTMLSelectElement
    const _cmbCodImp = document.getElementById("input-cod-imp") as HTMLSelectElement
    const _cmbConPag = document.getElementById("input-cond-pago") as HTMLSelectElement
    const _cmbTpoOpe = document.getElementById("input-tip-ope") as HTMLSelectElement
    const _cmbMedEnv = document.getElementById("input-medio-envio") as HTMLSelectElement
    const _txtComent = document.getElementById("input-comment") as HTMLInputElement
    const _txtPorDescuento = document.getElementById("input-por-descuento") as HTMLInputElement;

    this.idSucursal = _cmbCompan.value;
    this.codCliente = _txtCodCli.value;
    this.nomCliente = _txtNomCli.value;
    this.fecNecesaria = _txtFecNec.value;
    this.fecDocumento = _txtFecDoc.value;
    this.series = _cmbSeries.value;
    this.codMoneda = _cmbMoneda.value;
    this.codDireccion = _cmbDirCli.value;
    this.codAlmacen = _cmbAlmVen.value;
    this.codImpuesto = _cmbCodImp.value;
    this.codCondPag = _cmbConPag.value;
    this.tipoOperacion = _cmbTpoOpe.value;
    this.commentario = _txtComent.value;
    this.fecContabilizacion = this.fecDocumento
    this.medioEnvio = Number(_cmbMedEnv.value);

    try {
      this._descuentoGlobal = Number(_txtPorDescuento.value);      
    } catch (error) {
      console.log(error);
      xRpta += "\n - El campo descuento debe ser númerico";
    }    

    const dir: any = this.listaAlmacenCliente.find(t => t.codigo === this.codDireccion);

    if(this.codCliente == ""){
      xRpta += "\n - Debe seleccionar un cliente";
    }

    if(dir == null || dir == undefined){
      xRpta += "\n - Debe seleccionar una dirección de cliente";
    }

    if(this.codCondPag == ""){
      xRpta += "\n - Debe seleccionar una condición de pago";
    }

    if(this.listaDocumento == null || this.listaDocumento == undefined || this.listaDocumento.length == 0){
      xRpta += "\n - Debe agregar un producto";
    }

    const _table: any = document.querySelector("#gridDoc");
    for(let i = 1; i < _table.rows.length; i++){
      const xCant: string = _table.rows[i].cells[5].children[0].value;
      if(xCant == ""){
        xRpta += `\n - Debe colocar una cantidad en la fila ${ i }`
      }else{
        const xUndM: string = _table.rows[i].cells[4].children[0].value;
        // const xProy: string = _table.rows[i].cells[7].children[0].value;
        // const xDim1: string = _table.rows[i].cells[8].children[0].value;
        // const xDim2: string = _table.rows[i].cells[9].children[0].value;
        // const xDim3: string = _table.rows[i].cells[10].children[0].value;
        // const xDim4: string = _table.rows[i].cells[11].children[0].value;
        // const xDim5: string = _table.rows[i].cells[12].children[0].value;

        this.listaDocumento[i - 1].codUndMed = Number(xUndM);
        // this.listaDocumento[i - 1].proyecto = xProy;
        // this.listaDocumento[i - 1].dimension1 = xDim1;
        // this.listaDocumento[i - 1].dimension2 = xDim2;
        // this.listaDocumento[i - 1].dimension3 = xDim3;
        // this.listaDocumento[i - 1].dimension4 = xDim4;
        // this.listaDocumento[i - 1].dimension5 = xDim5;
      }
    }

    if(xRpta != ""){
      xRpta = "Hay campos que deben ser llenados: " + xRpta.split("\n").join("<br />");
    }

    return xRpta;
  }

  closeDialogConfirm(){
    // console.log("OK");
    this.router.navigateByUrl(`/doc-mostrar/${ this.nroDoc }/${ this.tipoDoc }`, { replaceUrl: true });
  }

  async actualizarPrecio(row: any){
    let xUndMed: string = "";
    let x: number = 0;
    const _table: any = document.querySelector("#gridDoc");
    for(let i = 1; i < _table.rows.length; i++){
      const codigo = this.listaDocumento[i -1].idProducto;
      if(row.idProducto == codigo){
        xUndMed = _table.rows[i].cells[4].children[0].value;
        console.log(xUndMed);
        this.listaDocumento[i - 1].unidad = xUndMed;
        x = i-1;
      }
    }

    const _cmbAlmVen = document.getElementById("input-alm-ven") as HTMLSelectElement
    const dataStock: any = await this.artService.obtenerStockUnd(_cmbAlmVen.value, xUndMed, row.idProducto).toPromise();
    let stockUnd: Number;
    if (dataStock.estado == "True"){
      const prodaux: Producto = dataStock.listaArticulo[0];
      stockUnd = prodaux.cantActual;
    }


    // console.log(this.precioLista + "-" + this.codMoneda + "-" + xUndMed,row.idProducto);
    const data: any = await this.artService.obtenerProductPrecio(this.precioLista, this.codMoneda, xUndMed, row.idProducto).toPromise();
    // console.log(data);
    
    if (data.estado == "True"){
      const prodaux: Producto = data.listaArticulo[0];
      let _PrecioUnit: number;
      if (this.listaPrecioBruto){
        _PrecioUnit = Number((Number(prodaux.precioUnit) / 1.18).toFixed(2));
      }else{
        _PrecioUnit = Number(prodaux.precioUnit);
      }

      this.listaDocumento[x].precioUnit = _PrecioUnit;
      this.listaDocumento[x].stockDisponible = parseInt(stockUnd.toString());
      this.actualizarCant( row );
    }else{
      this.errorDialog = true;
      this.msgError = "No hay precio para la unidad de medida seleccionado";
      _table.rows[x+1].cells[4].children[0].value = this.unidadMedidaAux[x]
    }    
  }

  mostrarStock(item: any){
    const codProducto = item.idProducto;
    let xUndMed: string = "";
    let x: number = 0;
    const _table: any = document.querySelector("#gridDoc");
    for(let i = 1; i < _table.rows.length; i++){
      const codigo = this.listaDocumento[i -1].idProducto;
      if(codProducto == codigo){
        xUndMed = _table.rows[i].cells[4].children[0].value;        
      }
    }

    this.artService.obtenerProductoStock(codProducto, xUndMed).subscribe((data: any) => {
      console.log("stock", data);
      let lista: Producto[] = [];
      if(data.estado == "True"){
        lista = data.listaArticulo;
        for(let i = 0; i < lista.length; i++){
          let _cantAct: Number = lista[i].cantActual;
          let _cantSol: Number = lista[i].cantSolicitada;
          let _cantDis: Number = lista[i].stockDisponible;
          lista[i].cantActual = parseInt(_cantAct.toString())
          lista[i].cantSolicitada = parseInt(_cantSol.toString())
          lista[i].stockDisponible = parseInt(_cantDis.toString())
        }

        this.descProducto = lista[0].descripcion;
        this.listaProductoStock = lista.filter(t=> t.stockDisponible != 0)
        this.productStockDialog = true;
      }
    });
  }

  async obtenerListaxSucursal(){
    // debugger;
    // const _cmbCompania: any = document.getElementById("input-compania");
    // this.idSucursal = _cmbCompania.value;
    // console.log("sucursal", this.idSucursal);
    let _tipoDoc: string;

    if(this.tipoDoc == "3"){
      _tipoDoc = "2";
    }else{
      _tipoDoc = this.tipoDoc;
    }

    const dataAlmVen: any = await this.maestroService.obtenerAlmacenVenta(this.idSucursal).toPromise();
    if(dataAlmVen.estado == "True"){
      this.listaAlmacen = dataAlmVen.listaTablaGeneral;
      this.codAlmacen = this.listaAlmacen[0].codigo;
      const _cmbAlmacen = document.getElementById("input-alm-ven") as HTMLSelectElement;
      _cmbAlmacen.value = this.codAlmacen;
    }
    
    const dataSerie: any = await this.maestroService.obtenerSeries(_tipoDoc, this.idSucursal).toPromise();
    if(dataSerie.estado == "True"){
      this.listaSeries = dataSerie.listaTablaGeneral;
      this.series = this.listaSeries[0].codigo;    
      const _cmbSerie = document.getElementById("input-serie") as HTMLSelectElement;
      _cmbSerie.value = this.series;
    }
  }

  selectPagina(pag: number){
    this.pagina = pag;
  }

  capturarFile(event): any{
    const fileCopy = event.target.files[0];
    // console.log(fileCopy);
    
    this.extraerBase64(fileCopy).then((file: any) => {
      // console.log(file);
      this.archivo = (file.base).split(',')[1];
      this.nomArchivo = fileCopy.name;

      // console.log(this.nomArchivo, this.archivo);
      
    })
  }

  extraerBase64 = async ( $event: any ) => new Promise(( resolve, reject) => {
    try {
      const unsafeFile = window.URL.createObjectURL($event);
      const file = this.sanitizer.bypassSecurityTrustUrl(unsafeFile);
      const reader = new FileReader();
      reader.readAsDataURL($event);

      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };

      reader.onerror = () => {
        resolve({
          base: null
        });
      };
    } catch (error) {
      return null
    }
  })

  columnasGrillaDetalle(config: any){
    if(this.dataUsuario.config){

    }
  }

  async buscarCotizacion(nro: string){
    // console.log("numero coti", nro)
    const dataDocumento: any = await this.documentService.obtenerDocumento(nro, "1").toPromise();
    // console.log("documento", dataDocumento);    
    if(dataDocumento.estado == "True"){
      this.pedidoCopy = dataDocumento.listaPedido[0];
      this.idSucursal = this.pedidoCopy.sucursal.toString();
      this.nroDocumento = this.pedidoCopy.nroPedido;
      this._idDocumento = this.pedidoCopy.idPedido;
      await this.obtenerListaxSucursal();

      const dataAlmCli: any = await this.maestroService.obtenerAlmacenCliente(this.pedidoCopy.codCliente).toPromise();
      if(dataAlmCli.estado == "True"){
        this.listaAlmacenCliente = dataAlmCli.listaTablaGeneral;
      }
      
      this.listaDocumento = this.pedidoCopy.listaDetalle;

      this.unidadMedidaAux = []
      for(let i =0; i<this.listaDocumento.length; i++){
        const dataUndMed: any = await this.maestroService.obtenerUnidadMedida(this.listaDocumento[i].idProducto).toPromise();
        this.listaDocumento[i].listaUnd = dataUndMed.listaTablaGeneral;
        this.listaDocumento[i].unidad =this.listaDocumento[i].codUndMed.toString();
        this.unidadMedidaAux.push(this.listaDocumento[i].codUndMed.toString());        
      }

      const _txtCodCli = document.getElementById("input-cod-cliente") as HTMLInputElement;
      const _txtNomCli = document.getElementById("input-razon-social") as HTMLInputElement;
      const _txtFecDoc = document.getElementById("input-fecha-docu") as HTMLInputElement;
      const _txtFecNec = document.getElementById("input-fecha-necesaria") as HTMLInputElement;
      const _txtComent = document.getElementById("input-comment") as HTMLInputElement;
      const _txtRucAgT = document.getElementById("input-ag-ruc") as HTMLInputElement;
      const _txtDirAgT = document.getElementById("input-ag-dir") as HTMLInputElement;
      const _cmbSeries = document.getElementById("input-serie") as HTMLSelectElement
      const _cmbMoneda = document.getElementById("input-cod-moneda") as HTMLSelectElement;
      const _cmbAlmVen = document.getElementById("input-alm-ven") as HTMLSelectElement
      const _cmbAlmCli = document.getElementById("input-dir-cli") as HTMLSelectElement
      const _cmbImpues = document.getElementById("input-cod-imp") as HTMLSelectElement
      const _cmbCndPag = document.getElementById("input-cond-pago") as HTMLSelectElement
      const _cmbTpoOpe = document.getElementById("input-tip-ope") as HTMLSelectElement
      const _cmbMedEnv = document.getElementById("input-medio-envio") as HTMLSelectElement
      const _cmbAgTran = document.getElementById("input-ag-tranp") as HTMLSelectElement

      _txtCodCli.value = this.pedidoCopy.codCliente;
      _txtNomCli.value = this.pedidoCopy.nomCliente;
      this.fecDocumento = this.pedidoCopy.fecContabilizacion.toString().substring(0, 10) || "";
      _txtFecDoc.value = this.pedidoCopy.fecContabilizacion.toString().substring(0, 10) || "";
      this.fecNecesaria = this.pedidoCopy.fecSolicitado.toString().substring(0, 10) || "";
      _txtFecNec.value = this.pedidoCopy.fecSolicitado.toString().substring(0, 10) || "";
      _txtComent.value = this.pedidoCopy.comentario || "";
      // _cmbSeries.value = this.pedidoCopy.series;
      _cmbMoneda.value = this.pedidoCopy.moneda;
      _cmbAlmCli.value = this.pedidoCopy.codDireccion;
      _cmbAlmVen.value = this.pedidoCopy.listaDetalle[0].codAlmacen;
      _cmbImpues.value = this.pedidoCopy.listaDetalle[0].tipoImpuesto;
      _cmbCndPag.value = this.pedidoCopy.condPago;
      _cmbTpoOpe.value = "01";//this.pedidoCopy.tipoOperacion;
      _cmbMedEnv.value = this.pedidoCopy.medioEnvio.toString();
      // this._titulo = `${ this._titulo } N° ${ this.pedido.nroPedido }`

      this.codTransportista = this.pedidoCopy.codAgTra;
      this.rucTransportista = this.pedidoCopy.rucAgTra;
      this.nomTransportista = this.pedidoCopy.nomAgTra;
      this.dirTransportista = this.pedidoCopy.dirAgTra;
      this.cdiTransportista = this.pedidoCopy.cdiAgTra;
      this.zonTransportista = this.pedidoCopy.zonAgTra;

      _cmbAgTran.value = this.codTransportista;
      _txtRucAgT.value = this.rucTransportista;
      _txtDirAgT.value = this.dirTransportista;

      let _subTotal: Number = 0; 
      let _impuesto: Number = 0; 
      let _docTotal: Number = 0; 

      for(let i = 0; i < this.listaDocumento.length; i++){
        _subTotal = Number(_subTotal) + Number(this.listaDocumento[i].precioTotal);
      }

      if(this.listaDocumento[0].tipoImpuesto == "IGV"){
        _impuesto = Number(_subTotal) * 0.18
      }

      _docTotal = Number(_subTotal) + Number(_impuesto);
      
      // console.log("subtotal", _subTotal)
      // console.log("IGV", _impuesto)
      // console.log("total", _docTotal)
      
      this.subTotal = _subTotal.toLocaleString("es-PE", { style: "currency", currency: this.pedidoCopy.moneda });
      this.impuesto = _impuesto.toLocaleString("es-PE", { style: "currency", currency: this.pedidoCopy.moneda });
      this.docTotal = _docTotal.toLocaleString("es-PE", { style: "currency", currency: this.pedidoCopy.moneda });
  
      // console.log("subtotal", this.subTotal)
      // console.log("IGV", this.impuesto)
      // console.log("total", this.docTotal)

      const _txtSubTotal = document.getElementById("input-subtotal") as HTMLInputElement;
      _txtSubTotal.value = this.subTotal;
      const _txtImpuesto = document.getElementById("input-impuesto") as HTMLInputElement;
      _txtImpuesto.value = this.impuesto;
      const _txtDocTotal = document.getElementById("input-total") as HTMLInputElement;
      _txtDocTotal.value = this.docTotal;

    }
  }

  setValueGrilla(detalle: PedidoDet[]){
    
    const _table: any = document.querySelector("#gridDoc");
    for(let i = 1; i < _table.rows.length; i++){
      _table.rows[i].cells[5].children[0].value = detalle[i-1].cantidad;
    }
  }

  selectAgencia(){
    const _cmbAgencia = document.getElementById("input-ag-tranp") as HTMLSelectElement;
    const _txtRucAgen = document.getElementById("input-ag-ruc") as HTMLSelectElement;
    const _txtDirAgen = document.getElementById("input-ag-dir") as HTMLSelectElement;
    const xAgencia: string = _cmbAgencia.value

    for(let i=0; i< this.listaTransportista.length; i++){
      if(this.listaTransportista[i].codigoCliente == xAgencia){
        const item: Cliente = this.listaTransportista[i];
        _txtRucAgen.value = item.ruc;
        _txtDirAgen.value = item.direccion;

        this.codTransportista = item.codigoCliente;
        this.rucTransportista = item.ruc;
        this.nomTransportista = item.nombre;
        this.dirTransportista = item.direccion
        this.cdiTransportista = item.codDireccion
        this.zonTransportista = item.zona
      }
    }
  }

  async promocion(){
    const mensaje = await this.validarDatos();

    if(mensaje != ""){
      this.msgError = mensaje;
      this.errorDialog = true;
      return;
    }

    const _fecNecesaria: Date = new Date(this.fecNecesaria);
    const _fecDocumento: Date = new Date(this.fecDocumento);
    const _cmbConPag = document.getElementById("input-cond-pago") as HTMLSelectElement
    const xCondPago: string = this.listaCondPago.find(t=> t.codigo == _cmbConPag.value).descripcion;
    this.flagLoad = true;

    let pedido: PedidoCab = {
      codCliente: this.codCliente,
      fecSolicitado: _fecNecesaria,
      fecPedido: _fecDocumento,
      fecContabilizacion: _fecDocumento,
      nomCliente: this.nomCliente,
      rucCliente: this.rucCliente,
      tipoDoc: this.tipoDoc,
      tipoOperacion: this.tipoOperacion,
      moneda: this.codMoneda,
      codVendedor: this.codVendedor.toString(),
      userReg: this.user,
      listaDetalle: this.listaDocumento,
      idPedido: 0,
      condPago: xCondPago,
      series: "",
      nroPedido: '',
      nroOC: '',
      subTotal: 0,
      descuento: 0,
      importeTotal: 0,
      estado: '',
      comentario: '',
      codDireccion: '',
      direccion: '',
      codTransTramo1: '',
      rucTransTramo1: '',
      nomTransTramo1: '',
      dirTransTramo1: '',
      latitud: '',
      longitud: '',
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
    
    // console.log("datos promocion:", pedido);

    let contProm: number = 0;
    try {
      const data: any = await this.documentService.obtenerPromo(pedido).toPromise();
      console.log("data promo", data);
      // this.msgError = data.mensaje;
      if(data.estado == "True"){
        const pedidoPromo: PedidoCab = data.listaPedido[0];
        const promoDet: PedidoDet[] = pedidoPromo.listaDetalle;
        const bonifDet: PedidoDet[] = data.listaPedido[0].listaBonificacion;
  
        for(let i = 0; i < promoDet.length; i++){
          if(promoDet[i].u_EXP_PROMOCION != ""){
            contProm += 1;
          }

          for(let x = 0; x < this.listaDocumento.length; x++){
            if(this.listaDocumento[x].idProducto == promoDet[i].idProducto){
              this.listaDocumento[x].u_EXP_CODIGO = promoDet[i].u_EXP_CODIGO;
              this.listaDocumento[x].u_EXP_PROMOCION = promoDet[i].u_EXP_PROMOCION;
              this.listaDocumento[x].u_EXP_TIPO = promoDet[i].u_EXP_TIPO;
              this.listaDocumento[x].u_EXP_VALOR = promoDet[i].u_EXP_VALOR;
              this.listaDocumento[x].u_EXP_ASIGNAR = promoDet[i].u_EXP_ASIGNAR;
              this.listaDocumento[x].u_EXP_APLICACANT = promoDet[i].u_EXP_APLICACANT;
              this.listaDocumento[x].u_EXP_COLOR = promoDet[i].u_EXP_COLOR;
              this.listaDocumento[x].u_EXP_TIPODSCTO = promoDet[i].u_EXP_TIPODSCTO;
              this.listaDocumento[x].u_EXP_REFERENCIA = promoDet[i].u_EXP_REFERENCIA;
              
              if((promoDet[i].u_EXP_TIPO == "D" || promoDet[i].u_EXP_TIPO == "G") && promoDet[i].u_EXP_TIPODSCTO == "P"){
                this.listaDocumento[x].descuento = Number(promoDet[i].u_EXP_VALOR.toFixed(2));
              }

              if (promoDet[i].u_EXP_TIPO == "F" && promoDet[i].u_EXP_TIPODSCTO == "V"){
                const descprec: number = Number(promoDet[i].u_EXP_ASIGNAR.toFixed(2));
                const precio: number = Number(this.listaDocumento[x].precioUnit);
                const newpre: number = precio - descprec;
                console.log("new price", newpre);                
                const pordes: number = Number(((1-(newpre / precio)) * 100).toFixed(2))
                this.listaDocumento[x].descuento = pordes;
              }
            }
          }  
        }

        if(bonifDet){
          for(let j = 0; j < bonifDet.length; j++){
            const dataUndMed: any = await this.maestroService.obtenerUnidadMedida(bonifDet[j].idProducto).toPromise();
            let boni: PedidoDet = {
              idProducto: bonifDet[j].idProducto,
              cantidad: bonifDet[j].cantidad,
              lineNum: -1,//bonifDet[j].lineNum,
              descuento: bonifDet[j].u_EXP_VALOR,
              descripcion: bonifDet[j].descripcion,
              codUndMed: bonifDet[j].codUndMed,
              precioUnit: bonifDet[j].precioUnit,
              dimension1: this._xDimencion1,
              dimension2: bonifDet[j].dimension2,
              u_EXP_PROMOCION: bonifDet[j].u_EXP_PROMOCION,
              u_EXP_COLOR: bonifDet[j].u_EXP_COLOR,
              u_EXP_CODIGO: bonifDet[j].u_EXP_CODIGO,
              u_EXP_TIPO: bonifDet[j].u_EXP_TIPO,
              u_EXP_VALOR: bonifDet[j].u_EXP_VALOR,
              u_EXP_ASIGNAR: bonifDet[j].u_EXP_ASIGNAR,
              u_EXP_APLICACANT: bonifDet[j].u_EXP_APLICACANT,
              u_EXP_TIPODSCTO: bonifDet[j].u_EXP_TIPODSCTO,
              u_EXP_REFERENCIA: bonifDet[j].u_EXP_TIPODSCTO,
              isBonificcion: true,
              listaUnd: dataUndMed.listaTablaGeneral,
              unidad: '',
              precioTotal: 0,
              tipoImpuesto: '',
              codAlmacen: this.codAlmacen,
              stockDisponible: 0,
              dimension3: '',
              dimension4: '',
              dimension5: '',
              proyecto: '',
              precioBruto: 0
            }
  
            this.listaDocumento.push(boni)
          }
        }

      }      
    } catch (error) {
      this.msgError = error;
      this.errorDialog = true;
    }finally{
      if(contProm>0){
        this.msgError = "Se encontró promociones para aplicar";
      }else{
        this.msgError = "No se encontraron promociones para aplicar"
      }

      this.errorDialog = true;
      this.actualizarCant("");
      this.flagLoad = false;
      this.flagPromo = true;
    }
  }

  async promoSug(){
    console.log("lista documento ---->", this.listaDocumento);    
    const numeOpe: string = this.listaDocumento[0].u_EXP_CODIGO;
    console.log("Numero Operacion", numeOpe);    
    if(numeOpe != ""){
      this.flagLoad = true;
      try {
        const data: any = await this.documentService.obtenerPromoSug(numeOpe).toPromise();
        console.log(data);        
        if(data.length > 0){
          this.listaBoniSug = data;
          this.flagLoad = false;
          this.promoSugDialog = true;
        }
      } catch (error) {
        console.log("error", error);        
        this.flagLoad = false;
      }

      this.flagLoad = false;
    }

  }

  descuentoGlobal(){
    const _txtPorDescuento = document.getElementById("input-por-descuento") as HTMLInputElement;
    const _txtDescuento = document.getElementById("input-descuento") as HTMLInputElement;
    const _txtSubTotal = document.getElementById("input-subtotal") as HTMLInputElement;
    const _txtImpuesto = document.getElementById("input-impuesto") as HTMLInputElement;
    const _txtTotal = document.getElementById("input-total") as HTMLInputElement;

    let _impuesto: number = 0
    let _docTotal: number = 0

    if(_txtSubTotal.value != "" && _txtSubTotal.value != "0.00"){
      const descuento: number = Number(_txtSubTotal.value.replace("USD ", "")) * (Number(_txtPorDescuento.value) / 100)
      
      if(this.codImpuesto == "IGV"){
        _impuesto = Number(((Number(_txtSubTotal.value.replace("USD ", "")) - descuento )* 0.18).toFixed(2));
      }
      
      _docTotal = Number(_txtSubTotal.value.replace("USD ", "")) + _impuesto - descuento;
      
      _txtDescuento.value = descuento.toLocaleString("es-PE", { style: "currency", currency: this.codMoneda });
      this.impuesto = _impuesto.toLocaleString("es-PE", { style: "currency", currency: this.codMoneda });
      this.docTotal = _docTotal.toLocaleString("es-PE", { style: "currency", currency: this.codMoneda });
        
      _txtImpuesto.value = this.impuesto;    
      _txtTotal.value = this.docTotal;

    }
  }
}
