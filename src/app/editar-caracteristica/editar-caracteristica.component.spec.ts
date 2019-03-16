import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCaracteristicaComponent } from './editar-caracteristica.component';

describe('EditarCaracteristicaComponent', () => {
  let component: EditarCaracteristicaComponent;
  let fixture: ComponentFixture<EditarCaracteristicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCaracteristicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCaracteristicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
