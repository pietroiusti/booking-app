import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRoomDialogComponent } from './modify-room-dialog.component';

describe('ModifyRoomDialogComponent', () => {
  let component: ModifyRoomDialogComponent;
  let fixture: ComponentFixture<ModifyRoomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyRoomDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
