import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCreditComponent } from './teacher-credit.component';

describe('TeacherCreditComponent', () => {
  let component: TeacherCreditComponent;
  let fixture: ComponentFixture<TeacherCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
