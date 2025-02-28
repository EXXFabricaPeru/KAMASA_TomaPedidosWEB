import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { DocumentoCrearComponent } from './pages/documento-crear/documento-crear.component';
import { DocumentoListarComponent } from './pages/documento-listar/documento-listar.component';
import { DocumentoMostrarComponent } from './pages/documento-mostrar/documento-mostrar.component';
import { CotizacionListarComponent } from './pages/cotizacion-listar/cotizacion-listar.component';
import { PaginacionPipe } from './pipes/paginacion.pipe';
import { UsuarioListarComponent } from './pages/usuario-listar/usuario-listar.component';
import { UsuarioCrearComponent } from './pages/usuario-crear/usuario-crear.component';
import { ClienteCrearComponent } from './pages/cliente-crear/cliente-crear.component';
import { ClienteListarComponent } from './pages/cliente-listar/cliente-listar.component';
import { PaginacionCliPipe } from './pipes/paginacion-cli.pipe';
import { PaginacionEeccPipe } from './pipes/paginacion-eecc.pipe';
import { PaginacionArtPipe } from './pipes/paginacion-art.pipe';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    DocumentoCrearComponent,
    DocumentoListarComponent,
    DocumentoMostrarComponent,
    CotizacionListarComponent,
    PaginacionPipe,
    UsuarioListarComponent,
    UsuarioCrearComponent,
    ClienteCrearComponent,
    ClienteListarComponent,
    PaginacionCliPipe,
    PaginacionEeccPipe,
    PaginacionArtPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
