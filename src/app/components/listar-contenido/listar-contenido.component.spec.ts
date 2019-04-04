import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarContenidoComponent } from './listar-contenido.component';

describe('ListarContenidoComponent', () => {
  let component: ListarContenidoComponent;
  let fixture: ComponentFixture<ListarContenidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarContenidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
