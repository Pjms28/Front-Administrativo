import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarVisitaComponent } from './agregar-visita.component';

describe('AgregarVisitaComponent', () => {
  let component: AgregarVisitaComponent;
  let fixture: ComponentFixture<AgregarVisitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarVisitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
