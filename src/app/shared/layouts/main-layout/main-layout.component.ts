import { Component } from '@angular/core';
import { ProfileShortcutComponent } from '../../components/profile-shortcut/profile-shortcut.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, ProfileShortcutComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
