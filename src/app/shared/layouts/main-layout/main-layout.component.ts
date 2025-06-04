import { Component } from '@angular/core';
import { ProfileShortcutComponent } from '../../components/profile-shortcut/profile-shortcut.component';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, ProfileShortcutComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
