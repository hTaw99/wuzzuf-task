import Styles from "./Search.module.css";
import { useAppSelector } from "@/hooks/hooks";
import SearchResult from "@/components/SearchResult";
import PageTitle from "@/components/utilities/PageTitle";
import PageRightContainer from "@/components/utilities/PageRightContainer";
import RelatedLink from "@/components/utilities/RelatedLink";

export default function SearchPage() {
  const { queryKeyword, status } = useAppSelector((state) => state.search);
  const { searchResultJobs } = useAppSelector((state) => state.search);
  const { searchHistory } = useAppSelector((state) => state.search);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ---------------- Title Page ------------------ */}
      <PageTitle isLoading={Boolean(status === "loading")}>
        “{queryKeyword}” jobs (
        {queryKeyword!.length >= 3 ? searchResultJobs?.length : 0})
      </PageTitle>

      {/* ---------------- Container ------------------ */}
      <div className={Styles.container}>
        <SearchResult />

        <PageRightContainer containerTitle="History">
          {searchHistory?.map((job) => (
            <RelatedLink to={`/job/${job?.id}`} title={job?.title} />
          ))}
        </PageRightContainer>
      </div>
    </div>
  );
}
