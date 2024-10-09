export const metadata = {
  title: "View detail blog",
  description: "Blog list description"
}

export default function ViewDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>

      {children}
    </>
  );
}
