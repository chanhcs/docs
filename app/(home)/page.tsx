"use client"

import { usePaginatedQuery } from "convex/react";
import Navbar from "./navbar";
import TemplatesGallery from "./templates-gallery";
import { api } from "@/convex/_generated/api";
import DocumentsTable from "./documents-table";

const Home = () => {

  const { results, status, loadMore } = usePaginatedQuery(api.documents.get, {}, { initialNumItems: 5 })

  return (
    <div>
      <Navbar />
      <TemplatesGallery />
      <DocumentsTable
        documents={results}
        loadMore={loadMore}
        status={status}
      />
    </div>
  )
}

export default Home;