import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: LoginService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.isLoggedIn = user && user.email ? true : false;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
