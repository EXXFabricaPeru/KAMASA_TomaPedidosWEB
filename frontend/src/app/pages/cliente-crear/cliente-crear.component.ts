import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import ColumnHeader from 'src/app/models/columnHeader';
import { Contacto } from 'src/app/models/contacto';
import { Direccion } from 'src/app/models/direccion';
import { EstadoCuenta } from 'src/app/models/estadoCuenta';
import { TablaGeneral } from 'src/app/models/tablageneral';
import { ClienteService } from 'src/app/services/cliente.service';
import { MaestroService } from 'src/app/services/maestro.service';
import { environment } from 'src/environment/enviroment'

@Component({
  selector: 'app-cliente-crear',
  templateUrl: './cliente-crear.component.html',
  styleUrls: ['./cliente-crear.component.css']
})
export class ClienteCrearComponent implements OnInit {
//#region "Variables"
  codCliente: string = "";
  razonSocial: string = "";
  nombreComercial: string = "";
  tipoDoc: string = "";
  nroDocu: string = "";
  listaTpoDoc: TablaGeneral[] = [];
  listaDepartamento: TablaGeneral[] = [];
  listaProvincia: TablaGeneral[] = [];
  listaDistrito: TablaGeneral[] = [];
  listaGrupoCliente: TablaGeneral[] = [];
  listaCondicionPago: TablaGeneral[] = [];
  listaMoneda: TablaGeneral[] = [];
  listaIndustry: TablaGeneral[] = [];
  listaZona: TablaGeneral[] = [];
  _titulo: string = "CLIENTE";
  primerNombre: string = "";
  segundoNombre: string = "";
  apellidoPaterno: string = "";
  apellidoMaterno: string = "";
  emailCliente: string = "";
  tipoPersona: string = "TPN";
  telefonoCliente: string = "";
  celularCliente: string = "";
  U_EK_NMCONDPG: string = "";
  U_EXK_SOLCRED: string = "N";
  U_EXK_IMPCRED: string = "";
  U_EXK_MNDCRED: string = "SOL";
  U_EXK_NOTCRED: string = "";
  U_EXK_AUTCRED: string = "-";
  U_EXK_SOLSOB: string = "N";
  U_EXK_PORSOB: string = "";
  U_EXK_NCRESOB: string = "";
  U_EXK_AUTSOB: string = "-";
  U_EXK_SCCONPAG: string = "N";
  U_EXK_CONDPAGO: string = "";
  U_EXK_NCCONDPAG: string = "";
  U_EXK_CDPAGAUT: string = "-";
  nombreContacto: string = "";
  primerNombreContacto: string = "";
  segundoNombreContacto: string = "";
  apellidoContacto: string = "";
  telefonoContacto: string = "";
  cargoContacto: string = "";
  correoContacto: string = "";
  celularContacto: string = "";
  tipoDireccion: string = "";
  nombreDireccion: string = "";
  direccionSucursal: string = "";
  paisSucursal: string = "PE";
  departamentoSucursal: string = "";
  provinciaSucursal: string = "";
  distritoSucursal: string = "";
  ubigeoDireccion: string = "";
  grupoCliente: string = "";
  moneda: string = "##";
  listaDireccion: Direccion[] = [];
  listaContacto: Contacto[] = [];
  oCliente: Cliente = {
    codigoCliente: '',
    nombre: '',
    ruc: '',
    direccion: '',
    codListaPrecio: '',
    codVendedor: '',
    codCondPago: '',
    lineaCredito: 0,
    saldoDisponible: 0,
    nombreComercial: '',
    tpoPersona: '',
    tpoDocumento: '',
    primerNombre: '',
    segundoNombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    listaDireccion: [],
    listaContacto: [],
    telefonoCliente: '',
    celularCliente: '',
    correoCliente: '',
    grupoCliente: '',
    agenteRetencion: false,
    buenContribuyente: false,
    flag: false,
    u_EK_NMCONDPG: '',
    u_EXK_SOLCRED: '',
    u_EXK_IMPCRED: '',
    u_EXK_MNDCRED: '',
    u_EXK_NOTCRED: '',
    u_EXK_AUTCRED: '-',
    u_EXK_SOLSOB: '',
    u_EXK_PORSOB: '',
    u_EXK_NCRESOB: '',
    u_EXK_AUTSOB: '-',
    u_EXK_SCCONPAG: '',
    u_EXK_CONDPAGO: '',
    u_EXK_NCCONDPAG: '',
    u_EXK_CDPAGAUT: '-',
    currency: '',
    industryC: 0,
    codDireccion: '',
    zona: '',
    shipType: ''
  }
  dataUsuario: any;
  codVendedor: string = "";
  user: string = "";
  
  msgTitulo: string = "";
  msgError: string = "";
  xCodCliente: string | null = "0";
  zonaSucursal: string | null = "";
  industryC: Number = 0;
  
  confirmDialog: boolean = false;
  confirmDialogEliminarCli: boolean = false;
  confirmDialogEliminarDir: boolean = false;
  guardarDialog: boolean = false;
  flagLoad: boolean = false;

  textButtonContacto: string = "Agregar";
  textButtonDireccion: string = "Agregar";

  contactoEliminar: Contacto = {
    nombre: '',
    telefono: '',
    cargo: '',
    email: '',
    flagEditar: false,
    flagEliminar: false,
    primerNombre: '',
    segundoNombre: '',
    apellido: '',
    celular: ''
  }

  direccionElimar: Direccion = {
    nombre: '',
    departamento: '',
    provincia: '',
    distrito: '',
    tipo: '',
    direccion: '',
    flagEditar: false,
    flagEliminar: false,
    ubigeo: '',
    u_EXX_TPED_ZONA: ''
  }

  tab1: boolean = true;
  tab2: boolean = false;
  tab3: boolean = false;
  tab4: boolean = false;
  agenteRet: boolean = false;
  buenContr: boolean = false;

  listaHeader: ColumnHeader[] = [];
  listaEecc: EstadoCuenta[] = [];

