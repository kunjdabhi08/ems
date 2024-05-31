import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { ResponseModel } from '../Models/Response.model';
import { Designation } from '../Models/Designation.model';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(private http: HttpClient) { }
  apiUrl = "https://localhost:7247/api/designation"


  getDesignations(): Observable<ResponseModel<Designation[]>> {
    return this.http.get<ResponseModel<Designation[]>>(this.apiUrl);
  }

  delelteDesignation(id: number): Observable<ResponseModel<Designation>>{
    return this.http.delete<ResponseModel<Designation>>(this.apiUrl + `/${id}`);
  }

  addDesignation(data:Designation): Observable<ResponseModel<Designation>>{
    return this.http.post<ResponseModel<Designation>>(this.apiUrl,data);
  }

  getDesignationById(id:number): Observable<ResponseModel<Designation>> {
    return this.http.get<ResponseModel<Designation>>(this.apiUrl + `/${id}`);
  }

  editDesignation(model: Designation): Observable<ResponseModel<Designation>>{
    return this.http.put<ResponseModel<Designation>>(this.apiUrl, model)
  }
}

