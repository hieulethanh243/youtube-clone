/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "i.ytimg.com", // thumbnails video
      "yt3.ggpht.com", // (nếu dùng avatar kênh)
      "ui-avatars.com", // avatar fallback (tạo từ tên kênh)
    ],
  },
};

module.exports = nextConfig;
