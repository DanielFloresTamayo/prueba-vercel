import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipanteCitasComponent } from './participante-citas.component';

describe('ParticipanteCitasComponent', () => {
  let component: ParticipanteCitasComponent;
  let fixture: ComponentFixture<ParticipanteCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipanteCitasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipanteCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
