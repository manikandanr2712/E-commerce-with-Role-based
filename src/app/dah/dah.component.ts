import { Component } from '@angular/core';
import { MatMenuPanel } from '@angular/material/menu';


@Component({
  selector: 'app-dah',
  templateUrl: './dah.component.html',
  styleUrls: ['./dah.component.scss']
})
export class DahComponent {
  isMenuOpen = false;
  isSubmenuOpen = false;
  badgeContent = "3";
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isSubmenuOpen = false; // Close submenu when menu is toggled
  }

  toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }
}
