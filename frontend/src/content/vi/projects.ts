// Completed projects for /projects. Titles, figures, photos and FAQ text are taken from the owner's existing site
// (https://www.phuanlift.com/vi/du-an); the site gives no further detail per project, so none is added here.

import type { Faq, Project } from "../types";

const IMG = "/images/projects";

export const projects: Project[] = [
  {
    slug: "benh-vien-nhi-quang-ngai",
    name: "Bệnh viện Nhi Quảng Ngãi",
    image: `${IMG}/benh-vien-nhi-quang-ngai.jpg`,
    facts: [
      { label: "Loại", value: "Thang tải hàng" },
      { label: "Tải trọng", value: "300 kg" },
      { label: "Điểm dừng", value: "5" },
    ],
  },
  {
    slug: "saigon-precision-kcx-linh-trung",
    name: "Saigon Precision KCX Linh Trung",
    image: `${IMG}/saigon-precision.jpg`,
    facts: [{ label: "Tải trọng", value: "5000 kg" }],
  },
  {
    slug: "maple-nha-trang",
    name: "Maple Nha Trang",
    image: `${IMG}/maple-nha-trang.jpg`,
    facts: [
      { label: "Tải trọng", value: "450 kg" },
      { label: "Điểm dừng", value: "27" },
    ],
  },
  {
    slug: "nha-may-coca-cola",
    name: "Nhà máy Coca-Cola",
    image: `${IMG}/coca-cola.jpg`,
    facts: [],
  },
];

export const faqs: Faq[] = [
  {
    q: "Thang máy cần bảo dưỡng như thế nào và tần suất bảo dưỡng là bao lâu một lần?",
    a: "Để đảm bảo an toàn và hiệu suất hoạt động, thang máy cần được bảo dưỡng định kỳ. Tần suất bảo dưỡng thường là mỗi 6 tháng hoặc 1 năm tùy thuộc vào mức độ sử dụng và yêu cầu của nhà sản xuất.",
  },
  {
    q: "Thang máy có thể lắp đặt trong các tòa nhà cũ không?",
    a: "Có, thang máy hiện đại có thể được thiết kế và lắp đặt linh hoạt để phù hợp với các tòa nhà cũ, thậm chí là các không gian hạn chế. Các nhà sản xuất thang máy thường cung cấp các giải pháp tùy chỉnh để đáp ứng nhu cầu cụ thể của từng dự án.",
  },
  {
    q: "Thang máy có an toàn không khi mất điện?",
    a: "Đa số thang máy hiện đại được trang bị hệ thống dự phòng như pin dự phòng hoặc máy phát điện tự động để đảm bảo an toàn cho hành khách trong trường hợp mất điện. Hệ thống an toàn này sẽ giúp thang máy dừng lại ở tầng an toàn gần nhất và mở cửa để hành khách có thể thoát ra an toàn.",
  },
  {
    q: "Thang máy tiết kiệm năng lượng như thế nào?",
    a: "Công nghệ thang máy hiện đại đã phát triển các tính năng tiết kiệm năng lượng như hệ thống tái sử dụng năng lượng khi điều chỉnh tải trọng, hệ thống đèn LED tiết kiệm điện, và hệ thống hẹn giờ để giảm tiêu thụ năng lượng khi không sử dụng.",
  },
  {
    q: "Thang máy có thể được tùy chỉnh để phục vụ nhu cầu đặc biệt của người khuyết tật không?",
    a: "Có, các nhà sản xuất thang máy thường cung cấp các giải pháp tùy chỉnh như thang máy có kích thước lớn hơn, nút điều khiển dễ sử dụng, và hệ thống cảm biến để phục vụ tốt hơn cho người khuyết tật.",
  },
  {
    q: "Thang máy có thể tích hợp với các công nghệ thông minh như thế nào?",
    a: "Thang máy ngày nay thường có khả năng tích hợp với các công nghệ thông minh như hệ thống điều khiển bằng giọng nói, hệ thống quản lý từ xa thông qua ứng dụng di động, và tích hợp trí tuệ nhân tạo để tối ưu hóa hiệu suất vận hành và dự đoán hỏng hóc sớm.",
  },
];
