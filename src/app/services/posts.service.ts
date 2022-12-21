import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
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
      this.router.navigate(['/catalog'], { queryParams: {
        id: donationPost.userIUD
      }});
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  //Get user posts by userId
  async getUserPosts(uid: any) {
    const posts: any = [];
    try {
      const q = query(collection(db, 'posts'), where('userIUD', '==', uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const post = {key: doc.id, value: doc.data()};
        posts.push(post);
      });
    } catch (e) {
      console.error('Error getting document: ', e);
    }
    return posts;
  }

  //Get all posts for the catalog page
  async getAllPosts() {
    const posts: any = [];
    try {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      querySnapshot.forEach((doc) => {
        const post = {key: doc.id, value: doc.data()};
        posts.push(post);
      });
    } catch (e) {
      console.error('Error getting document: ', e);
    }
    return posts;
  }

  //Get post to edit
  async getPostByUid(uid: any) {
    const docRef = doc(db, 'posts', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return undefined;
    }
  }

  //Update edited post in DB
  async updatePost(uid: any, editedPost: any) {
    const docRef = doc(db, 'posts', uid);
    try {
      await updateDoc(docRef, editedPost);
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  }

  //Delete post in DB
  async deletePost(uid: any) {
    try {
      await deleteDoc(doc(db, 'posts', uid));
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  }
}
