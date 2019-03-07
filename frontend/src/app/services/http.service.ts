import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(public http: HttpClient) { }

  Get<T>(url): Observable<T> {
    url = `${environment.backendAPI}/${url}`;
    return this.http.get<T>(url);
  }

  Post<T>(url, data): Observable<T> {
    url = `${environment.backendAPI}/${url}`;
    return this.http.post<T>(url, data);
  }

  Put<T>(url, data): Observable<T> {
    url = `${environment.backendAPI}/${url}`;
    return this.http.put<T>(url, data);
  }

  Delete<T>(url): Observable<T> {
    url = `${environment.backendAPI}/${url}`;
    return this.http.delete<T>(url);
  }

  GetPromise<T>(url): Promise<T> {
    url = `${environment.backendAPI}/${url}`;
    return this.http.get<T>(url).toPromise();
  }

  PostPromise<T>(url, data): Promise<T> {
    url = `${environment.backendAPI}/${url}`;
    return this.http.post<T>(url, data).toPromise();
  }

  PutPromise<T>(url, data): Promise<T> {
    url = `${environment.backendAPI}/${url}`;
    return this.http.put<T>(url, data).toPromise();
  }

  DeletePromise<T>(url): Promise<T> {
    url = `${environment.backendAPI}/${url}`;
    return this.http.delete<T>(url).toPromise();
  }
}
