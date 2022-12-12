import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRoleMappingComponent } from './project-role-mapping.component';

describe('ProjectRoleMappingComponent', () => {
  let component: ProjectRoleMappingComponent;
  let fixture: ComponentFixture<ProjectRoleMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectRoleMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectRoleMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
