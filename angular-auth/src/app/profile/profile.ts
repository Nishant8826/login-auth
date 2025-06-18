import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  user: any;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  logout() {
    this.auth.removeUser();
    this.router.navigate(['/'])
  }

}
