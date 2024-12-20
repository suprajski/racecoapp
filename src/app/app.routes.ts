import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { TrackpageComponent } from './trackpage/trackpage.component';
import { EventpageComponent } from './eventpage/eventpage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserpageComponent } from './userpage/userpage.component';
import { authGuard } from './auth.guard';
import { BuyticketComponent } from './buyticket/buyticket.component';
import { EmployeesComponent } from './employees/employees.component';
import { ReportpageComponent } from './reportpage/reportpage.component';
import { FileReportComponent } from './file-report/file-report.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path:'main', component:MainpageComponent},
    {path:'tracks', component:TrackpageComponent},
    {path:'events', component:EventpageComponent},
    {path:'register', component:RegisterComponent},
    {path:'login', component:LoginComponent},
    {path:'user', component:UserpageComponent, canActivate: [authGuard]},
    {path:'events/:eventId/buy', component: BuyticketComponent},
    {path:'manage', component:EmployeesComponent},
    {path:'viewreports',component:ReportpageComponent},
    {path:'report',component:FileReportComponent}
    
];
