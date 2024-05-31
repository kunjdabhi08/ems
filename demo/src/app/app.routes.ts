import { Routes } from '@angular/router';
import {FormComponent} from '../app/form/form.component'
import { EmployeetableComponent } from './employeetable/employeetable.component';
import { DesignationtableComponent } from './designationtable/designationtable.component';
import { DesignationFormComponent } from './designation-form/designation-form.component';

export const routes: Routes = [
    { path: '', component: EmployeetableComponent },
    {path: 'addEmployee', component: FormComponent},
    {path:  'editEmployee/:id', component: FormComponent},
    {path: 'designations' , component: DesignationtableComponent},
    {path: 'designations/addDesignation', component: DesignationFormComponent},
    {path: 'designations/editDesignation/:id' , component: DesignationFormComponent}
];
