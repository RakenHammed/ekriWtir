import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { AdminSpaceComponent } from './pages/admin/admin-space/admin-space.component';
import { LeasingDemandComponent } from './pages/leasing-demand/leasing-demand.component';
import { RentingDemandComponent } from './pages/renting-demand/renting-demand.component';
import { AuthenticationGuard, RoleGuardService } from './providers/authentication-guard';


const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: ComponentsComponent, canActivate: [AuthenticationGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'create-account', component: CreateAccountComponent },
    { path: 'leasing-demand', component: LeasingDemandComponent, canActivate: [AuthenticationGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard] },
    { path: 'renting-demand', component: RentingDemandComponent, canActivate: [AuthenticationGuard] },
    { path: 'admin/admin-space', component: AdminSpaceComponent, canActivate: [RoleGuardService] }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