  listaPaginas: number[] = [];
  pagina: number = 0;
//#endregion "Variables"
  
constructor(private maestroService: MaestroService, 
              private clienteService: ClienteService, 
              private _route: ActivatedRoute, 
              private router: Router){
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
    this.maestroService.obtenerDepartamento().subscribe((data: any) => {
      if(data.estado == "True"){
        this.listaDepartamento = data.listaTablaGeneral;
      }
    });
    
    const dataGrupoCliente: any = await this.maestroService.obtenerGrupoCliente().toPromise();
    if(dataGrupoCliente.estado == "True"){
      this.listaGrupoCliente = dataGrupoCliente.listaTablaGeneral;
    }
    
    const dataCondPago: any = await this.maestroService.obtenerCondicionPago().toPromise();
    if(dataCondPago.estado == "True"){
      this.listaCondicionPago = dataCondPago.listaTablaGeneral;
    }
    
    const dataMoneda: any = await this.maestroService.obtenerMoneda().toPromise();
    if(dataMoneda.estado == "True"){
      this.listaMoneda = dataMoneda.listaTablaGeneral;
    }

    const dataGiroNegocio: any = await this.maestroService.obtenerGiroNegocio().toPromise();
    if(dataGiroNegocio.estado == "True"){
      console.log(dataGiroNegocio.listaTablaGeneral);      
      this.listaIndustry = dataGiroNegocio.listaTablaGeneral;
    }

    const dataZona: any = await this.maestroService.obtenerZona().toPromise();
    console.log("Zona", dataZona);
    
    if(dataZona.estado == "True"){
      this.listaZona = dataZona.listaTablaGeneral;
    }

    if(this._route.snapshot.paramMap.get("codCliente")){
      this.xCodCliente = this._route.snapshot.paramMap.get("codCliente") || "";
      console.log("Codigo:", this.xCodCliente);
      this.buscarCliente(this.xCodCliente);
    }
    else{
      this.xCodCliente = "";
      this.tipoPersona = "";
    }
    
    this.listaHeader = [
      {
        label: "Tipo Doc",
        key: "tipoDoc",
        subKey: "",
        customClass: "",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Numero Doc",
        key: "nroDocumento",
        subKey: "",
        customClass: "",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Imp. SOL",
        key: "original",
        subKey: "",
        customClass: "right",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Saldo SOL",
        key: "saldo",
        subKey: "",
        customClass: "right",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Imp. USD",
        key: "originalUsd",
        subKey: "",
        customClass: "right",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Saldo USD",
        key: "saldoUsd",
        subKey: "",
        customClass: "right",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Fecha Vencimento",
        key: "fecVencimiento",
        subKey: "",
        customClass: "fecha",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Dias Vencidos",
        key: "diasVencidos",
        subKey: "",
        customClass: "entero",
        type: "",
        value: "",
        visible: true
      },
    ];
  }

  async guardarCliente(){
    if(this.listaContacto.length == 0 ){
      this.msgError = "Debe agregar un contacto";
      this.confirmDialog = true;
      return;
    }

    if(this.validarDatos() == false){
      return;
    }

    this.oCliente = {
      codigoCliente: this.codCliente,
      nombre: this.razonSocial,
      ruc: this.nroDocu.toString(),
      direccion: '',
      codListaPrecio: '',
      codVendedor: this.codVendedor.toString() || "2",
      codCondPago: '',
      lineaCredito: 0,
      saldoDisponible: 0,
      nombreComercial: this.nombreComercial,
      tpoPersona: this.tipoPersona,
      tpoDocumento: this.tipoDoc,
      primerNombre: this.primerNombre,
      segundoNombre: this.segundoNombre,
      apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno: this.apellidoMaterno,
      grupoCliente: this.grupoCliente,
      telefonoCliente: this.telefonoCliente,
      celularCliente: this.celularCliente,
      correoCliente: this.emailCliente,
      agenteRetencion: this.agenteRet,
      buenContribuyente: this.buenContr,
      flag: false,
      u_EK_NMCONDPG: this.U_EK_NMCONDPG,
      u_EXK_SOLCRED: this.U_EXK_SOLCRED,
      u_EXK_IMPCRED: this.U_EXK_IMPCRED,
      u_EXK_MNDCRED: this.U_EXK_MNDCRED,
      u_EXK_NOTCRED: this.U_EXK_NOTCRED,
      u_EXK_AUTCRED: this.U_EXK_AUTCRED,
      u_EXK_SOLSOB: this.U_EXK_SOLSOB,
      u_EXK_PORSOB: this.U_EXK_PORSOB,
      u_EXK_NCRESOB: this.U_EXK_NCRESOB,
      u_EXK_AUTSOB: this.U_EXK_AUTSOB,
      u_EXK_SCCONPAG: this.U_EXK_SCCONPAG,
      u_EXK_CONDPAGO: this.U_EXK_CONDPAGO,
      u_EXK_NCCONDPAG: this.U_EXK_NCCONDPAG,
      u_EXK_CDPAGAUT: this.U_EXK_CDPAGAUT,
      listaDireccion: this.listaDireccion,
      listaContacto: this.listaContacto,
      currency: this.moneda,
      industryC: this.industryC,
      codDireccion: '',
      zona: '',
      shipType: ''
    };

    console.log("Cliente registrar", this.oCliente);
    
    if(this.xCodCliente?.length >= 12){
      const data: any = await this.clienteService.editarCliente(this.oCliente).toPromise();
      this.msgError = data.mensaje;
      this.msgTitulo = "Mensaje de actualización del cliente";
      if(data.estado){
        this.guardarDialog = true;
      }else{
        this.confirmDialog = true;
      }
    }else{
      const data: any = await this.clienteService.registrarCliente(this.oCliente).toPromise();
      console.log(data);
      this.msgTitulo = "Mensaje de registro de cliente";
      this.msgError = data.mensaje;
      if(data.estado){
        this.guardarDialog = true;
      }else{
        this.confirmDialog = true;
      }
    }
  }

  obtenerProvincia(){
    const _cmbDepartamento = document.getElementById("input-departamento") as HTMLSelectElement;
    this.departamentoSucursal = _cmbDepartamento.value;
    this.maestroService.obtenerProvincia(this.departamentoSucursal).subscribe((data: any) => {
      if(data.estado == "True"){
        this.listaProvincia = data.listaTablaGeneral;
      }
    });
  }

