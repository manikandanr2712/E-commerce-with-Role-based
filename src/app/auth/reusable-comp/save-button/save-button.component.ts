import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss']
})
export class SaveButtonComponent {  
  @Input() disabled: boolean = false;
  @Output() buttonClicked = new EventEmitter<string>();
  onButtonClicked(){
    this.buttonClicked.emit('how');
  }
}
