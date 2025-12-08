import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorChangePasswordComponent } from './tutor-change-password.component';

describe('TutorChangePasswordComponent', () => {
  let component: TutorChangePasswordComponent;
  let fixture: ComponentFixture<TutorChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorChangePasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
