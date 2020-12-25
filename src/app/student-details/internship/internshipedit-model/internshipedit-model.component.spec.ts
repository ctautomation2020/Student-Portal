import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipeditModelComponent } from './internshipedit-model.component';

describe('InternshipeditModelComponent', () => {
  let component: InternshipeditModelComponent;
  let fixture: ComponentFixture<InternshipeditModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternshipeditModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternshipeditModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
