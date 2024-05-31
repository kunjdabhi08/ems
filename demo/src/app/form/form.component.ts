import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {  EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DesignationService } from '../designation.service';
import { CommonModule, Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from '../../Models/Response.model';
import { Designation } from '../../Models/Designation.model';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { Employee } from '../../Models/Employee.model';
import { EmployeeFormType } from '../../Models/EmployeeFormType.model';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  title: string = "Add Employee"
  constructor(private empService: EmployeeService, private route: ActivatedRoute, private desgService: DesignationService, private router: Router, private location: Location) {
    if (this.id) {
      this.title = "Edit Employee"
    }

  }
  designations!: Designation[];

  employeeForm!: FormGroup;

  id = this.route.snapshot.paramMap.get('id') as number | null;

  ngOnInit(): void {
    if (this.id) {
      this.empService.getEmployeeById(this.id).subscribe((data) => {

        this.employeeForm.patchValue({
          id: data.data.id,
          name: data.data.name,
          designation: data.data.designationId,
          email: data.data.email,
          phone: data.data.phone,
        })
      });
    }

    this.desgService.getDesignations().subscribe({
      next: (data: ResponseModel<Designation[]>) => {
        this.designations = data.data;
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    });

    this.employeeForm = new FormGroup<EmployeeFormType>({
      name: new FormControl('', [Validators.required, Validators.min(6), Validators.max(20)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      phone: new FormControl('',[Validators.required, Validators.pattern(/\d{10}$/)]),
      designation: new FormControl(0,Validators.required),
      id: new FormControl(0)
    })
  }

  goBack = (): void=>{
    this.router.navigate(['/']);
  }

  get f() {
    return this.employeeForm.controls;
  }



  handleFormSubmit = (): void => {
    this.employeeForm.markAllAsTouched()
    if (this.employeeForm.valid) {
      if (!this.employeeForm.value.id) {
        this.empService.createEmployee(this.employeeForm.value).subscribe({
          next: (data:ResponseModel<Employee>) => {
            if (data) {
              this.router.navigate(['/']);
            } 
          }, 
          error: (err:HttpErrorResponse) => {
            alert(err.message);
          }
        })
      } else {
        this.empService.editEmployee(this.employeeForm.value).subscribe(data => this.router.navigate(["/"]))
      }
    }
  }
}
