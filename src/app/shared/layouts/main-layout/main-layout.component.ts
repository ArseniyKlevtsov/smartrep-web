import { Component, OnInit } from '@angular/core';
import { ProfileShortcutComponent } from '../../components/profile-shortcut/profile-shortcut.component';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, ProfileShortcutComponent, FooterComponent, NgIf],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit {
  hasAcces: Boolean = false

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.hasAcces = this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