  obtenerDistrito(){
    const _cmbProvincia = document.getElementById("input-provincia") as HTMLSelectElement;
    this.provinciaSucursal = _cmbProvincia.value;
    this.maestroService.obtenerDistrito(this.provinciaSucursal).subscribe((data: any) => {      
      if(data.estado == "True"){
        this.listaDistrito = data.listaTablaGeneral;
      }
    });
  }

  obtenerUbigeo(){
    const _cmbDistrito = document.getElementById("input-distrito") as HTMLSelectElement;
    this.distritoSucursal = _cmbDistrito.value;

    const codDistrito : string = this.listaDistrito.filter(t=> t.descripcion == this.distritoSucursal)[0].codigo;
    this.ubigeoDireccion = codDistrito

    const _txtUbigeo = document.getElementById("input-ubigeo") as HTMLInputElement;
    _txtUbigeo.value = this.ubigeoDireccion;
  }

  obtenerCodigoDir(){
    const _cmbTpoDir = document.getElementById("input-tipo-dir") as HTMLSelectElement;
    this.tipoDireccion = _cmbTpoDir.value;
    const list: any = this.listaDireccion.filter(t=> t.tipo == this.tipoDireccion);
    console.log(list.length, list)
    if(this.tipoDireccion == "B"){
      if(list.length == 0){
        this.nombreDireccion = "FISCAL"
      }else{
        let encontrado: Boolean = false;
        let nombreAux: string;
        this.nombreDireccion = "";
        for(let i = 0; i < list.length; i++){   
          nombreAux = "FISCAL" + (i+1).toString();            
          console.log(i, list.filter(t=> t.nombre == nombreAux));
          if(encontrado == false){
            if(list.filter(t=> t.nombre == nombreAux).length == 0){
              encontrado = true;
              this.nombreDireccion = nombreAux;
            }
          }
        }
        if(this.nombreDireccion == "")
          this.nombreDireccion = "FISCAL" + (list.length + 1).toString();
      }
    }else if(this.tipoDireccion == "S"){
      if(list.length == 0){
        this.nombreDireccion = "ALMACEN"
      }else{
        let encontrado: Boolean = false;
        let nombreAux: string;
        this.nombreDireccion = "";
        for(let i = 0; i < list.length; i++){   
          nombreAux = "ALMACEN" + (i+1).toString();            
          console.log(i, list.filter(t=> t.nombre == nombreAux));
          if(encontrado == false){
            if(list.filter(t=> t.nombre == nombreAux).length == 0){
              encontrado = true;
              this.nombreDireccion = nombreAux;
            }
          }
        }
        if(this.nombreDireccion == "")
          this.nombreDireccion = "ALMACEN" + (list.length + 1).toString();
      }
    }else{
      this.nombreDireccion = "";
    }

    const _txtIdDir = document.getElementById("input-id-dir") as HTMLInputElement;
    _txtIdDir.value = this.nombreDireccion;
  }

  agregarDireccion(){
    const _cmbDepartamento = document.getElementById("input-departamento") as HTMLSelectElement;
    const _cmbProvincia = document.getElementById("input-provincia") as HTMLSelectElement;
    const _cmbDistrito = document.getElementById("input-distrito") as HTMLSelectElement;
    const _cmbTipoDir = document.getElementById("input-tipo-dir") as HTMLSelectElement;
    const _cmbZona = document.getElementById("input-zona") as HTMLSelectElement;
    const _txtDireccion = document.getElementById("input-direccion") as HTMLInputElement;
    const _txtUbigeo = document.getElementById("input-ubigeo") as HTMLInputElement;

    this.departamentoSucursal = _cmbDepartamento.value;
    this.provinciaSucursal = _cmbProvincia.value;
    this.distritoSucursal = _cmbDistrito.value;
    this.tipoDireccion = _cmbTipoDir.value; 
    this.direccionSucursal = _txtDireccion.value;
    this.zonaSucursal = _cmbZona.value;
    
    if(this.departamentoSucursal == ""){
      this.msgError = "Debe seleccionar un departamento";
      this.confirmDialog = true;
      return;
    }

    if(this.provinciaSucursal == ""){
      this.msgError = "Debe seleccionar una provincia";
      this.confirmDialog = true;
      return;
    }
    
    if(this.distritoSucursal == ""){
      this.msgError = "Debe seleccionar un distrito";
      this.confirmDialog = true;
      return;
    }

    if(this.tipoDireccion == ""){
      this.msgError = "Debe seleccionar el tipo de dirección";
      this.confirmDialog = true;
      return;
    }

    if(this.direccionSucursal == ""){
      this.msgError = "Debe colocar la dirección";
      this.confirmDialog = true;
      return;
    }

    const _direccion: any = this.listaDireccion.find(t=> t.nombre == this.nombreDireccion)
    if(_direccion != null && _direccion != undefined){
      for(let i = 0; i < this.listaDireccion.length; i++){
        if(this.nombreDireccion == this.listaDireccion[i].nombre){
          this.listaDireccion[i].departamento = this.departamentoSucursal;
          this.listaDireccion[i].provincia = this.provinciaSucursal;
          this.listaDireccion[i].distrito = this.distritoSucursal;
          this.listaDireccion[i].direccion = this.direccionSucursal;
          this.listaDireccion[i].ubigeo = this.ubigeoDireccion;
          this.listaDireccion[i].u_EXX_TPED_ZONA = this.zonaSucursal;
          this.listaDireccion[i].flagEditar = true;
          this.msgError = "Se actualizó con éxito la dirección";
        }
      }
    }else{
      const direccion: Direccion = {
        nombre: this.nombreDireccion,
        departamento: this.departamentoSucursal,
        provincia: this.provinciaSucursal,
        distrito: this.distritoSucursal,
        tipo: this.tipoDireccion,
        direccion: this.direccionSucursal,
        flagEditar: true,
        flagEliminar: false,
        ubigeo: this.ubigeoDireccion,
        u_EXX_TPED_ZONA: this.zonaSucursal
      }
  
      this.listaDireccion.push(direccion);
      this.msgError = "Se agrego con éxito la dirección";
    }

    this.msgTitulo = "Confirmación";
    this.confirmDialog = true;

    const _txtIdDir = document.getElementById("input-id-dir") as HTMLInputElement;
    _txtIdDir.value = "";
    this.nombreDireccion = "";
    _cmbDepartamento.value = "";
    this.departamentoSucursal = "";
    _cmbProvincia.value = "";
    this.provinciaSucursal = "";
    _cmbDistrito.value = "";
    this.distritoSucursal = "";
    _cmbTipoDir.value = "";
    this.tipoDireccion = "";
    _txtDireccion.value = "";
    this.direccionSucursal = "";
    _cmbZona.value = "";
    this.zonaSucursal = "";
    _txtUbigeo.value = "";
    this.ubigeoDireccion = "";

    this.textButtonDireccion = "Agregar";
  }

