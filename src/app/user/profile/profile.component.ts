import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  profilePictureSrc: string | null | undefined; 
  showEditForm: boolean = false;
  showEditProfilePictureForm: boolean = false;
  user: any = new CurrentUser();
  userUID: string | undefined;
  userPosts: any;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute, 
    private router: Router,
    private userService: UserService, 
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

    this.userService.findUserByUid(this.userUID)
      .then(user => {
        if (user !== undefined) {
          if (user['photo'] === null || user['photo'] === '' || user['photo'] === undefined) {
            this.profilePictureSrc = '../../../assets/blank-profile-pic.png';
          } else {
            this.profilePictureSrc = user['photo'];
          }
        }
      });
  }

  getUserDonations(): number { 
    if (this.userPosts !== undefined) {
      return this.userPosts.length;
    }
    return 0;
  }

  getUserPosts(): void {
    this.postsService.getUserPosts(this.userUID)
    .then(posts => {
      if (posts !== undefined) {
        this.userPosts = posts;
      }
    })
  }

  editDonation(post: any): void {
    const redirectUrl = 'users/edit';
    this.router.navigate([redirectUrl], { queryParams: {
      id: post.key
    }});
  }

  setCurrentUserInformation(): void {
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

  changeUserInformation(form: NgForm): void {
    if (form.invalid) { 
      return; 
    }
    this.userService.editUserProfileInformation(this.userUID, form);
    this.showOrHideEditForm();
    this.setCurrentUserInformation();
  }

  changeUserPhoto(event: any): void {
    this.showOrHideEditProfilePictureForm();
    this.userService.findUserByUid(this.userUID)
      .then(user => {
        if (user !== undefined) {
          this.profilePictureSrc = user['photo'];
        }
      });
  }

  openEditProfilePictureForm(): void {
    this.showEditProfilePictureForm = !this.showEditProfilePictureForm;
  }

  showOrHideEditProfilePictureForm(): void {
    this.showEditProfilePictureForm = !this.showEditProfilePictureForm;
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