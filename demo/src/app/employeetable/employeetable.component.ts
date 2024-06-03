import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { RouterLink } from '@angular/router';
import { Employee } from '../../Models/Employee.model';
import { ResponseModel } from '../../Models/Response.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-employeetable',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule, MatPaginator, MatSortModule, MatInputModule, MatDialogModule, ConfirmationDialogComponent],
  templateUrl: './employeetable.component.html',
  styleUrl: './employeetable.component.css'
})

export class EmployeetableComponent implements AfterViewInit {
  dataSource = new MatTableDataSource<Employee>();
  employees: Employee[] = [];
  displayedColumns: string[] = ['name', 'email', 'phone', 'designation', 'actions'];

  dialogRef = MatDialogRef<ConfirmationDialogComponent>;

  constructor(private empService: EmployeeService, public dialog: MatDialog) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.fetchData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private fetchData = () => {
    this.empService.getEmployee().subscribe({
      next: (resposne: ResponseModel<Employee[]>) => {
        this.employees = resposne.data;
        this.dataSource.data = resposne.data;
      },
      error: (err: ResponseModel<null>) => {
        alert(err.message);
      }
    });
  }

  public openDialog = (e: number) => {
    const confirmationDialog = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: { id: e, isDesignation:false }
    });

    confirmationDialog.afterClosed().subscribe(() => {
      this.fetchData();
    })
  }

  searchRecord = (event) => {
    let search: string = event.target.value;
    if (search.trim().length > 2) {
      this.dataSource.data = this.employees.filter((x) => x.name.toLowerCase().includes(search.trim().toLowerCase()) || x.email.toLowerCase().includes(search.trim().toLowerCase()) || x.designationName.toLowerCase().includes(search.trim().toLowerCase()))
    }
    else {
      this.dataSource.data = this.employees;
    }
  }
}
