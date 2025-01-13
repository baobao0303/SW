self.addEventListener("push", (event) => {
  const data = event.data.json(); // Dữ liệu thông báo từ server

  const options = {
    body: data.body,
    icon: data.icon || "/assets/icons/icon-512x512.png",
    data: data.url, // Lưu URL hoặc dữ liệu liên quan
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Khi nhấp vào thông báo
self.addEventListener("notificationclick", (event) => {
  const url = event.notification.data; // URL được lưu trong thông báo
  event.notification.close();
  event.waitUntil(
    clients.openWindow(url) // Mở URL khi nhấp
  );
});
