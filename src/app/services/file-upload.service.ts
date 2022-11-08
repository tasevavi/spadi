import { Injectable } from '@angular/core';

import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { db } from 'src/main';
import { FileUpload } from '../shared/interfaces/fileUpload';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  storage = getStorage();
  //reference to a location lower in the tree -> ref(storage, 'images/space.jpg')
  //storageRef = ref(this.storage);
  private basePath = '/uploads';

  constructor(
    private userService: UserService
  ) { }

  private saveFileData(fileUpload: FileUpload): void {
    //save file in db
  }

  pushFileToStorage(fileUpload: FileUpload): Promise<any> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = ref(this.storage, filePath);
    const uploadTask = uploadBytes(storageRef, fileUpload.file).then(uploadResult => {
      this.saveFileData(fileUpload);
      console.log('successfully uploaded, check DB')
    }).catch(error => {
      console.error(error, error.message);
    });
    return uploadTask;
  }

}


// Points to 'images'
//const imagesRef = ref(storageRef, 'images');

// Points to 'images/space.jpg'
// Note that you can use variables to create child values
//const fileName = 'space.jpg';
//const spaceRef = ref(imagesRef, fileName);

// File path is 'images/space.jpg'
//const path = spaceRef.fullPath;

// File name is 'space.jpg'
//const name = spaceRef.name;

// Points to 'images'
//const imagesRefAgain = spaceRef.parent;