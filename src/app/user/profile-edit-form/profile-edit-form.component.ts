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
  @Input() locationCity: string = '';

  @Output() ret: EventEmitter<NgForm> = new EventEmitter<NgForm>();
  @Output() showEditForm: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit(): void {
  }

  cancelEditProfile(): void {
    this.showEditForm.emit(false);
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.ret.emit(form.value);
    }
  }
}
