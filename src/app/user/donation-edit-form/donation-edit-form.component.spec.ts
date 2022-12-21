import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationEditFormComponent } from './donation-edit-form.component';

describe('DonationEditFormComponent', () => {
  let component: DonationEditFormComponent;
  let fixture: ComponentFixture<DonationEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
