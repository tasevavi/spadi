import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  constructor() { }
  categoriesData = ['books', 'clothes', 'cosmetics', 'cutlery', 'food', 'games', 'home', 'shoes', 'tech', 'time', 'other'];
  dropdownName = 'categoryDonation';
  dropdownTitle = 'Select Category';
  selectedCategory: string = '';

  ngOnInit(): void {
  }

  onSelectCategory(value: any): void {
    this.selectedCategory = value;
  }

  post(form: NgForm) {
    if (form.invalid) { return; }
    const { postTitle, description, category, contact, photo } = form.value;
    console.log(form.value)
    // this.userService.registerUserWithEmailAndPassword(email, password, firstName, lastName)
  }
}
