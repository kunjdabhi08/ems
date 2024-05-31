import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../../Models/Employee.model';
import { ResponseModel } from '../../Models/Response.model';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-employeetable',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule, MatPaginator, MatSortModule, MatInputModule],
  templateUrl: './employeetable.component.html',
  styleUrl: './employeetable.component.css'
})
export class EmployeetableComponent implements AfterViewInit {
  dataSource = new MatTableDataSource<Employee>();
  employees: Employee[] = [];
  displayedColumns: string[] = ['name', 'email', 'phone', 'designation', 'actions'];
  
  constructor(private empService:EmployeeService, private  _liveAnnouncer: LiveAnnouncer){}
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.empService.getEmployee().subscribe({
      next: (resposne: ResponseModel<Employee[]>)=>{
        this.employees = resposne.data;
        this.dataSource.data = resposne.data;
        console.log(this.dataSource);
      },
      error: (err: ResponseModel<null>)=>{
        alert(err.message);
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  searchRecord = (event) => {
    let search:string = event.target.value;
    if(search.trim().length > 3){
      this.dataSource.data = this.employees.filter((x)=>x.name.toLowerCase().includes(search.trim().toLowerCase()) || x.email.toLowerCase().includes(search.trim().toLowerCase()) || x.designationName.toLowerCase().includes(search.trim().toLowerCase()))
    } else {
      this.dataSource.data = this.employees;
    }
  }


  
}
