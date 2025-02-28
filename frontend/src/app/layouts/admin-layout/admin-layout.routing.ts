import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { DocumentoListarComponent } from 'src/app/pages/documento-listar/documento-listar.component';
import { CotizacionListarComponent } from 'src/app/pages/cotizacion-listar/cotizacion-listar.component';
import { DocumentoMostrarComponent } from 'src/app/pages/documento-mostrar/documento-mostrar.component';
import { DocumentoCrearComponent } from 'src/app/pages/documento-crear/documento-crear.component';
import { ClienteListarComponent } from 'src/app/pages/cliente-listar/cliente-listar.component';
import { ClienteCrearComponent } from 'src/app/pages/cliente-crear/cliente-crear.component';
import { UsuarioListarComponent } from 'src/app/pages/usuario-listar/usuario-listar.component';
import { UsuarioCrearComponent } from 'src/app/pages/usuario-crear/usuario-crear.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',                    component: DashboardComponent },
    { path: 'user-profile',                 component: UserProfileComponent },
    { path: 'tables',                       component: TablesComponent },
    { path: 'icons',                        component: IconsComponent },
    { path: 'maps',                         component: MapsComponent },
    { path: 'doc-listar/:tipo',             component: DocumentoListarComponent },
    { path: 'cot-listar/:tipo',             component: CotizacionListarComponent },
    { path: 'doc-mostrar/:nro/:tipo',       component: DocumentoMostrarComponent },
    { path: 'doc-crear/:nro/:tipo',         component: DocumentoCrearComponent },
    { path: 'cliente-listar',               component: ClienteListarComponent},
    { path: 'cliente-crear/:codCliente',    component: ClienteCrearComponent},
    { path: 'usuario-listar',               component: UsuarioListarComponent},
    { path: 'usuario-crear/:codigo',        component: UsuarioCrearComponent}
];
