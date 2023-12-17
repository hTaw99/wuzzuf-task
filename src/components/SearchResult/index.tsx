import Styles from "./Search.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect } from "react";
import JobCard from "../JobCard";
import NotFoundIcon from "@/assets/icons/NotFoundIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import { fetchSkillsByIds } from "@/store/features/skillSlice";

export default function SearchResult() {
  const { searchResultJobs, status, queryKeyword } = useAppSelector(
    (state) => state.search
  );
  const { statusForMultipleSkills } = useAppSelector((state) => state.skill);
  const dispatch = useAppDispatch();

  const uniqueSkillsArr = searchResultJobs
    .flatMap((job) => job.skillsId)
    .reduce((acc: string[], currentValue) => {
      if (!acc.find((el) => el === currentValue)) {
        acc.push(currentValue);
      }

      return acc;
    }, []);

  useEffect(() => {
    if (
      searchResultJobs?.length !== 0 &&
      status === "success" &&
      statusForMultipleSkills === "idle"
    ) {
      dispatch(fetchSkillsByIds(uniqueSkillsArr));
    }
  }, [
    dispatch,
    uniqueSkillsArr,
    status,
    searchResultJobs?.length,
    statusForMultipleSkills,
  ]);

  return searchResultJobs?.length === 0 || queryKeyword?.length < 3 ? (
    queryKeyword?.length > 3 ? (
      <div
        style={{
          //   backgroundColor: "red",
          display: "flex",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: "16px" }}>
          <NotFoundIcon size={150} />
        </div>
        <h2
          style={{
            color: "rgba(0,0,0,1)",
            fontSize: "32px",
            fontWeight: "600",
            marginBottom: "16px",
          }}
        >
          No result found
        </h2>
        <p
          style={{
            color: "rgba(0,0,0,0.5)",
            fontSize: " 20px",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          we couldn't find what you are looking for
        </p>
      </div>
    ) : (
      <>
        <div
          style={{
            //   backgroundColor: "red",
            display: "flex",
            height: "100%",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <SearchIcon size={100} strokeColor="rgba(0,0,0,0.2)" />
          <h1 style={{ color: "rgba(0,0,0,0.5)", fontWeight: "500" }}>
            Start typing to search for jobs
          </h1>
        </div>
      </>
    )
  ) : (
    <div className={Styles["jobs_container"]}>
      {searchResultJobs?.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
}
