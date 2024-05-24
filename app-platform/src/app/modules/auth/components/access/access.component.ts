import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: [ './access.component.scss'],
})
export class AccessComponent {

  @Input() formGroup!: FormGroup;
  @Output() formGroupChanged = new EventEmitter<FormGroup>();

  constructor() {
    
  }

  onInputChange() {
    this.formGroupChanged.emit(this.formGroup);
  }
  
}