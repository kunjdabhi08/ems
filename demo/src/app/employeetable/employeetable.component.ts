import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../../Models/Employee.model';
import { ResponseModel } from '../../Models/Response.model';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-employeetable',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule],
  templateUrl: './employeetable.component.html',
  styleUrl: './employeetable.component.css'
})
export class EmployeetableComponent  {

  
  employees: Employee[] = [];
  
  displayedColumns: string[] = ['name', 'email', 'phone', 'designation', 'actions'];
  dataSource = this.employees;

  constructor(private empService:EmployeeService){}


  ngOnInit(): void {
    this.empService.getEmployee().subscribe({
      next: (resposne: ResponseModel<Employee[]>)=>{
        this.employees = resposne.data;
      },
      error: (err: ResponseModel<null>)=>{
        alert(err.message);
      }
    });
  }

  deleteEmloyee = (id: number):void => {
    if(confirm("Are you sure?")){
      this.empService.deleteEmployee(id).subscribe({
        next: ()=>{
          this.employees = this.employees.filter(x=> x.id !== id)
        },
        error: (err: HttpErrorResponse)=>{
          alert("Error deleting employee");
        }
      });
    }
  }
  
}
