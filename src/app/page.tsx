// Trang chủ
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hungnhatit",
  description: "This is my description",
}

export default function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link href={"/admin"}>Admin</Link>
        </li>
        <li>
          <Link href={"/instagram"}>Instagram</Link>
        </li>
        <li>
          <Link href={"/facebook"}>Facebook</Link>
        </li>
      </ul>

    </div>


  );
}
