import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.css']
})

export class UploadPictureComponent implements OnInit {
  selectedFile!: File;
  uid: string = this.userService.getUserUid();

  @Output() uploaded: EventEmitter<any> = new EventEmitter();

  constructor(
    private userService: UserService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.uid = this.userService.getUserUid();
  }

  selectFile(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  upload(): void {
    this.storageService.uploadProfilePicture(this.selectedFile, this.uid);
    this.uploaded.emit(true);
  }
}
