import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-notification-permission-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './notification-permission-dialog.component.html',
  styleUrls: ['./notification-permission-dialog.component.css'],
})
export class NotificationPermissionDialogComponent {}
