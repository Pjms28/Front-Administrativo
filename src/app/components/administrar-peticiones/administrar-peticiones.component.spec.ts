import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarPeticionesComponent } from './administrar-peticiones.component';

describe('AdministrarPeticionesComponent', () => {
  let component: AdministrarPeticionesComponent;
  let fixture: ComponentFixture<AdministrarPeticionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarPeticionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarPeticionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
