import Styles from "./SkillDetail.module.css";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  fetchSkillsByIds,
  selectActualSkillById,
} from "@/store/features/skillSlice";
import { useEffect } from "react";
import { fetchJobsByIds } from "@/store/features/jobsEntitySlice";
import PageTitle from "@/components/utilities/PageTitle";
import PageLeftContainer from "@/components/utilities/PageLeftContainer";
import PageRightContainer from "@/components/utilities/PageRightContainer";
import RelatedLink from "@/components/utilities/RelatedLink";
import RelatedCard from "@/components/utilities/RelatedCard";

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
      <PageTitle isLoading={!skill}>{skill?.attributes?.name}</PageTitle>

      <div className={Styles.container}>

        <PageLeftContainer containerTitle="Related jobs:">
          {skill?.relationships?.jobs?.map((jobId) => (
            <RelatedCard dataId={jobId} forSkillOrJob="job" />
          ))}
        </PageLeftContainer>


        <PageRightContainer containerTitle="Related Skills:">
          {skill?.relationships?.skills?.map((skillId) => (
            <RelatedLink to={`/skill/${skillId}`} selectDataById={skillId} />
          ))}
        </PageRightContainer>

      </div>
    </div>
  );
}
