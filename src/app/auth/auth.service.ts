import { AuthData } from './auth.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  createUser(email: string, password: string) {
    const authData: AuthData = { email, password};
    this.http
      .post('http://localhost:5000/user/signup', authData)
      .subscribe((response) => console.log(response));
  }
  login(email: string, password: string) {
    const authData: AuthData = { email, password};
    this.http.post('http://localhost:5000/user/login', authData)
    .subscribe(response => console.log(response));
  }
}


