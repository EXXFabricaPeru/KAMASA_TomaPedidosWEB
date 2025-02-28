import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import ColumnHeader from 'src/app/models/columnHeader';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-listar',
  templateUrl: './cliente-listar.component.html',
  styleUrls: ['./cliente-listar.component.css']
})
export class ClienteListarComponent implements OnInit {
  valorCliente: string = "";
  codVendedor: string = "";
  user: string = "";
  msgError: string = "";
  errorDialog: boolean = false;
  confirmDialogCliente: boolean = false;
  dataUsuario: any;
  listaCliente: Cliente[] = [];
  clienteSelect!: Cliente;
  headerCliente: ColumnHeader[] = [];
  pagina: number = 0;
  listaPaginas: any[] = [];
  totalPaginas: number;
  lblMensaje: string;

  constructor(private clienteService: ClienteService, private router: Router){
    let dataTemp: any = localStorage.getItem("dataUsuario");
    this.dataUsuario = JSON.parse(dataTemp);
    if(this.dataUsuario == null || this.dataUsuario == undefined){
      this.router.navigateByUrl('login', { replaceUrl: true })
    }else{
      this.codVendedor = this.dataUsuario.codVendedor
      this.user = this.dataUsuario.usuario;
    }
  }

  ngOnInit(): void {
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
        customClass: "number",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "Saldo",
        key: "saldoDisponible",
        subKey: "",
        customClass: "number",
        type: "",
        value: "",
        visible: true
      },
      {
        label: "",
        key: "codigoCliente",
        subKey: "",
        customClass: "btnEdit",
        type: "buttonSearch",
        value: "",
        visible: true
      },
    ];
  }

  obtenerCliente(){
    this.listaCliente = [];
    this.listaPaginas = [];
    this.pagina = 0;

    const _cbTodos = document.getElementById("customCheck1") as HTMLInputElement;
    let flag: string = "";
    if(_cbTodos.checked){
      flag = 'T'
    }

    this.clienteService.obtenerCliente(this.valorCliente, this.codVendedor, flag).subscribe((data: any) => {
      console.log("Cliente Rpta", data);      
      if(data.estado == "True"){
        this.listaCliente = data.listaCLiente;

        const residuo: number = this.listaCliente.length % 15;
        let cociente: string = (this.listaCliente.length / 15).toString().split('.')[0];
        let numAux: string = "";
        const xCociente: number = Number(cociente);
        numAux = Number(cociente) > 5 ? "..." : ""; 
        cociente = Number(cociente) > 5 ? "4" : cociente; 

        const x: number = residuo == 0 ? 0 : 1;
        for(let i = 1; i <= Number(cociente) + x; i++){
          this.listaPaginas.push(i);
        }

        this.pagina = 1;

        if (numAux == "..."){
          this.listaPaginas.push(numAux);
          this.listaPaginas.push(xCociente + x);
        }

        this.totalPaginas = xCociente;
        this.lblMensaje = "";
      }else{
        this.lblMensaje = data.mensaje
      }
    });
    
  }

  crear(){
    this.router.navigateByUrl(`/cliente-crear/0`, { replaceUrl: true });
  }

  searchDocumento(row: any){
    console.log("cliente seleccionado", row);    

    if(row.flag){
      this.router.navigateByUrl(`/cliente-crear/${row.codigoCliente}`, { replaceUrl: true });
    }else{
      this.clienteSelect = row;
      this.confirmDialogCliente = true;
    }
  }

  seleccionarCliente(cliente: Cliente){
    console.log("cliente seleccionado", cliente );    
    this.router.navigateByUrl(`/cliente-crear/${cliente.codigoCliente}`, { replaceUrl: true });
  }

  closeDialog(){
    this.errorDialog = false;
  }

  selectPagina(pag: any){
    if(pag != "...")
      this.pagina = pag;
  }

}
