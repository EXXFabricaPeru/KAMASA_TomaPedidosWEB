import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TablaGeneral } from 'src/app/models/tablageneral';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import { MaestroService } from 'src/app/services/maestro.service';

@Component({
  selector: 'app-usuario-crear',
  templateUrl: './usuario-crear.component.html',
  styleUrls: ['./usuario-crear.component.css']
})
export class UsuarioCrearComponent implements OnInit {
  _titulo: string = ""; 
  listaPriceList: TablaGeneral[] = [];
  listaMoneda: TablaGeneral[] = [];
  listaVendedores: TablaGeneral[] = [];
  listaSucursales: TablaGeneral[] = [];
  dataUsuario: any;
  codSucursal: string = "";

  usuario: string = "";
  password: string = "";
  codMoneda: string = "";
  codVendedorAsig: string = "";
  listaPrecio: string = "";
  codUsuario: string = "";
  oUsuario: Usuario = {
    codVendedor: 0,
    usuario: '',
    nombreEmpleado: '',
    idEmpleado: '',
    contrasenia: '',
    listaPrecio: '',
    moneda: '',
    activo: '',
    sucursal: 0
  };

  confirmDialog: boolean = false;
  exito: boolean = false;
  msgError: string = "";

  constructor(private router: Router, private _route: ActivatedRoute, private maestroService: MaestroService, private usuarioService: LoginService){
    let dataTemp: any = localStorage.getItem("dataUsuario");
    this.dataUsuario = JSON.parse(dataTemp);
    console.log(this.dataUsuario);
    if(this.dataUsuario == null || this.dataUsuario == undefined){
      this.router.navigateByUrl('login', { replaceUrl: true })
    }else{
      this.listaPrecio = this.dataUsuario.listaPrecio;
      this.codMoneda = this.dataUsuario.moneda;
    }
  }

  async ngOnInit(): Promise<void> {  
    const dataMoneda: any = await this.maestroService.obtenerMoneda().toPromise();
    if(dataMoneda.estado == "True"){
      this.listaMoneda = dataMoneda.listaTablaGeneral;
    }

    const dataListaPrecio: any = await this.maestroService.obtenerListaPrecio().toPromise();
    if(dataListaPrecio.estado == "True"){
      this.listaPriceList = dataListaPrecio.listaTablaGeneral;
    }

    const dataVendedor: any = await this.maestroService.obtenerListaVendedor().toPromise();
    if(dataVendedor.estado == "True"){
      this.listaVendedores = dataVendedor.listaTablaGeneral;
    }

    const dataSucursal: any = await this.maestroService.obtenerSucursales().toPromise();
    if(dataSucursal.estado == "True"){
      this.listaSucursales = dataSucursal.listaTablaGeneral;
    }

    //codigo
    if(this._route.snapshot.paramMap.get("codigo")){
      const xCodUsuario: any = this._route.snapshot.paramMap.get("codigo");
      this.codUsuario = xCodUsuario;
      // console.log("Codigo:", this.codUsuario);
      this.buscarUsuario(this.codUsuario);
    }
  }

  async guardarCliente(){
    const _vendedor = document.getElementById("input-vendedor") as HTMLSelectElement
    const _listprice = document.getElementById("input-lista-precio") as HTMLSelectElement
    const _moneda = document.getElementById("input-moneda") as HTMLSelectElement
    const _sucursal = document.getElementById("input-compania") as HTMLSelectElement
    const _usuario = document.getElementById("input-user") as HTMLInputElement
    const _password = document.getElementById("input-password") as HTMLInputElement

    this.codSucursal = _sucursal.value;
    this.codVendedorAsig = _vendedor.value;
    this.listaPrecio = _listprice.value;
    this.codMoneda = _moneda.value;
    this.usuario = _usuario.value;
    this.password = _password.value;

    if(this.password == ""){
      this.msgError = "Debe llenar el campo password";
      this.confirmDialog = true;
      return;
    }

    if(this.codSucursal == "" && this.listaSucursales.length > 0){
      this.msgError = "Debe seleccionar una sucursal";
      this.confirmDialog = true;
      return;
    }

    this.oUsuario = {
      codVendedor: Number(this.codVendedorAsig),
      usuario: this.usuario,
      nombreEmpleado: '',
      idEmpleado: this.codUsuario,
      contrasenia: this.password,
      listaPrecio: this.listaPrecio,
      moneda: this.codMoneda,
      activo: 'Y',
      sucursal: Number(this.codSucursal)
    }
    console.log(this.oUsuario);    

    if(this.codUsuario == "" || this.codUsuario == "0"){
      const data: any = await this.usuarioService.usurioRegistrar(this.oUsuario).toPromise();
      console.log("Respuesta registro", data);
      if(data.estado == "True"){
        this.exito = true;
      }
      this.msgError = data.mensaje;
      this.confirmDialog = true;
      console.log(this.confirmDialog, this.msgError);      
    }else{
      const data: any = await this.usuarioService.usurioActualizar(this.oUsuario).toPromise();
      console.log("Respuesta actualizar", data);        
      if(data.estado == "True"){
        this.exito = true;
      }
      this.msgError = data.mensaje;
      this.confirmDialog = true;
      console.log(this.confirmDialog, this.msgError);
    }

  }

  closeDialogConfirm(){
    this.confirmDialog = false;
    if(this.exito){
      this.router.navigateByUrl(`/usuario-listar`, { replaceUrl: true });
    }
  }

  buscarUsuario(id: string){
    const _vendedor = document.getElementById("input-vendedor") as HTMLSelectElement;
    const _listprice = document.getElementById("input-lista-precio") as HTMLSelectElement;
    const _moneda = document.getElementById("input-moneda") as HTMLSelectElement;
    const _sucursal = document.getElementById("input-compania") as HTMLSelectElement;
    const _usuario = document.getElementById("input-user") as HTMLInputElement;
    const _password = document.getElementById("input-password") as HTMLInputElement;

    this.usuarioService.obtenerUsuario(id).subscribe((data: any) =>{
      
      this.oUsuario = data.listaEmpleado[0];
      this.codVendedorAsig = this.oUsuario.codVendedor.toString();
      _vendedor.value = this.codVendedorAsig;
      this.usuario = this.oUsuario.usuario;
      _usuario.value = this.usuario;
      this.listaPrecio = this.oUsuario.listaPrecio;
      _listprice.value = this.listaPrecio;
      this.codMoneda = this.oUsuario.moneda;
      _moneda.value = this.codMoneda;
      this.codSucursal = this.oUsuario.sucursal.toString();
      console.log(_sucursal.options, this.codSucursal);
      this.codUsuario = this.oUsuario.idEmpleado;      
      _sucursal.value = this.codSucursal;
      this.password = this.oUsuario.contrasenia;
      _password.value = this.password;
    });
  }
}
