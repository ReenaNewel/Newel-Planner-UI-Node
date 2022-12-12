import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaMappingMasterComponent } from './ra-mapping-master.component';

describe('RaMappingMasterComponent', () => {
  let component: RaMappingMasterComponent;
  let fixture: ComponentFixture<RaMappingMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaMappingMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaMappingMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
