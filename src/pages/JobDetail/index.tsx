import Styles from "./JobDetail.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  fetchJobsByIds,
  selectJobById,
} from "@/store/features/jobsEntitySlice";
import { fetchSkillsByIds } from "@/store/features/skillSlice";
import { setAsViewedJob } from "@/store/features/searchSlice";
import PageTitle from "@/components/utilities/PageTitle";
import PageLeftContainer from "@/components/utilities/PageLeftContainer";
import PageRightContainer from "@/components/utilities/PageRightContainer";
import RelatedCard from "@/components/utilities/RelatedCard";

export default function JobDetailPage() {
  const { id } = useParams();

  // ---------------------- Selectors --------------------------------
  const job = useAppSelector((state) => selectJobById(state, id as string));
  const { statusForSingleJob } = useAppSelector((state) => state.jobsEntity);
  const { statusForMultipleSkills } = useAppSelector((state) => state.skill);

  // ---------------------- Dispatch --------------------------------
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchJobsByIds([id as string]));
  }, [dispatch, id]);

  useEffect(() => {
    if (
      statusForSingleJob === "success" &&
      statusForMultipleSkills === "idle"
    ) {
      dispatch(fetchSkillsByIds(job?.skillsId ?? []));
    }
  }, [dispatch, statusForSingleJob, statusForMultipleSkills, job?.skillsId]);

  useEffect(() => {
    if (job) {
      dispatch(
        setAsViewedJob({
          ...job,
        })
      );
    }
  });

  return (
    <div>
      <PageTitle isLoading={Boolean(!job)}>{job?.title}</PageTitle>

      <div className={Styles.container}>
        <PageLeftContainer containerTitle="Related Skills:">
          {job?.skillsId?.map((skillId) => (
            <RelatedCard forSkillOrJob="skill" dataId={skillId} />
            // <RelatedSkillCard skillId={skillId} />
          ))}
        </PageLeftContainer>
        <PageRightContainer containerTitle="Related Jobs:" />
      </div>
    </div>
  );
}
