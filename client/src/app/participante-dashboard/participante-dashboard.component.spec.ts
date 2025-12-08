import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipanteDashboardComponent } from './participante-dashboard.component';

describe('ParticipanteDashboardComponent', () => {
  let component: ParticipanteDashboardComponent;
  let fixture: ComponentFixture<ParticipanteDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipanteDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipanteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
