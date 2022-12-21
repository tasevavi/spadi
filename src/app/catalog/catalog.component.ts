import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  allPosts: any;
  spinner: boolean = true;
  length: number = 0; //The length of the total number of items that are being paginated. Defaulted to 0.
  pageSize: number = 10; //Number of items per page
  showFirstLastButtons: boolean = true;
  hidePageSize: boolean = false;
  pageIndex: number = 0; //The zero-based page index of the displayed list of items. Defaulted to 0.
  showPageSizeOptions: boolean = true;
  pageSizeOptions = [10];
  userRequestedItems: String[] | undefined = [];
  
  constructor(
    private postsService: PostsService,
    private userService: UserService 
  ) { }

  ngOnInit(): void {
    this.getPosts();
    this.getUserRequestedItems();
  }

  alreadyRequested(itemId: string) {
    if (this.userRequestedItems !== undefined) {
      return this.userRequestedItems.includes(itemId);
    }
    return false;
  }

  getLength() {
    if (this.allPosts !== undefined) {
      this.length = this.allPosts.length;
    }
    return this.length;
  }

  getPosts() {
    return this.postsService.getAllPosts()
    .then(posts => {
      this.allPosts = posts;
      this.spinner = false;
    });
 }

 getUserRequestedItems() {
  return this.userService.getUserRequests()
  .then(requests => {
    this.userRequestedItems = requests;
  });
 }

 handlePageEvent(event: any) {
    //TODO: add logic for event handling
    // length: 1
    // pageIndex: 0
    // pageSize: 10
    // previousPageIndex: 1
 }

 clickRequest(item: Object, itemId: string) {
    alert("Item added to your requests");
    this.userService.addRequestItemToUserRequests(itemId);
    this.getUserRequestedItems();
 }
}
