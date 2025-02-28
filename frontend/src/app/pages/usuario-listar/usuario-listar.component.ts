import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-usuario-listar',
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.css']
})
export class UsuarioListarComponent implements OnInit {
  valorUsuario: string = "";
  headerCliente: any[] = [];
  listaUsuario: Usuario[] = [];
  idEmpleado: string = "";
  dataUsuario: any;
  errorDialog: boolean = false;

  msgError: string = "";

  constructor(private router: Router, private usuarioService: LoginService) {
    let dataTemp: any = localStorage.getItem("dataUsuario");
    this.dataUsuario = JSON.parse(dataTemp);
    if(this.dataUsuario == null || this.dataUsuario == undefined){
      this.router.navigateByUrl('login', { replaceUrl: true });
    }else{
      this.idEmpleado = this.dataUsuario.idEmpleado;
      if(this.idEmpleado != "1"){
        this.router.navigateByUrl('inicio', { replaceUrl: true });
      }
    }
  }

  ngOnInit(): void {
    this.headerCliente = [
      {
        label: "Código",
        key: "idEmpleado",
        subKey: "",
        customClass: "",
        type: "",
        value: ""
      },
      {
        label: "Nombre",
        key: "nombreEmpleado",
        subKey: "",
        customClass: "",
        type: "",
        value: ""
      },
      {
        label: "Usuario",
        key: "usuario",
        subKey: "",
        customClass: "",
        type: "",
        value: ""
      },
      {
        label: "Estado",
        key: "activo",
        subKey: "",
        customClass: "",
        type: "",
        value: ""
      },
      {
        label: "",
        key: "codigoCliente",
        subKey: "",
        customClass: "btnEdit",
        type: "buttonSearch",
        value: ""
      },
    ];

    this.obtenerUsuario();
  }

  obtenerUsuario(){
    console.log(this.valorUsuario)
    this.usuarioService.obtenerUsuarios(this.valorUsuario).subscribe((data: any) => {
      console.log("lista", data);
      if(data.estado == "True"){
        this.listaUsuario = data.listaEmpleado
      }
    });
  }

  searchUsuario(data: any){
    this.router.navigateByUrl(`/usuario-crear/${ data.idEmpleado }`, { replaceUrl: true });
  }

  closeDialog(){

  }

  crear(){
    this.router.navigateByUrl(`/usuario-crear/0`, { replaceUrl: true });
  }
}
