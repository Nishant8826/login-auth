import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import users from '../../../public/user.json'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: "./login.html",
})
export class Login implements OnInit {
  email: string = '';
  password: string = ''
  users: any = [];

  constructor(private auth: AuthService, private router: Router) {
    this.users = users;
  }

  ngOnInit(): void {
    this.email = '';
    this.password = '';
  }

  login() {
    if (this.email && this.password) {
      console.log('Logging in with', this.email, this.password);
      console.log('Logging in with', this.users);
      const user = this.users.find((i: any) => i.email.toLowerCase() == this.email.toLowerCase() && i.password.toLowerCase() == this.password.toLowerCase());
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/profile'])
    }
  }
}
