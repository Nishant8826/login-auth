import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;

  constructor() { }

  setUser() {
    const user: any = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = user;
  }

  removeUser() {
    localStorage.removeItem('user');
    this.user = null;
  }

}
