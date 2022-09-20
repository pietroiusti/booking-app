import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoomDialog2Component } from './create-room-dialog2.component';

describe('CreateRoomDialog2Component', () => {
  let component: CreateRoomDialog2Component;
  let fixture: ComponentFixture<CreateRoomDialog2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRoomDialog2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRoomDialog2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
