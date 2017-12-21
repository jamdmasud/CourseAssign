import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCreditComponent } from './course-credit.component';

describe('CourseCreditComponent', () => {
  let component: CourseCreditComponent;
  let fixture: ComponentFixture<CourseCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
