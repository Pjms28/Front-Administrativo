import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasForoComponent } from './categorias-foro.component';

describe('CategoriasForoComponent', () => {
  let component: CategoriasForoComponent;
  let fixture: ComponentFixture<CategoriasForoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasForoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
