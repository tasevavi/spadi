import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/user/user.service';
import { FileUpload } from '../interfaces/fileUpload';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
  selectedFile!: File;
  currentFileUpload: FileUpload | undefined;
  uid!: string;

  constructor(
    private uploadService: FileUploadService, 
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.uid = this.userService.getUserUid();
  }

  selectFile(event: any): void {
    this.selectedFile = event.target.file;
  }

  //TODO: different logic for uploading photos to posts and to profile?
  upload(): void {
    this.currentFileUpload = new FileUpload(this.selectedFile, this.uid, 'profilePicture');
    this.uploadService.pushFileToStorage(this.currentFileUpload)
      .then(data => {
        //TODO: what do you want to do with the data?
    }).catch(error => {
      console.error(error, error.message);
    });
  }

}
