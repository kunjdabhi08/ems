import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Models/Employee.model';
import { ResponseModel } from '../Models/Response.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = "https://localhost:7247/api/employee"

  constructor(private http: HttpClient) { }

  getEmployee(): Observable<ResponseModel<Employee[]>> {
    return this.http.get<ResponseModel<Employee[]>>(this.apiUrl);
  }

  getEmployeeById(id: number): Observable<ResponseModel<Employee>>{
    return this.http.get<ResponseModel<Employee>>(`${this.apiUrl}/${id}`);
  }

  deleteEmployee(id: number): Observable<ResponseModel<Employee>>{
    return this.http.delete<ResponseModel<Employee>>(`${this.apiUrl}/${id}`); 
  }

  createEmployee(model:Employee): Observable<ResponseModel<Employee>>{
    return this.http.post<ResponseModel<Employee>>(`${this.apiUrl}`, model)
  }

  editEmployee(model:Employee): Observable<ResponseModel<Employee>>{
    return this.http.put<ResponseModel<Employee>>(this.apiUrl, model);
  }

}

