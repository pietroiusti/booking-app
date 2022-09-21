import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModifyRoomDialogComponent } from './create-modify-room-dialog.component';

describe('CreateModifyRoomDialogComponent', () => {
  let component: CreateModifyRoomDialogComponent;
  let fixture: ComponentFixture<CreateModifyRoomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateModifyRoomDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateModifyRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
