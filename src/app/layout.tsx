'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "@/components/NavBar/NavBar";
import Container from "react-bootstrap/Container";
import { Inter } from 'next/font/google'
import AppFooter from '@/components/app.footer';
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar></NavBar>
        <Container>
          {children}
        </Container>
        <AppFooter></AppFooter>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"

        />
      </body>
    </html>
  );
}
