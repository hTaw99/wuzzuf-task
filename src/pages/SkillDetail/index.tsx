import Styles from "./SkillDetail.module.css";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  fetchSkillsByIds,
  selectActualSkillById,
} from "@/store/features/skillSlice";
import { useEffect } from "react";
import RelatedJobCard from "@/components/RelatedJobCard";
import { fetchJobsByIds } from "@/store/features/jobsEntitySlice";
import RelatedSkillsContainer from "@/components/RelatedSkillsContainer";
import PageTitle from "@/components/utilities/PageTitle";
import PageLeftContainer from "@/components/utilities/PageLeftContainer";
import PageRightContainer from "@/components/utilities/PageRightContainer";

export default function SkillDetailPage() {
  const { id } = useParams();

  // ---------------------- Selectors --------------------------------
  const skill = useAppSelector((state) =>
    selectActualSkillById(state, id as string)
  );
  const { statusForSingleSkill } = useAppSelector((state) => state.skill);
  const { statusForMultipleJobs } = useAppSelector((state) => state.jobsEntity);

  // ---------------------- Dispatch --------------------------------
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSkillsByIds([id as string]));
  }, [dispatch, id]);

  useEffect(() => {
    if (
      statusForSingleSkill === "success" &&
      statusForMultipleJobs === "idle"
    ) {
      dispatch(fetchJobsByIds(skill?.relationships?.jobs ?? []));
    }
  }, [
    dispatch,
    statusForSingleSkill,
    skill?.relationships?.jobs,
    statusForMultipleJobs,
  ]);

  useEffect(() => {
    if (statusForSingleSkill === "success") {
      dispatch(fetchSkillsByIds(skill?.relationships?.skills ?? []));
    }
  }, [dispatch, statusForSingleSkill, skill?.relationships?.skills]);

  return (
    <div>
      <PageTitle isLoading={statusForSingleSkill === "loading"}>
        {skill?.attributes?.name}
      </PageTitle>

      <div className={Styles.container}>
        <PageLeftContainer containerTitle="Related jobs:">
          {skill?.relationships?.jobs?.map((job) => (
            <RelatedJobCard key={job} jobId={job} />
          ))}
        </PageLeftContainer>

        <PageRightContainer containerTitle="Related Skills:">
          <RelatedSkillsContainer skillIdsArr={skill?.relationships?.skills} />
        </PageRightContainer>
      </div>
    </div>
  );
}
