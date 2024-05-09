import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Applicant } from '../Model/applicant.model';

@Injectable({
  providedIn: 'root'
})
export class InstructorFormService {

  private api = "http://localhost:8080/applicant";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  create(applicant:Applicant): Observable<any>{
    return this.httpClient.post(this.api + '/post', JSON.stringify(applicant), this.httpOptions)
    .pipe( 
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.api + '/getall')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getById(id:number): Observable<any> {
    return this.httpClient.get(this.api + '/get/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:number, applicant:Applicant): Observable<any> {
    return this.httpClient.put(this.api + '/update/' + id, JSON.stringify(applicant), this.httpOptions)
    .pipe( 
      catchError(this.errorHandler)
    )
  }

  delete(id:number){
    return this.httpClient.delete(this.api + '/delete/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  countAll(): Observable<any> {
    return this.httpClient.get(this.api + '/getcount',{responseType: "text"})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
