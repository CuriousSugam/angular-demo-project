import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: LoginService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.isLoggedIn = user && user.email ? true : false;
    });
  }
}
