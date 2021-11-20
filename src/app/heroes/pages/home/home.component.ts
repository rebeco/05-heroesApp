import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .container {
        margin: 10px;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  get auth() {
    return this.authService.auth;
  }

  ngOnInit(): void {}

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/auth/login']);
  }
}
