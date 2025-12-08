import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipanteChangePasswordComponent } from './participante-change-password.component';

describe('ParticipanteChangePasswordComponent', () => {
  let component: ParticipanteChangePasswordComponent;
  let fixture: ComponentFixture<ParticipanteChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipanteChangePasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipanteChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