  agregarContacto(){
    const _txtIdContacto = document.getElementById("input-id-cont") as HTMLInputElement;
    const _txtPrimerNombre = document.getElementById("input-pnom-cont") as HTMLInputElement;
    const _txtSegundNombre = document.getElementById("input-snom-cont") as HTMLInputElement;
    const _txtApellido = document.getElementById("input-ape-cont") as HTMLInputElement;
    const _txtTelefono = document.getElementById("input-tel-cont") as HTMLInputElement;
    const _txtCelular = document.getElementById("input-cel-cont") as HTMLInputElement;
    const _txtCargo = document.getElementById("input-car-cont") as HTMLInputElement;
    const _txtCorreo = document.getElementById("input-email-cont") as HTMLInputElement;

    this.nombreContacto = _txtIdContacto.value;
    if(this.nombreContacto == ""){
      console.log("Aquiiiiiiii");
      
      this.msgError = "Debe colocar un ID de Contacto";
      this.confirmDialog = true;
      return;
    }

    this.primerNombreContacto = _txtPrimerNombre.value;
    this.segundoNombreContacto = _txtSegundNombre.value;
    this.apellidoContacto = _txtApellido.value;
    this.telefonoContacto = _txtTelefono.value;
    this.celularContacto = _txtCelular.value;
    this.cargoContacto = _txtCargo.value;
    this.correoContacto = _txtCorreo.value;

    const _contacto: any = this.listaContacto.find(t=>t.nombre == this.nombreContacto);
    if(_contacto != null || _contacto != undefined){
      for(let i = 0; i < this.listaContacto.length; i++){
        if(this.nombreContacto == this.listaContacto[i].nombre){
          this.listaContacto[i].telefono = this.telefonoContacto;
          this.listaContacto[i].cargo = this.cargoContacto;
          this.listaContacto[i].email = this.correoContacto;
          this.listaContacto[i].flagEditar = true;
          this.listaContacto[i].primerNombre = this.primerNombreContacto;
          this.listaContacto[i].segundoNombre = this.segundoNombreContacto;
          this.listaContacto[i].apellido = this.apellidoContacto;
          this.listaContacto[i].celular = this.celularContacto;
          this.msgError = "Se actualizó con éxito el contacto";
        }
      }
    }else{
      const contacto: Contacto = {
        nombre: this.nombreContacto,
        telefono: this.telefonoContacto,
        cargo: this.cargoContacto,
        email: this.correoContacto,
        flagEditar: true,
        flagEliminar: false,
        primerNombre: this.primerNombreContacto,
        segundoNombre: this.segundoNombreContacto,
        apellido: this.apellidoContacto,
        celular: this.celularContacto
      }
      
      this.listaContacto.push(contacto);
      this.msgError = "Se agrego con éxito el contacto";
    }

    this.msgTitulo = "Confirmación";
    this.confirmDialog = true;

    this.textButtonContacto = "Agregar";

    _txtCargo.value = "";
    this.cargoContacto = "";
    _txtCorreo.value = "";
    this.correoContacto = "";
    _txtTelefono.value = "";
    this.telefonoContacto = "";
    _txtIdContacto.value = "";
    this.nombreContacto = "";
    _txtPrimerNombre.value = "";
    this.primerNombreContacto = "";
    _txtSegundNombre.value = "";
    this.segundoNombreContacto = "";
    _txtApellido.value = "";
    this.apellidoContacto = "";
    _txtCelular.value = "";
    this.celularContacto = "";
  }

  closeDialogConfirm(){
    // this.router.navigateByUrl(`/cliente-crear/0`, { replaceUrl: true });
    this.router.navigateByUrl(`/cliente-listar`, { replaceUrl: true });
  }

  onBlurDocumento(){
    console.log("blur");
    // debugger;
    const _cmbTpoDoc = document.getElementById("input-tipo-doc") as HTMLSelectElement; 
    this.tipoDoc = _cmbTpoDoc.value;
    const _txtNroDoc = document.getElementById("input-nro-doc") as HTMLInputElement;
    this.nroDocu = _txtNroDoc.value;

    if(this.tipoDoc == "1"){
      this.codCliente = "C000" + this.nroDocu;
    }else{
      this.codCliente = "C" + this.nroDocu;
    }

    const _txtCodigoCli = document.getElementById("input-codigo") as HTMLInputElement;
    _txtCodigoCli.value = this.codCliente;
  }

  async editarDireccion(dir: any){
    const _txtIdDir = document.getElementById("input-id-dir") as HTMLInputElement;
    const _cmbTipoDir = document.getElementById("input-tipo-dir") as HTMLSelectElement
    const _cmbZona = document.getElementById("input-zona") as HTMLSelectElement
    const _txtDireccion = document.getElementById("input-direccion") as HTMLInputElement
    const _txtUbigeo = document.getElementById("input-ubigeo") as HTMLInputElement

    console.log("direccion", dir);
    this.textButtonDireccion = "Actualizar";
    this.nombreDireccion = dir.nombre;
    this.direccionSucursal = dir.direccion;
    this.tipoDireccion = dir.tipo
    this.departamentoSucursal = dir.departamento;
    this.provinciaSucursal = dir.provincia;
    this.distritoSucursal = dir.distrito;
    this.ubigeoDireccion = dir.ubigeo;
    this.zonaSucursal = dir.u_EXX_TPED_ZONA;
    _cmbZona.value = this.zonaSucursal;

    _txtIdDir.value = this.nombreDireccion;
    _txtDireccion.value = this.direccionSucursal;
    _cmbTipoDir.value = this.tipoDireccion;
    const data: any = await this.maestroService.obtenerProvincia(this.departamentoSucursal).toPromise();
    this.listaProvincia = data.listaTablaGeneral;
    const dataP: any = await this.maestroService.obtenerDistrito(this.provinciaSucursal).toPromise();
    this.listaDistrito = dataP.listaTablaGeneral;

    _txtUbigeo.value = this.ubigeoDireccion;
  }

