import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPermissionDialogComponent } from './notification-permission-dialog.component';

describe('NotificationPermissionDialogComponent', () => {
  let component: NotificationPermissionDialogComponent;
  let fixture: ComponentFixture<NotificationPermissionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationPermissionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationPermissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
