import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorCitasComponent } from './tutor-citas.component';

describe('TutorCitasComponent', () => {
  let component: TutorCitasComponent;
  let fixture: ComponentFixture<TutorCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorCitasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