  editarContacto(contacto:any){
    const _txtIdContacto = document.getElementById("input-id-cont") as HTMLInputElement;
    const _txtPrimerNombre = document.getElementById("input-pnom-cont") as HTMLInputElement;
    const _txtSegundNombre = document.getElementById("input-snom-cont") as HTMLInputElement;
    const _txtApellido = document.getElementById("input-ape-cont") as HTMLInputElement;
    const _txtTelefono = document.getElementById("input-tel-cont") as HTMLInputElement;
    const _txtCelular = document.getElementById("input-cel-cont") as HTMLInputElement;
    const _txtCargo = document.getElementById("input-car-cont") as HTMLInputElement;
    const _txtCorreo = document.getElementById("input-email-cont") as HTMLInputElement;

    this.textButtonContacto = "Actualizar";
    console.log("contacto", contacto);

    this.nombreContacto = contacto.nombre;
    _txtIdContacto.value = this.nombreContacto;
    this.telefonoContacto = contacto.telefono;
    _txtTelefono.value = this.telefonoContacto;
    this.cargoContacto = contacto.cargo;
    _txtCargo.value = this.cargoContacto;
    this.correoContacto = contacto.email;
    _txtCorreo.value = this.correoContacto;
    this.primerNombreContacto = contacto.primerNombre;
    _txtPrimerNombre.value = this.primerNombreContacto;
    this.segundoNombreContacto = contacto.segundoNombre;
    _txtSegundNombre.value = this.segundoNombreContacto;
    this.apellidoContacto = contacto.apellido;
    _txtApellido.value = this.apellidoContacto;
    this.celularContacto = contacto.celular;
    _txtCelular.value = this.celularContacto;
  }

