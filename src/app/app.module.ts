import { LayoutModule } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlotlyModule } from 'angular-plotly.js';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import * as PlotlyJS from 'plotly.js-dist-min';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphicComponent } from './dashboard/graphic/graphic.component';
import { SiteFilterComponent } from './dashboard/site-filter/site-filter.component';
import { timeAxisFilterComponent } from './dashboard/time-axis-filter/time-axis-filter.component';
import { UpdatePeriodComponent } from './dashboard/update-period/update-period.component';
import { VerticalAxisFilterComponent } from './dashboard/vertical-axis-filter/vertical-axis-filter.component';
import { NavComponent } from './nav/nav.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SettingsComponent } from './settings/settings.component';
import { ContactComponent } from './contact/contact.component';
import { LhyfeNavModule } from 'lhyfe-nav';

PlotlyModule.plotlyjs = PlotlyJS;

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloak.url,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId
      },
      initOptions: {
        onLoad: 'login-required',
      },

      loadUserProfileAtStartUp: true,
      bearerExcludedUrls: ['/assets', '/clients/public']
    });
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GraphicComponent,
    UserAccountComponent,
    NavComponent,
    BannerComponent,
    SiteFilterComponent,
    VerticalAxisFilterComponent,
    timeAxisFilterComponent,
    UpdatePeriodComponent,
    NavBarComponent,
    SettingsComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatChipsModule,
    MatSelectModule,
    MatCheckboxModule,
    LayoutModule,
    PlotlyModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    FormsModule,
    ReactiveFormsModule,
    LhyfeNavModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
