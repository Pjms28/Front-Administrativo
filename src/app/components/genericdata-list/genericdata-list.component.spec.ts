import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericdatalistComponent } from './genericdata-list.component';

describe('GenericdatalistComponent', () => {
  let component: GenericdatalistComponent;
  let fixture: ComponentFixture<GenericdatalistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericdatalistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericdatalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