  async buscarCliente(codcliente: string){
    const data: any = await this.clienteService.obtenerClienteCod(codcliente).toPromise();
    console.log("Cliente->", data);
    
    if(data.estado == "True"){
      try{
        this.oCliente = data.listaCLiente[0];

        //listas      
        this.listaContacto = this.oCliente.listaContacto;
        this.listaDireccion = this.oCliente.listaDireccion;

        //textbox
        this.codCliente = this.oCliente.codigoCliente;
        const _txtCodCliente = document.getElementById("input-codigo") as HTMLInputElement;
        _txtCodCliente.value = this.codCliente;

        this.razonSocial = this.oCliente.nombre;
        const _txtRazonSocial = document.getElementById("input-razon-social") as HTMLInputElement;
        _txtRazonSocial.value = this.razonSocial;
        
        this.nombreComercial = this.oCliente.nombreComercial;
        const _txtNomComercial = document.getElementById("input-nombre-comercial") as HTMLInputElement;
        _txtNomComercial.value = this.nombreComercial;
        
        this.nroDocu = this.oCliente.ruc;
        const _txtNroDoc = document.getElementById("input-nro-doc") as HTMLInputElement;
        _txtNroDoc.value = this.nroDocu;
        
        this.emailCliente = this.oCliente.correoCliente;
        const _txtCorreoCliente = document.getElementById("input-email-cli") as HTMLInputElement;
        _txtCorreoCliente.value = this.emailCliente;
        
        this.telefonoCliente = this.oCliente.telefonoCliente;
        const _txtTelefonoCli = document.getElementById("input-telf-cli") as HTMLInputElement;
        _txtTelefonoCli.value = this.telefonoCliente;
        
        this.celularCliente = this.oCliente.celularCliente;
        const _txtCelularCli = document.getElementById("input-cel-cli") as HTMLInputElement;
        _txtCelularCli.value = this.celularCliente;
        
        this.tipoPersona = this.oCliente.tpoPersona;

        //si es TPN        
        console.log(this.tipoPersona);
        
        if (this.tipoPersona == "TPN"){
          const _txtPrimerNombre = document.getElementById("input-pri-nom") as HTMLInputElement;
          this.primerNombre = this.oCliente.primerNombre;
          _txtPrimerNombre.value = this.primerNombre;   
          
          const _txtSegundoNombre = document.getElementById("input-seg-nom") as HTMLInputElement;
          this.segundoNombre = this.oCliente.segundoNombre;
          _txtSegundoNombre.value = this.segundoNombre;
          
          const _txtApellidoPat = document.getElementById("input-ape-pat") as HTMLInputElement;
          this.apellidoPaterno = this.oCliente.apellidoPaterno;
          _txtApellidoPat.value = this.apellidoPaterno;
          
          const _txtApellidoMat = document.getElementById("input-ape-mat") as HTMLInputElement;
          this.apellidoMaterno = this.oCliente.apellidoMaterno;
          _txtApellidoMat.value = this.apellidoMaterno;
        } 
        
        //Select
        this.industryC = this.oCliente.industryC;   
        const _cmbGiroNeg = document.getElementById("input-giro-neg") as HTMLSelectElement;
        _cmbGiroNeg.value = this.industryC.toString();
        
        this.tipoDoc = this.oCliente.tpoDocumento;
        const _cmbTipoDoc = document.getElementById("input-tipo-doc") as HTMLSelectElement;
        _cmbTipoDoc.value = this.tipoDoc;
        
        this.tipoPersona = this.oCliente.tpoPersona;
        const _cmbTipoPer = document.getElementById("input-tipo-per") as HTMLSelectElement;
        _cmbTipoPer.value = this.tipoPersona;
        
        this.grupoCliente = this.oCliente.grupoCliente;
        const _cmbGrupoCliente = document.getElementById("input-grupo-cli") as HTMLSelectElement;
        _cmbGrupoCliente.value = this.grupoCliente;
        
        this.moneda = this.oCliente.currency;
        const _cmbMoneda = document.getElementById("input-moneda") as HTMLSelectElement;
        _cmbMoneda.value = this.moneda;
        
        //radio button
        this.agenteRet = this.oCliente.agenteRetencion;
        const _rbAgenteRet: any = document.getElementById("input-age-ret")
        _rbAgenteRet.checked = this.agenteRet;
        
        this.buenContr = this.oCliente.buenContribuyente;
        const _rbBuenCont: any = document.getElementById("input-bn-cont")
        _rbBuenCont.checked = this.buenContr;
        
        //Campos propios de KAMASA
        const _cmbSolCredito = document.getElementById("input-sol-cre") as HTMLSelectElement;
        this.U_EXK_SOLCRED = this.oCliente.u_EXK_SOLCRED;
        _cmbSolCredito.value = this.U_EXK_SOLCRED;
        
        const _txtImpCredito = document.getElementById("input-imp-cre") as HTMLInputElement;
        this.U_EXK_IMPCRED = this.oCliente.u_EXK_IMPCRED;
        _txtImpCredito.value = this.U_EXK_IMPCRED;
        
        const _cmbMonCredito = document.getElementById("input-mon-cre") as HTMLSelectElement;
        this.U_EXK_MNDCRED = this.oCliente.u_EXK_MNDCRED;
        _cmbMonCredito.value = this.U_EXK_MNDCRED;
        
        const _txtNoCCredito = document.getElementById("input-nc-cre") as HTMLInputElement;
        this.U_EXK_NOTCRED = this.oCliente.u_EXK_NOTCRED;
        _txtNoCCredito.value = this.U_EXK_NOTCRED;
        
        const _cmbUutCredito = document.getElementById("input-aut-cre") as HTMLSelectElement;
        this.U_EXK_AUTCRED = this.oCliente.u_EXK_AUTCRED;
        _cmbMonCredito.value = this.U_EXK_AUTCRED;
        
        const _cmbSolSobgiro = document.getElementById("input-sol-sbg") as HTMLSelectElement;
        this.U_EXK_SOLSOB = this.oCliente.u_EXK_SOLSOB;
        _cmbSolSobgiro.value = this.U_EXK_SOLSOB;
        
        const _txtPorSobgiro = document.getElementById("input-por-sbg") as HTMLInputElement;
        this.U_EXK_PORSOB = this.oCliente.u_EXK_PORSOB;
        _txtPorSobgiro.value = this.U_EXK_PORSOB;
        
        const _txtNoCSobgiro = document.getElementById("input-nc-sbg") as HTMLInputElement;
        this.U_EXK_NCRESOB = this.oCliente.u_EXK_NCRESOB;
        _txtNoCSobgiro.value = this.U_EXK_NCRESOB;
        
        const _cmbAutSobgiro = document.getElementById("input-aut-sbg") as HTMLSelectElement;
        this.U_EXK_AUTSOB = this.oCliente.u_EXK_AUTSOB;
        _cmbAutSobgiro.value = this.U_EXK_AUTSOB;
        
        const _cmbSolCamCond = document.getElementById("input-sol-ccp") as HTMLSelectElement;
        this.U_EXK_SCCONPAG = this.oCliente.u_EXK_SCCONPAG;
        _cmbSolCamCond.value = this.U_EXK_SCCONPAG;
        
        const _cmbConConPag = document.getElementById("input-cpa-ccp") as HTMLSelectElement;
        this.U_EXK_CONDPAGO = this.oCliente.u_EXK_CONDPAGO;
        _cmbConConPag.value = this.U_EXK_CONDPAGO;
        
        const _txtNoCConPag = document.getElementById("input-nc-ccp") as HTMLInputElement;
        this.U_EXK_NCCONDPAG = this.oCliente.u_EXK_NCCONDPAG;
        _txtNoCConPag.value = this.U_EXK_NCCONDPAG;
        
        const _cmbAutConPag = document.getElementById("input-aut-ccp") as HTMLSelectElement;
        this.U_EXK_CDPAGAUT = this.oCliente.u_EXK_CDPAGAUT;
        _cmbAutConPag.value = this.U_EXK_CDPAGAUT;

        this.obtenerEstadoCuenta(this.codCliente);
      }catch (error){
        console.log("Error: ", error);        
      }
    }
  }

  closeDialogConfirmDelCli(){
    this.confirmDialogEliminarCli = false;
  }

  closeDialogConfirmDelDir(){
    this.confirmDialogEliminarDir = false;
  }

  aceptDialogConfirmDelCli(){
    this.confirmDialogEliminarCli = false;
    for(let i = 0; i< this.listaContacto.length; i++){
      if(this.listaContacto[i].nombre == this.contactoEliminar.nombre){
        this.listaContacto[i].flagEliminar = true;
      }
    }
  }

  aceptDialogConfirmDelDir(){
    this.confirmDialogEliminarDir = false;
    for(let i = 0; i < this.listaDireccion.length; i++){
      console.log(this.listaDireccion[i].nombre + "-" + i.toString(), this.direccionElimar.nombre);        
      if(this.listaDireccion[i].nombre == this.direccionElimar.nombre){
        this.listaDireccion[i].flagEliminar = true;
      }
    }
  }

  eliminarContacto(cont: any){
    this.confirmDialogEliminarCli = true;
    this.contactoEliminar = cont;
  }
  
  eliminarDireccion(dir: any){
    this.confirmDialogEliminarDir = true;
    this.direccionElimar = dir;
  }

  cancelar(){
    this.router.navigateByUrl(`/cliente-listar`, { replaceUrl: true });
  }

