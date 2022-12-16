import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekelyEffortsComponent } from './weekely-efforts.component';

describe('WeekelyEffortsComponent', () => {
  let component: WeekelyEffortsComponent;
  let fixture: ComponentFixture<WeekelyEffortsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekelyEffortsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekelyEffortsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
