import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DonationPost } from '../types/donationPost';


@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  constructor() { }
  categoriesData = ['books', 'clothes', 'cosmetics', 'cutlery', 'food', 'games', 'home', 'shoes', 'tech', 'time', 'other'];
  dropdownName = 'categoryDonation';
  selectedCategory: string = '';
  donationPost: DonationPost = { postTitle: '', description: '', category: '', contact: '', photo: '' };

  ngOnInit(): void {
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
    console.log(this.donationPost);
    // this.userService.registerUserWithEmailAndPassword(email, password, firstName, lastName)
  }
}