  validarDatos(): Boolean{
    let xRpta: Boolean = true;    

    const _txtCodCliente = document.getElementById("input-codigo") as HTMLInputElement;
    this.codCliente = _txtCodCliente.value;

    const _cmbMoneda = document.getElementById("input-moneda") as HTMLSelectElement;
    this.moneda = _cmbMoneda.value;

    const _cmbGiroNeg = document.getElementById("input-giro-neg") as HTMLSelectElement;
    if(_cmbGiroNeg.value == "##"){
      this.msgError = "Debe seleccionar un giro de negocio";
      this.confirmDialog = true;
      xRpta = false;
      return xRpta;
    }
    this.industryC = Number(_cmbGiroNeg.value);

    const _txtRazonSocial = document.getElementById("input-razon-social") as HTMLInputElement;
    this.razonSocial = _txtRazonSocial.value;
    
    const _txtNomComercial = document.getElementById("input-nombre-comercial") as HTMLInputElement;
    this.nombreComercial = _txtNomComercial.value;
    
    const _cmbTipoDoc = document.getElementById("input-tipo-doc") as HTMLSelectElement;
    this.tipoDoc = _cmbTipoDoc.value;

    const _txtNroDoc = document.getElementById("input-nro-doc") as HTMLInputElement;
    this.nroDocu = _txtNroDoc.value;

    const _cmbTipoPer = document.getElementById("input-tipo-per") as HTMLSelectElement;
    this.tipoPersona = _cmbTipoPer.value;

    const _cmbGrupoCliente = document.getElementById("input-grupo-cli") as HTMLSelectElement;
    if(_cmbGrupoCliente.value == ""){
      this.msgError = "Debe seleccionar un grupo de cliente";
      this.confirmDialog = true;
      xRpta = false;
      return xRpta;
    }
    this.grupoCliente = _cmbGrupoCliente.value;

    if (this.tipoPersona == "TPN"){
      const _txtPrimerNombre = document.getElementById("input-pri-nom") as HTMLInputElement;
      console.log(_txtPrimerNombre)
      this.primerNombre = _txtPrimerNombre.value;

      const _txtSegundoNombre = document.getElementById("input-seg-nom") as HTMLInputElement;
      this.segundoNombre = _txtSegundoNombre.value;

      const _txtApellidoPat = document.getElementById("input-ape-pat") as HTMLInputElement;
      this.apellidoPaterno = _txtApellidoPat.value;

      const _txtApellidoMat = document.getElementById("input-ape-mat") as HTMLInputElement;
      this.apellidoMaterno = _txtApellidoMat.value;
    }

    const _txtCorreoCliente = document.getElementById("input-email-cli") as HTMLInputElement;
    this.emailCliente = _txtCorreoCliente.value;

    const _txtTelefonoCli = document.getElementById("input-telf-cli") as HTMLInputElement;
    this.telefonoCliente = _txtTelefonoCli.value;
    
    const _txtCelularCli = document.getElementById("input-cel-cli") as HTMLInputElement;
    this.celularCliente = _txtCelularCli.value;

    const _rbAgenteRet: any = document.getElementById("input-age-ret")
    this.agenteRet = _rbAgenteRet.checked;

    const _rbBuenCont: any = document.getElementById("input-bn-cont")
    this.buenContr = _rbBuenCont.checked;

    return xRpta
  }

  async obtenerEstadoCuenta(codCliente: string){
    this.listaPaginas = []
    console.log("Buscando estado de cuenta");
    const data: any = await this.clienteService.obtenerEstadoCuenta(codCliente).toPromise();
    console.log("eecc",data);
    
    if(data.estado){
      this.listaEecc = data.listaEstadoCuenta;
      const residuo: number = this.listaEecc.length % 10;
      const cociente: string = (this.listaEecc.length / 10).toString().split('.')[0];
      const x: number = residuo == 0 ? 0 : 1;
      for(let i = 1; i <= Number(cociente) + x; i++){
        this.listaPaginas.push(i);
      }

      let importeVencido: number = 0;
      let importeVencidoUSD: number = 0;
      let importeUsado: number = 0;
      let importeUsadoUSD: number = 0;
      let importeDisponible: number = 0;
      let importePorVencer: number = 0;
      const tipocambio: number = this.listaEecc[0].tipoCambio;

      for(let x=0; x<this.listaEecc.length; x++){
        if(this.listaEecc[x].diasVencidos > 0){
          importeVencido = importeVencido + this.listaEecc[x].saldo;
          importeVencidoUSD = importeVencidoUSD + this.listaEecc[x].saldoUsd;
        }

        importeUsado = importeUsado + this.listaEecc[x].saldo;
        importeUsadoUSD = importeUsadoUSD + this.listaEecc[x].saldoUsd;
      }

      importeUsadoUSD = importeUsadoUSD + Number((importeUsado / tipocambio).toFixed(2));
      importeVencidoUSD = importeVencidoUSD + Number((importeVencido / tipocambio).toFixed(2));
      importePorVencer = importeUsadoUSD - importeVencidoUSD;
      importeDisponible = (this.listaEecc[0].lineaCredito / tipocambio) - importeUsadoUSD

      const _txtCreditLine = document.getElementById("input-line-credit") as HTMLInputElement;
      const _txtCreditUtil = document.getElementById("input-line-utilizada") as HTMLInputElement;
      const _txtCreditVenc = document.getElementById("input-line-vencida") as HTMLInputElement;
      const _txtCreditXVen = document.getElementById("input-line-porvenc") as HTMLInputElement;
      const _txtCreditDisp = document.getElementById("input-line-disponible") as HTMLInputElement;

      console.log("linea", this.listaEecc[0].lineaCredito);
            
      _txtCreditLine.value = (this.listaEecc[0].lineaCredito / tipocambio).toLocaleString("es-PE", { style: "currency", currency: 'USD' });
      _txtCreditUtil.value = importeUsadoUSD.toLocaleString("es-PE", { style: "currency", currency: 'USD' });
      _txtCreditDisp.value = importeDisponible.toLocaleString("es-PE", { style: "currency", currency: 'USD' });
      _txtCreditVenc.value = importeVencidoUSD.toLocaleString("es-PE", { style: "currency", currency: 'USD' });
      _txtCreditXVen.value = importePorVencer.toLocaleString("es-PE", { style: "currency", currency: 'USD' });
    }
  }

  selectPagina(pag: number){
    this.pagina = pag;
  }

