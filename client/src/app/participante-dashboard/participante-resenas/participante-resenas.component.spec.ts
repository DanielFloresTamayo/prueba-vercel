import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipanteResenasComponent } from './participante-resenas.component';

describe('ParticipanteResenasComponent', () => {
  let component: ParticipanteResenasComponent;
  let fixture: ComponentFixture<ParticipanteResenasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipanteResenasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipanteResenasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
