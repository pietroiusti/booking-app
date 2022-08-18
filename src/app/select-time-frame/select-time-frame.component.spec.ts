import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTimeFrameComponent } from './select-time-frame.component';

describe('SelectTimeFrameComponent', () => {
  let component: SelectTimeFrameComponent;
  let fixture: ComponentFixture<SelectTimeFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTimeFrameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectTimeFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
