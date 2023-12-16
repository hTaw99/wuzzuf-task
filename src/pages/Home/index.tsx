import Styles from "./Home.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchAllJobs, selectAllJobs } from "@/store/features/jobsEntitySlice";
import { useEffect } from "react";
import JobCardsContainer from "@/components/JobCardsContainer";
import Skeleton from "@/components/JobCard/Skeleton";
import { fetchSkillsByIds } from "@/store/features/skillSlice";
import { useIntersectionOvserver } from "@/hooks/useIntersectionObserver";

export default function HomePage() {
  // ---------------------- Selectors --------------------------------
  const { statusForAllJobs, error, meta } = useAppSelector(
    (state) => state.jobsEntity
  );
  const { statusForMultipleSkills, uniqueSkillsIds } = useAppSelector(
    (state) => state.skill
  );
  const jobs = useAppSelector(selectAllJobs);

  // ---------------------- Dispatch --------------------------------
  const dispatch = useAppDispatch();

  const { limit, cursor } = useIntersectionOvserver({ meta, jobs });

  // -------------------------------------------------------------------
  useEffect(() => {
    dispatch(fetchAllJobs({ limit, cursor }));
  }, [dispatch, limit, cursor]);

  useEffect(() => {
    if (statusForAllJobs === "success" && statusForMultipleSkills === "idle") {
      dispatch(fetchSkillsByIds(uniqueSkillsIds));
    }
  }, [dispatch, statusForAllJobs, statusForMultipleSkills, uniqueSkillsIds]);
  // -------------------------------------------------------------------

  let content;

  !jobs
    ? (content = (
        <>
          <h1 className={Styles.title}>All Jobs</h1>
          <div
            style={{
              display: " grid",
              gap: "32px",
              gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
              marginBottom: "64px",
            }}
          >
            {[1, 1, 1, 1, 1].map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        </>
      ))
    : jobs
    ? (content = (
        <div>
          <h1 className={Styles.title}>All Jobs ({jobs.length})</h1>
          <JobCardsContainer />
        </div>
      ))
    : error
    ? (content = <h1>{"error as string"}</h1>)
    : undefined;

  return content;
}
