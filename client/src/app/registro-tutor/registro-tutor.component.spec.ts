import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTutorComponent } from './registro-tutor.component';

describe('RegistroTutorComponent', () => {
  let component: RegistroTutorComponent;
  let fixture: ComponentFixture<RegistroTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroTutorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
