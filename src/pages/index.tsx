import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <h4 className="bg-red-500 p-3">Home page</h4>
    </main>
  );
}
