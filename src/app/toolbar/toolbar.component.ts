import { Component, Input } from '@angular/core';
import { MenuItem } from '../home/menu-item';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() menuItems: MenuItem[] = [];
  subMenu: any;
}
