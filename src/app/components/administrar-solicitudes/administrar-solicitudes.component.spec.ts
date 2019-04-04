import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarSolicitudesComponent } from './administrar-solicitudes.component';

describe('AdministrarSolicitudesComponent', () => {
  let component: AdministrarSolicitudesComponent;
  let fixture: ComponentFixture<AdministrarSolicitudesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarSolicitudesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
