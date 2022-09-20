import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRoomDialog2Component } from './modify-room-dialog2.component';

describe('ModifyRoomDialog2Component', () => {
  let component: ModifyRoomDialog2Component;
  let fixture: ComponentFixture<ModifyRoomDialog2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyRoomDialog2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyRoomDialog2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
