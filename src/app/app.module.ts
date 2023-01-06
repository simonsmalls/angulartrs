import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { HttpErrorInterceptor } from './errorhandling/http-error-interceptor';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {SharedModuleModule} from "./modules/shared-module/shared-module.module";
import {registerLocaleData} from "@angular/common";
import localeNlBE from '@angular/common/locales/nl-BE';

registerLocaleData(localeNlBE);

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModuleModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
        { provide: LOCALE_ID, useValue: 'nl-BE'}
    ],
    exports: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
