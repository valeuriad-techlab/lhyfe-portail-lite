import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LhyfeAuthGuard } from 'projects/lhyfe-components/src/lib/lhyfe-auth-gard';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { UserAccountComponent } from './user-account/user-account.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [LhyfeAuthGuard] },
  { path: 'user-account', component: UserAccountComponent, canActivate: [LhyfeAuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [LhyfeAuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [LhyfeAuthGuard] },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
