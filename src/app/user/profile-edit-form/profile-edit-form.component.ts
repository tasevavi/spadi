import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile-edit-form',
  templateUrl: './profile-edit-form.component.html',
  styleUrls: ['./profile-edit-form.component.css']
})
export class ProfileEditFormComponent implements OnInit {

  @Input() firstName: string = '';
  @Input() lastName: string = '';
  @Input() nickName: string = '';
  @Input() city: string = '';

  @Output() ret: EventEmitter<NgForm> = new EventEmitter<NgForm>();


  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('form values from profile-edit-form:', form.value);
      this.ret.emit(form.value);
    }
  }

}
