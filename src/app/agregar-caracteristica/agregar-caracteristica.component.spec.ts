import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCaracteristicaComponent } from './agregar-caracteristica.component';

describe('AgregarCaracteristicaComponent', () => {
  let component: AgregarCaracteristicaComponent;
  let fixture: ComponentFixture<AgregarCaracteristicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarCaracteristicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCaracteristicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
