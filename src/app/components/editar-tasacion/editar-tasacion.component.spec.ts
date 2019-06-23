import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTasacionComponent } from './editar-tasacion.component';

describe('EditarTasacionComponent', () => {
  let component: EditarTasacionComponent;
  let fixture: ComponentFixture<EditarTasacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTasacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTasacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
