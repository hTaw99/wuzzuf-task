import Styles from "./JobCardsContainer.module.css";
import JobCard from "../JobCard";
import { useAppSelector } from "@/hooks/hooks";
import { selectAllJobs } from "@/store/features/jobsEntitySlice";
import { memo } from "react";

export default memo(function JobCardsContainer() {
  const jobs = useAppSelector(selectAllJobs);
  const { statusForAllJobs } = useAppSelector((state) => state.jobsEntity);

  return (
    <>
      <div className={Styles.jobs_container}>
        {jobs?.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
      {statusForAllJobs === "loading" && <h1>Loading...</h1>}
    </>
  );
});
