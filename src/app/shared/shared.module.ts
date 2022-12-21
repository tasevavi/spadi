import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    DropdownComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule, 
    FormsModule
  ], 
  exports: [
    DropdownComponent
  ]
})
export class SharedModule { }
