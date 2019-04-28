import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/examples.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConnectionService } from 'ng-connection-service';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        FormsModule,
        RouterModule,
        AppRoutingModule,
        ComponentsModule,
        PagesModule,
        HttpClientModule,
        NgxSpinnerModule,
        ToastrModule.forRoot(),
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
