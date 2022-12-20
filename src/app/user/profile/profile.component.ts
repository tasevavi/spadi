import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'firebase/auth';
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from '../../services/user.service';
import { CurrentUser } from '../../types/currentUser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  currentUser: User | undefined;
  profilePictureSrc: string = ''; 
  showEditForm: boolean = false;
  user: any = new CurrentUser();
  userUID: string | undefined;
  userPosts: any;

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute, 
    private postsService: PostsService
  ) { }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      if (data['id'] !== undefined) {
        this.userUID = data['id']
      } else {
        this.currentUser = this.userService.user;
        this.userUID = this.currentUser?.uid;
      }
      if (this.userUID !== undefined) {
        this.getUserPosts();
        this.setCurrentUserInformation();
      }
    })

    if (this.profilePictureSrc === '') {
      this.profilePictureSrc = '../../../assets/blank-profile-pic.png';
    }
  }

  getUserPosts() {
    this.postsService.getUserPosts(this.userUID)
    .then(posts => {
      if (posts !== undefined) {
        this.userPosts = posts;
      }
    })
  }

  setCurrentUserInformation() {
    this.userService.findUserByUid(this.userUID)
    .then(data => {
      if (data !== undefined) {
        Object.keys(data).forEach(key => {
          if (key !== undefined) {
            this.user[key] = data[key];
          }
        });
      }
    });
  }

  changeUserInformation(form: NgForm) {
    if (form.invalid) { 
      return; 
    }
    this.userService.editUserProfileInformation(this.userUID, form);
    this.showOrHideEditForm();
    this.setCurrentUserInformation();
  }

  showOrHideEditForm() {
    this.showEditForm = !this.showEditForm;
  }

  hasNoPosts(): boolean {
    if (this.userPosts !== undefined) {
      return this.userPosts.length > 0 ? false : true;
    }
    return true;
  }
}