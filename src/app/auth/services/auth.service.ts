import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ILoginResponseData } from 'src/app/auth/models/login-response-data';
import { IAuthCredentials } from 'src/app/auth/models/credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  options = { withCredentials: true };
  constructor(private http: HttpClient) {}

  login(credentials: IAuthCredentials): Observable<ILoginResponseData> {
    return this.http.post<ILoginResponseData>(
      `${environment.apiUrl}/auth/sign-in`,
      credentials,
      this.options,
    );
  }

  register(credentials: IAuthCredentials): Observable<ILoginResponseData> {
    return this.http.post<ILoginResponseData>(
      `${environment.apiUrl}/auth/registration`,
      credentials,
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(
      `${environment.apiUrl}/auth/sign-out`,
      '',
      this.options,
    );
  }

  refresh(): Observable<ILoginResponseData> {
    return this.http.post<ILoginResponseData>(
      `${environment.apiUrl}/auth/refresh`,
      '',
    );
  }
}
