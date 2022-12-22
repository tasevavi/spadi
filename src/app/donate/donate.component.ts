import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { UserService } from '../services/user.service';
import { DonationPost } from '../types/donationPost';


@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  constructor(
    private userService: UserService, 
    private postsService: PostsService
  ) { }

  categoriesData = ['books', 'clothes', 'cosmetics', 'cutlery', 'food', 'games', 'home', 'shoes', 'tech', 'time', 'other'];
  donationPost: DonationPost = { postTitle: '', description: '', category: '', contact: '', photo: '', userIUD: '' };
  dropdownName = 'categoryDonation';
  selectedCategory: string = '';

  ngOnInit(): void {
    this.donationPost.userIUD = this.userService.getUserUid();
  }

  onSelectCategory(value: any): void {
    this.selectedCategory = value;
  }

  post(form: NgForm) {
    if (form.invalid) { return; }
    const { postTitle, description, contactInformation, postPhoto } = form.value;
    this.donationPost.postTitle = postTitle;
    this.donationPost.description = description;
    this.donationPost.contact = contactInformation;
    this.donationPost.photo = postPhoto;
    this.donationPost.category = this.selectedCategory;
    this.postsService.addNewPostToDB(this.donationPost);
  }
}
