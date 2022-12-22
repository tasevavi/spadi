import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private userService: UserService) { }

  // Get a reference to the storage service, which is used to create references in your storage bucket
  storage = getStorage();
  // Create a storage reference from our storage service
  storageRef = ref(this.storage);
  // Create a child reference
  imagesRef = ref(this.storage, 'profilePictures');
  // imagesRef now points to 'profilePictures'

  metadata = {
    contentType: 'image/jpeg'
  };

  uploadProfilePicture(file: any, userUID: any, afterUploadComplete: any): void {
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(this.storage, 'profilePictures/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, this.metadata);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    async () => {
      // Upload completed successfully, now we can get the download URL
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      await this.userService.updateUserProfilePicture(userUID, downloadURL);
      afterUploadComplete();
    }
  )}
}

