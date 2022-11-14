import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore'; 
import { db } from 'src/main';
import { DonationPost } from '../types/donationPost';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router, 
  ) { }
  // TODO: add post to user
  // TODO: add post to posts collection

  //Add post to DB
  async addNewPostToDB(donationPost: DonationPost) {
    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        postTitle: donationPost.postTitle,
        description: donationPost.description,
        category: donationPost.category,
        contact: donationPost.contact,
        photo: donationPost.photo,
        userIUD: donationPost.userIUD
      });
      this.router.navigate(['users/profile'], { queryParams: {
        id: donationPost.userIUD
      }});
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  //Add new post to user's posts collection
  async addNewPostToUserPosts(donationPost: DonationPost) {
    try {
      // TODO: find user and add post to their posts collection
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
}
