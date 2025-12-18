import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorResenasComponent } from './tutor-resenas.component';

describe('TutorResenasComponent', () => {
  let component: TutorResenasComponent;
  let fixture: ComponentFixture<TutorResenasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorResenasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorResenasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
