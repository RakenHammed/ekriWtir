import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { AgmCoreModule } from '@agm/core';
import { NgxSpinnerModule } from 'ngx-spinner';

import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AdminSpaceComponent } from './admin/admin-space/admin-space.component';
import { LeasingDemandComponent } from './leasing-demand/leasing-demand.component';
import { RentingDemandComponent } from './renting-demand/renting-demand.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        JwBootstrapSwitchNg2Module,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_KEY_HERE'
        }),
        NgxSpinnerModule,
        RouterModule,
        BsDatepickerModule.forRoot(),
        ReactiveFormsModule,
    ],
    declarations: [
        LandingComponent,
        LoginComponent,
        ProfileComponent,
        CreateAccountComponent,
        AdminSpaceComponent,
        LeasingDemandComponent,
        RentingDemandComponent
    ]
})
export class PagesModule { }
