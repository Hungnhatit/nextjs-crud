export const metadata = {
  title: "Blog list",
  description: "Blog list description"
}

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Tất cả những file nằm trong thư mục blog sẽ được render vào phần ở giữa */}
      {children}
    </>
  );
}
