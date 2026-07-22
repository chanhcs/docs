import Link from "next/link";
import Navbar from "./navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex h-screen items-center justify-center">
        <Link href='/documents/123'>
          <span className="text-blue-500 underline">Link go to document</span>
        </Link>
      </div>
    </div>
  )
}

export default Home;