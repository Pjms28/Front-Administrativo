import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasacionesComponent } from './tasaciones.component';

describe('TasacionesComponent', () => {
  let component: TasacionesComponent;
  let fixture: ComponentFixture<TasacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
