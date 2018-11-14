import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterModule } from './register/register.module';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { HomeModule } from './home/home.module';
import { PersistanceService } from './core/services/persistance/persistance.service';

export function jwtOptionsFactory(persistanceService: PersistanceService) {
    return {
        tokenGetter: () => {
            return persistanceService.getAccessToken();
        }
    };
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        HttpClientModule,
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptionsFactory,
                deps: [PersistanceService]
            }
        }),
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            preventDuplicates: true,
            progressBar: true
        }),
        NgxCaptchaModule,
        CoreModule,
        HomeModule,
        RegisterModule,
        LoginModule,
        ForgotPasswordModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
