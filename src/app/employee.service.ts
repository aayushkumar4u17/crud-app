import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = "http://localhost:1018/api/employees";

  constructor(private httpClient: HttpClient) { }

  
  // getPaginatedEmployees(page: number, size: number): Observable<{data:Employee[], totalPages:number}> {
  //   const params = new HttpParams()
  //     .set('page', page.toString())
  //     .set('size', size.toString());

  //   return this.httpClient.get<{ data:Employee[], totalPages: number}>(`${this.baseURL}/`, { params });
  // }
  getdataWithPagination(page:number,size:number):Observable<any>{
   return this.httpClient.get(`${this.baseURL}/?page=${page}&size=${size}`)
  }

  getEmployeesList(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseURL}`);
  }
  searchEmployees(data: string): Observable<any> {
    const url = `${this.baseURL}/search?data=${data}`;
    return this.httpClient.get(url); 
  }
  getEmployeeImage(id: number): Observable<Blob> {
    return this.httpClient.get(`${this.baseURL}/employees/${id}/image`, { responseType: 'blob' });
  }

  createEmployee(formData:FormData){
    return this.httpClient.post<any>(`${this.baseURL}`, formData);
  }

  getEmployeeById(id: number): Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`)
  }

  updateEmployee(id: number, employee: Employee): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, employee)
  }

  deleteEmployee(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
