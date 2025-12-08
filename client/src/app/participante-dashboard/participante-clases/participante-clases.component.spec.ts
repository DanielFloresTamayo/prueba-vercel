import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipanteClasesComponent } from './participante-clases.component';

describe('ParticipanteClasesComponent', () => {
  let component: ParticipanteClasesComponent;
  let fixture: ComponentFixture<ParticipanteClasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipanteClasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipanteClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
