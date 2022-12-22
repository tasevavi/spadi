import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  allPosts: any;
  hidePageSize: boolean = false;
  length: number = 0; //The length of the total number of items that are being paginated. Defaulted to 0.
  showFirstLastButtons: boolean = true;
  pageIndex: number = 0; //The zero-based page index of the displayed list of items. Defaulted to 0.
  pageSize: number = 6; //Number of items per page
  postsPerPage: any = [];
  showPageSizeOptions: boolean = true;
  spinner: boolean = true;
  userRequestedItems: String[] | undefined = [];
  
  constructor(
    private postsService: PostsService,
    private userService: UserService 
  ) { }

  ngOnInit(): void {
    this.getPosts();
    this.getUserRequestedItems();
  }

  alreadyRequested(itemId: string): boolean {
    if (this.userRequestedItems !== undefined) {
      return this.userRequestedItems.includes(itemId);
    }
    return false;
  }

 clickRequest(itemId: string): void {
    alert("Item added to your requests");
    this.userService.addRequestItemToUserRequests(itemId);
    this.getUserRequestedItems();
 }

  getLength(): number {
    if (this.allPosts !== undefined) {
      this.length = this.allPosts.length;
    }
    return this.length;
  }

  getPosts() {
    return this.postsService.getAllPosts()
    .then(posts => {
      this.allPosts = posts;
      this.postsPerPage = this.allPosts.slice(0, this.pageSize);
      this.spinner = false;
    });
 }

 getUserRequestedItems(): void {
    this.userService.getUserRequests$()
    .pipe(tap(requests => this.userRequestedItems = requests))
    .subscribe();
 }

  handlePageEvent(event: any): void {
    let start = event.pageIndex * this.pageSize;
    let end = start + this.pageSize;
    this.postsPerPage = this.allPosts.slice(start, end);
  }
}
