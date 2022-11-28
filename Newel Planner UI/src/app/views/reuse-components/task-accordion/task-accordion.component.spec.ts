import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAccordionComponent } from './task-accordion.component';

describe('TaskAccordionComponent', () => {
  let component: TaskAccordionComponent;
  let fixture: ComponentFixture<TaskAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
