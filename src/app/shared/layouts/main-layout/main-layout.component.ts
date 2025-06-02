import { Component } from '@angular/core';
import { ProfileShortcutComponent } from '../../components/profile-shortcut/profile-shortcut.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, ProfileShortcutComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
