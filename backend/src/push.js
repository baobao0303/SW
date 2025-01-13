const webpush = require("web-push");
const fs = require("fs");

// Thông tin VAPID được định nghĩa trực tiếp
const VAPID = {
  publicKey: "BCIXQbt6YBfQWqVgy_MZDOSKQ0SHil7eeq0ldaFAO7wIPYS2AJTOA50RJkbEmfkgFjeOKJzOHm4cUyOMktB6G_M",
  privateKey: "xyy6ZlnDbJjyV1Igh6MbTjkuozKRuqi5h6hwCzoKV6A",
};

// Cấu hình VAPID
webpush.setVapidDetails("mailto:example@yourdomain.org", VAPID.publicKey, VAPID.privateKey);

// Tải nội dung thông báo
const payload = JSON.stringify({
  notification: {
    title: "Cozwork kính chúc năm mới 2025 an khang thịnh vượng!",
    body: "Cảm ơn bạn đã đồng hành cùng chúng tôi. Chúc bạn một năm mới nhiều sức khỏe và thành công.",
    icon: "https://greenart.vn/wp-content/uploads/2024/07/a663d10a-6d54-4c02-acd4-2ed367ddb0de-transformed.jpeg",
    actions: [
      {
        action: "open-url",
        title: "Xem chi tiết",
        url: "https://cozwork.com/vi/",
      },
    ],
  },
});

// Hàm gửi thông báo
async function sendNotification(pushSubscription) {
  try {
    await webpush.sendNotification(pushSubscription, payload);
    console.log("Thông báo đã được gửi thành công!");
  } catch (err) {
    console.error("Lỗi khi gửi thông báo:", err.message);
    console.error("Vui lòng kiểm tra cấu hình VAPID, subscription hoặc nội dung payload.");
  }
}

// Đọc subscription từ file
try {
  const pushSubscription = JSON.parse(fs.readFileSync("subscription.json", "utf8"));
  sendNotification(pushSubscription);
} catch (err) {
  console.error("Lỗi khi đọc tệp subscription.json:", err.message);
  console.error("Hãy chắc chắn rằng tệp subscription.json tồn tại và có định dạng hợp lệ.");
}
