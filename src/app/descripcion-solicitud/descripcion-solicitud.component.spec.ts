import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionSolicitudComponent } from './descripcion-solicitud.component';

describe('DescripcionSolicitudComponent', () => {
  let component: DescripcionSolicitudComponent;
  let fixture: ComponentFixture<DescripcionSolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescripcionSolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescripcionSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
