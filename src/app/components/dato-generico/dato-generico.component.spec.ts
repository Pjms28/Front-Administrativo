import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatoGenericoComponent } from './dato-generico.component';

describe('DatoGenericoComponent', () => {
  let component: DatoGenericoComponent;
  let fixture: ComponentFixture<DatoGenericoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatoGenericoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatoGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
