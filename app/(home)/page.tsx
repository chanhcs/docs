"use client"

import { useQuery } from "convex/react";
import Navbar from "./navbar";
import TemplatesGallery from "./templates-gallery";
import { api } from "@/convex/_generated/api";

const Home = () => {
  const documents = useQuery(api.documents.get)
  return (
    <div>
      <Navbar />
      <div className="mt-6">
        <TemplatesGallery />
        {documents?.map(document => (
          <span key={document._id}>{document.title}</span>
        ))}
      </div>
    </div>
  )
}

export default Home;