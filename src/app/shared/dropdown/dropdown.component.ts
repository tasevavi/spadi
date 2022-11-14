import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input() data: string[] = [];
  @Input() name: string = '';
  @Input() value: string = '';
  @Output() ret: EventEmitter<string> = new EventEmitter<string>();

  selectedValue: string = '';
  title: string = 'Select Category';

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.selectedValue = this.value ?? this.title;
  }

  onChange(): void {
    if (this.selectedValue !== this.title) {
      this.ret.emit(this.selectedValue);
    } 
  }

  reset(): void {
    this.selectedValue = this.title;
  }
}
