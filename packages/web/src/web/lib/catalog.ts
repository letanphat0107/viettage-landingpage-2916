export const products = [
  {
    slug: "tieu-den",
    name: "Tiêu đen nguyên hạt",
    category: "Tiêu & ớt",
    flavor: "Nồng ấm · Dậy hương",
    size: "100 g",
    color: "#273f2c",
    kind: "jar",
    dishes: ["Món kho", "Món nướng"],
    description:
      "Một chút tiêu, một tầng hương. Ý tưởng sản phẩm dành cho những món kho đậm vị và món nướng thơm nồng.",
  },
  {
    slug: "nuoc-mam",
    name: "Nước mắm nguyên bản",
    category: "Nước mắm",
    flavor: "Đậm đà · Tròn vị",
    size: "250 ml",
    color: "#78503a",
    kind: "bottle",
    dishes: ["Món kho", "Món chấm"],
    description:
      "Ý tưởng dòng nước mắm cho bữa cơm Việt: nêm món kho, pha nước chấm và làm nền hương vị.",
  },
  {
    slug: "ot-bot",
    name: "Ớt bột chọn lọc",
    category: "Tiêu & ớt",
    flavor: "Cay dịu · Sắc màu",
    size: "100 g",
    color: "#9a3b27",
    kind: "jar",
    dishes: ["Món nướng", "Món xào"],
    description:
      "Sắc đỏ ấm và điểm nhấn cay cho các món xào, món nướng. Độ cay và thành phần sẽ được cập nhật theo SKU chính thức.",
  },
  {
    slug: "sot-uop",
    name: "Sốt ướp đậm vị Việt",
    category: "Sốt & hạt nêm",
    flavor: "Thơm lừng · Hài hòa",
    size: "200 g",
    color: "#817443",
    kind: "pouch",
    dishes: ["Món nướng", "Món xào"],
    description:
      "Ý tưởng hỗn hợp gia vị ướp giúp chuẩn bị bữa ăn thuận tiện hơn. Hướng dẫn dùng chính thức cần được kiểm chứng.",
  },
  {
    slug: "hat-nem",
    name: "Hạt nêm rau củ",
    category: "Sốt & hạt nêm",
    flavor: "Thanh nhẹ · Dịu vị",
    size: "200 g",
    color: "#527142",
    kind: "pouch",
    dishes: ["Món canh", "Món xào"],
    description:
      "Ý tưởng gia vị nêm cho món canh và món xào. Chưa xác nhận công thức, thành phần hoặc tuyên bố dinh dưỡng.",
  },
];
export const recipes = [
  {
    slug: "thit-kho",
    name: "Thịt kho, vị nhà thương nhớ",
    type: "Món kho",
    time: 60,
    image: "/images/pork.jpg",
    spices: ["nuoc-mam", "tieu-den"],
    intro: "Một nồi thịt kho ấm áp, dành cho bữa cơm sum vầy. Công thức minh họa cho 2–3 người.",
    ingredients: [
      "400 g thịt ba chỉ",
      "3 quả trứng luộc",
      "300 ml nước dừa",
      "1–2 thìa canh nước mắm, điều chỉnh theo độ mặn",
      "Hành tím, tiêu, đường theo khẩu vị",
    ],
    steps: [
      "Cắt thịt miếng vừa ăn, sơ chế sạch và để ráo.",
      "Ướp thịt với hành tím và một phần nước mắm khoảng 15 phút.",
      "Thắng đường nhẹ thành màu caramel, đảo thịt, thêm nước dừa.",
      "Kho nhỏ lửa khoảng 35–45 phút đến khi thịt chín mềm. Thêm trứng, nêm lại và rắc tiêu.",
    ],
  },
  {
    slug: "rau-cu-nuong",
    name: "Rau củ nướng, sắc vị tự nhiên",
    type: "Món nướng",
    time: 30,
    image: "/images/spice-light.jpg",
    spices: ["ot-bot", "sot-uop"],
    intro: "Ý tưởng kết hợp rau củ với gia vị cay ấm. Ảnh gia vị minh họa, không phải ảnh món ăn.",
    ingredients: [
      "400 g rau củ tùy chọn",
      "1 thìa canh dầu ăn",
      "Ớt bột, tiêu và muối tùy khẩu vị",
    ],
    steps: [
      "Làm nóng lò 200°C.",
      "Cắt rau củ thành miếng đều nhau, trộn dầu và gia vị.",
      "Nướng khoảng 20–25 phút, đảo giữa chừng và kiểm tra độ chín.",
    ],
  },
  {
    slug: "sot-cham",
    name: "Chén nước chấm, tròn vị bữa cơm",
    type: "Món chấm",
    time: 10,
    image: "/images/spices.jpg",
    spices: ["nuoc-mam", "ot-bot"],
    intro: "Công thức nền để bạn điều chỉnh theo món ăn. Ảnh gia vị minh họa.",
    ingredients: [
      "1 phần nước mắm",
      "1 phần đường",
      "1 phần nước cốt chanh",
      "3 phần nước lọc",
      "Tỏi và ớt theo khẩu vị",
    ],
    steps: [
      "Hòa tan đường trong nước lọc.",
      "Thêm nước mắm và chanh từng ít một.",
      "Thêm tỏi, ớt rồi nếm lại để điều chỉnh độ chua, mặn, ngọt.",
    ],
  },
];
export const nav = [
  ["/san-pham", "Sản phẩm"],
  ["/cau-chuyen", "Câu chuyện Viettage"],
  ["/cong-thuc", "Góc ẩm thực"],
  ["/diem-ban", "Điểm bán"],
] as const;
export function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .toLowerCase();
}
