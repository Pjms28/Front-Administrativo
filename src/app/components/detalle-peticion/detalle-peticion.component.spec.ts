import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePeticionComponent } from './detalle-peticion.component';

describe('DetallePeticionComponent', () => {
  let component: DetallePeticionComponent;
  let fixture: ComponentFixture<DetallePeticionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePeticionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePeticionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
