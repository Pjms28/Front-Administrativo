import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemasforosComponent } from './temasforos.component';

describe('TemasforosComponent', () => {
  let component: TemasforosComponent;
  let fixture: ComponentFixture<TemasforosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemasforosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemasforosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
