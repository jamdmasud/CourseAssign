import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitExcelComponent } from './submit-excel.component';

describe('SubmitExcelComponent', () => {
  let component: SubmitExcelComponent;
  let fixture: ComponentFixture<SubmitExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
