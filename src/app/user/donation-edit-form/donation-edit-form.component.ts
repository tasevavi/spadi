import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/user.service';
import { DonationPost } from 'src/app/types/donationPost';

@Component({
  selector: 'app-donation-edit-form',
  templateUrl: './donation-edit-form.component.html',
  styleUrls: ['./donation-edit-form.component.css']
})
export class DonationEditFormComponent implements OnInit {

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute, 
    private router: Router,
    private userService: UserService, 
  ) { }

  categoriesData = ['books', 'clothes', 'cosmetics', 'cutlery', 'food', 'games', 'home', 'shoes', 'tech', 'time', 'other'];
  dropdownName = 'categoryDonation';
  selectedCategory: string = '';
  postToEdit = { postTitle: '', description: '', category: '', contact: '', photo: '', userIUD: '' };
  postEdited: DonationPost = { postTitle: '', description: '', category: '', contact: '', photo: '', userIUD: '' };
  postId: string = '';
  uid: string = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      if (data['id'] !== undefined) {
        this.postId = data['id']
      }
      if (this.postId !== undefined) {
        this.getPost();
      }
    });
    this.uid = this.userService.getUserUid();
  }

  getPost() {
    return this.postsService.getPostByUid(this.postId)
      .then(post => {
        if (post !== undefined) {
          this.postToEdit.postTitle = post['postTitle'];
          this.postToEdit.category = post['category'];
          this.selectedCategory = post['category'];
          this.postToEdit.contact = post['contact'];
          this.postToEdit.description = post['description'];
          this.postToEdit.photo = post['photo'];
          this.postToEdit.userIUD = post['userIUD'];
        }
    });
  }

  onSelectCategory(value: any): void {
    this.selectedCategory = value;
  }

  post(form: NgForm) {
    if (form.invalid) { 
      alert('Please, fill in all fields!');
      return; 
    }
    const { postTitle, description, contactInformation, postPhoto } = form.value;
    this.postEdited.postTitle = postTitle;
    this.postEdited.description = description;
    this.postEdited.contact = contactInformation;
    this.postEdited.photo = postPhoto;
    this.postEdited.category = this.selectedCategory;
    this.postEdited.userIUD = this.uid;
    this.postsService.updatePost(this.postId, this.postEdited);
    this.router.navigate(['users/profile'], { queryParams: {
      id: this.uid
    }});
  }
}
