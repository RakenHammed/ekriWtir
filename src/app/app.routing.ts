import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { AdminSpaceComponent } from './pages/admin/admin-space/admin-space.component';
import { SaveCareComponent } from './pages/leasing-demand/leasing-demand.component';
import { RentingDemandComponent } from './pages/renting-demand/renting-demand.component';


const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: ComponentsComponent },
    { path: 'nucleoicons', component: NucleoiconsComponent },
    { path: 'landing', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'create-account', component: CreateAccountComponent },
    { path: 'save-care', component: SaveCareComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'renting-demand', component: RentingDemandComponent },
    { path: 'admin/admin-space', component: AdminSpaceComponent }

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
