import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoCaracteristicaComponent } from './proyecto-caracteristica.component';

describe('ProyectoCaracteristicaComponent', () => {
  let component: ProyectoCaracteristicaComponent;
  let fixture: ComponentFixture<ProyectoCaracteristicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectoCaracteristicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoCaracteristicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
