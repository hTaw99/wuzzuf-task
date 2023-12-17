import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchAllJobs, selectAllJobs } from "@/store/features/jobsEntitySlice";
import {  useEffect } from "react";
import JobCardsContainer from "@/components/JobCardsContainer";
import Skeleton from "@/components/JobCard/Skeleton";
import { fetchSkillsByIds } from "@/store/features/skillSlice";
import { useIntersectionOvserver } from "@/hooks/useIntersectionObserver";
import PageTitle from "@/components/utilities/PageTitle";
import Error from "@/components/utilities/Error";

export default function HomePage() {
  // ---------------------- Selectors --------------------------------
  const { statusForAllJobs, error, meta } = useAppSelector(
    (state) => state.jobsEntity
  );

  console.log({ error });
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

  return (
    <>
      <PageTitle
        isLoading={Boolean(jobs.length === 0 && statusForAllJobs === "loading")}
      >
        All Jobs ({jobs.length})
      </PageTitle>
      {error && statusForAllJobs !== "loading" && (
        <Error title={error as string} />
      )}
      {jobs.length === 0 && statusForAllJobs === "loading" && (
        <div
          style={{
            display: " grid",
            gap: "32px",
            gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
            marginBottom: "64px",
          }}
        >
          {[1, 1, 1, 1, 1, 1].map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      )}
      {jobs && <JobCardsContainer />}
    </>
  );
}
