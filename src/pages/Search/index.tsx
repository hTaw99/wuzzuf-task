import Styles from "./Search.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import useDebounce from "@/hooks/useDebounce";
import SearchResult from "@/components/SearchResult";
import History from "@/components/History";
import { useSearchParams } from "react-router-dom";

// import { useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const { queryKeyword } = useAppSelector((state) => state.search);
  // const [searchParams, setSearchParams] = useSearchParams();
  // const dispatch = useAppDispatch();

  const debouncedValue = useDebounce(queryKeyword, 700);

  // useEffect(() => {
  //   if (debouncedValue && debouncedValue?.length >= 3) {
  //     dispatch(fetchSearchedJobs(debouncedValue as string));
  //   }
  // }, [debouncedValue]);

  const { searchResultJobs } = useAppSelector((state) => state.search);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ---------------- Title Page ------------------ */}
      <h1 className={Styles.title}>
        “{queryKeyword}” jobs (
        {queryKeyword?.length >= 3 ? searchResultJobs?.length : 0})
      </h1>

      {/* ---------------- Container ------------------ */}
      <div className={Styles.container}>
        <SearchResult debouncedValue={debouncedValue} />
        <History />
      </div>
    </div>
  );
}
