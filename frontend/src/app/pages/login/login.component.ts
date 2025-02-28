import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  url: string = "./assets/img/GK.jpg";
  errorValidacion: Boolean = false;
  msgError: string = "";
  user: string = "";
  pass: string = "";

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  validar(){
    // console.log("---- Validar ----");
    // console.log("user", this.user);
    // console.log("pass", this.pass);
    
    if(this.user == "" || this.user == null){
      this.errorValidacion = true;
      this.msgError = "Tiene que escribir un usuario";
      return;
    }
    
    if(this.pass == "" || this.pass == null){
      this.errorValidacion = true;
      this.msgError = "Tiene que escribir una contraseña";
      return;
    }


    this.loginService.validarAcceso(this.user, this.pass).subscribe((data: any) => {
      
      if(data.estado == "True"){
        // console.log("Usuario", data.listaEmpleado[0]);        
        localStorage.setItem("dataUsuario", JSON.stringify(data.listaEmpleado[0]));
        // console.log("envio a la pantalla de inicio");
        this.router.navigateByUrl('/dashboard', { replaceUrl: true });
        // this.router.navigate(['inicio'])
      }else{
        this.errorValidacion = true;
        this.msgError = data.mensaje;
      }
    })
  }

  keyPress(eventVal: any){
    console.log(eventVal)
    if (eventVal.charCode == 13){
      this.validar();
    }else{
      this.errorValidacion = false;
    }
  }
}
