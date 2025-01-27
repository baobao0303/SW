import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwPush, SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NotificationPermissionDialogComponent } from './notification-permission-dialog/notification-permission-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatDialogModule,
    NotificationPermissionDialogComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-sw';

  constructor(
    swUpdate: SwUpdate,
    swPush: SwPush,
    http: HttpClient,
    private dialog: MatDialog
  ) {
    // Kiểm tra và xử lý cập nhật phiên bản ứng dụng
    swUpdate.versionUpdates
      .pipe(
        filter(
          (event): event is VersionReadyEvent => event.type === 'VERSION_READY'
        )
      )
      .subscribe(() => {
        // Handle new version updates (if any)
      });

    // Lắng nghe các thông báo Push
    swPush.messages.subscribe((message) => {
      console.log('Push message:', message);
    });

    // Kiểm tra và yêu cầu quyền thông báo
    if (Notification.permission === 'default') {
      console.log('Yêu cầu quyền thông báo...');
      this.showNotificationDialog(swPush, http);
    } else if (Notification.permission === 'granted') {
      console.log('Người dùng đã cấp quyền từ trước.');
    } else {
      console.log('Người dùng đã từ chối quyền thông báo.');
    }
  }

  // Hiển thị Dialog yêu cầu quyền thông báo
  private showNotificationDialog(swPush: SwPush, http: HttpClient) {
    const dialogRef = this.dialog.open(NotificationPermissionDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Người dùng đồng ý cấp quyền thông báo.');

        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            this.subscribeToPushNotifications(swPush, http);
          } else {
            console.log('Người dùng từ chối quyền thông báo.');
          }
        });
      } else {
        console.log('Người dùng từ chối yêu cầu thông báo.');
      }
    });
  }

  // Đăng ký Push Notifications
  private subscribeToPushNotifications(swPush: SwPush, http: HttpClient) {
    const serverPublicKey =
      'BCIXQbt6YBfQWqVgy_MZDOSKQ0SHil7eeq0ldaFAO7wIPYS2AJTOA50RJkbEmfkgFjeOKJzOHm4cUyOMktB6G_M';

    swPush
      .requestSubscription({ serverPublicKey })
      .then((sub) => {
        console.log('Subscription:', sub);
        http
          .post('http://localhost:3000/subscription', sub)
          .subscribe((res) => {
            console.log('Đăng ký thông báo Push thành công:', res);
          });
      })
      .catch((err) => {
        console.error('Lỗi khi đăng ký thông báo Push:', err);
      });
  }
}
