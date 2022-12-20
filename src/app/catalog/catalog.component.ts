import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  allPosts: any;
  spinner: boolean = true;
  
  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    return this.postsService.getAllPosts()
    .then(posts => {
      this.allPosts = posts;
      this.spinner = false;
    });
 }
}
