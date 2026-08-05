"use client"

import { usePaginatedQuery } from "convex/react";
import Navbar from "./navbar";
import TemplatesGallery from "./templates-gallery";
import { api } from "@/convex/_generated/api";
import DocumentsTable from "./documents-table";
import { useSearchParam } from "@/hooks/use-search-params";

const PAGE_SIZE = 5;

const Home = () => {
  const [search] = useSearchParam("result")

  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.get,
    { search },
    { initialNumItems: PAGE_SIZE + 1 }
  )

  const documents = status === "Exhausted" ? results : results.slice(0, -1);

  return (
    <div>
      <Navbar />
      <TemplatesGallery />
      <DocumentsTable
        documents={documents}
        loadMore={() => loadMore(PAGE_SIZE + 1)}
        status={status}
      />
    </div>
  )
}

export default Home;