  async descargarEECC(){
    const xUrl: string = environment.urlrpt;
    const url: string = `${xUrl}/index.aspx?Parametros=P_CODIGO|${this.xCodCliente},eecc`;

    window.open(url, "_blank");

    // const data: any = await this.clienteService.obtenerEstadoCuentaDownload(this.xCodCliente).toPromise();
    // console.log("Reporte", data)
    // if(data.estado){
    //   var byteCharacters = atob(data.rpt);
    //   var byteNumbers = new Array(byteCharacters.length);

    //   for (var i = 0; i < byteCharacters.length; i++) {
    //       byteNumbers[i] = byteCharacters.charCodeAt(i);
    //   }

    //   var byteArray = new Uint8Array(byteNumbers); 
 
    //     let filename = `EECC_${ this.xCodCliente }.pdf`;  
    //     let binaryData = [];
    //     binaryData.push(byteArray);
    //     let downloadLink = document.createElement('a');
    //     downloadLink.href = window.URL.createObjectURL(
    //     new Blob(binaryData, { type: 'blob' }));
    //     downloadLink.setAttribute('download', filename);
    //     document.body.appendChild(downloadLink);
    //     downloadLink.click();
    // }
  }

  async consultaRUC(){
    this.flagLoad = true;
    const _login: any = { Username: "admin", Password: "admin" }
    // console.log(_login);    
    const _dataLogin: any = await this.clienteService.loginConsultaRUC(_login).toPromise();
    // console.log(_dataLogin);    

    const _ruc = document.getElementById("input-nro-doc") as HTMLInputElement;
    const data: any = await this.clienteService.consultaRUC(_ruc.value, _dataLogin.access_token).toPromise();
    console.log(data);
    this.listaDireccion = [];
    if(data.Resultado == "OK"){
      const _RazonSocial = document.getElementById("input-razon-social") as HTMLInputElement;
      const _TipoPersona = document.getElementById("input-tipo-per") as HTMLSelectElement;
      const _TipoDocumen = document.getElementById("input-tipo-doc") as HTMLSelectElement;
      const _AgenteReten = document.getElementById("input-age-ret") as HTMLInputElement;
      const _BuenContrib = document.getElementById("input-bn-cont") as HTMLInputElement;

      _RazonSocial.value = data.Razon;
      _TipoPersona.value = data.TipoPersona;
      this.tipoPersona = data.TipoPersona;
      _TipoDocumen.value = data.TipoDocumento;
      _AgenteReten.checked = data.AgenteRetencion;
      _BuenContrib.checked = data.BuenContribuyente;
      
      if (this.tipoPersona == "TPN"){
        const _txtPrimerNombre = document.getElementById("input-pri-nom") as HTMLInputElement;
        this.primerNombre = data.Nombres;
        _txtPrimerNombre.value = this.primerNombre;

        // const _txtSegundoNombre = document.getElementById("input-seg-nom") as HTMLInputElement;
        // this.segundoNombre = _txtSegundoNombre.value;

        const _txtApellidoPat = document.getElementById("input-ape-pat") as HTMLInputElement;
        this.apellidoPaterno = data.ApellidoPaterno;
        _txtApellidoPat.value = this.apellidoPaterno;

        const _txtApellidoMat = document.getElementById("input-ape-mat") as HTMLInputElement;
        this.apellidoMaterno = data.ApellidoMaterno;
        _txtApellidoMat.value = this.apellidoMaterno;

        _RazonSocial.value = this.apellidoPaterno + " " + this.apellidoMaterno + " " + this.primerNombre
      }

      if(data.Direcciones.length > 0){
        let _b: number = 0;
        let _s: number = 0;
        for(let i = 0; i < data.Direcciones.length; i++){
          const direccion: string = data.Direcciones[i].Nombre;
          const ubigeo: string = data.Direcciones[i].Ubigeo;
          const tipo: string = data.Direcciones[i].Tipo;
          const departamento: string = ubigeo.substring(0, 2);
          // console.log(departamento);
          const dataProvincia: any = await this.maestroService.obtenerProvincia(departamento).toPromise();
          // console.log("dataprovincia", dataProvincia);          
          const codProvincia: string = ubigeo.substring(0, 4);
          let provincia: string = "";
          for(let j = 0; j < dataProvincia.listaTablaGeneral.length; j++){
            if(dataProvincia.listaTablaGeneral[j].codigo == codProvincia){
              provincia = dataProvincia.listaTablaGeneral[j].descripcion;
            }
          }
          // console.log(codProvincia, provincia);          
          const dataDistrito: any = await this.maestroService.obtenerDistrito(provincia).toPromise();
          const codDist: string = ubigeo.substring(0, 6);
          let distrito: string = "";
          for(let x = 0; x < dataDistrito.listaTablaGeneral.length; x++){
            if(dataDistrito.listaTablaGeneral[x].codigo == codDist){
              distrito = dataDistrito.listaTablaGeneral[x].descripcion;
            }
          }
          // console.log(codDist, distrito);           

          let idDireccion: string = "";
          if(tipo == "B"){
            _b++;
            if(_b = 1){
              idDireccion = "FISCAL";
            }else{
              idDireccion = "FISCAL" + _b.toString();
            }
          }
          else{
            console.log("-->", _s);
            _s++;
            console.log(_s);
            if(_s == 1){
              idDireccion = "ALMACEN";
            }else{
              idDireccion = "ALMACEN" + _s.toString();
            }

            console.log(idDireccion);  
          }
          
          const _direccion: Direccion = {
            nombre: idDireccion,
            departamento: departamento,
            provincia: provincia,
            distrito: distrito,
            tipo: tipo,
            direccion: direccion,
            flagEditar: true,
            flagEliminar: false,
            ubigeo: ubigeo,
            u_EXX_TPED_ZONA: ""
          }
      
          console.log("direccion", _direccion);
          this.listaDireccion.push(_direccion);
        }
        
        //Si no hay almacen se registra uno
        if(this.listaDireccion.filter(t => t.tipo == "S").length == 0){
          let dir: Direccion = {
            tipo: "S",
            nombre: "ALMACEN",
            departamento: this.listaDireccion[0].departamento,
            provincia: this.listaDireccion[0].provincia,
            distrito: this.listaDireccion[0].distrito,
            direccion: this.listaDireccion[0].direccion,
            ubigeo: this.listaDireccion[0].ubigeo,
            flagEditar: true,
            flagEliminar: false,
            u_EXX_TPED_ZONA: ''
          };
          this.listaDireccion.push(dir);
        }
      }

      this.msgError = "Se cargo correctamente los datos del cliente"
    }else{
      this.msgError = "No se encontró informacion"
    }

    this.flagLoad = false;
    this.confirmDialog = true;
  }
}

