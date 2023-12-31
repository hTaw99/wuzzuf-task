import Styles from "./RelatedCard.module.css";
import Skeleton from "./Skeleton";
import { useAppSelector } from "@/hooks/hooks";
import { selectActualSkillById, selectRelatedJobById } from "@/store/features/skillSlice";
// import { selectJobById } from "@/store/features/jobsEntitySlice";

type TRelatedCardProp = {
  dataId: string;
  forSkillOrJob: "skill" | "job";
};

export default function RelatedCard({
  forSkillOrJob,
  dataId,
}: TRelatedCardProp) {
  const job = useAppSelector((state) => selectRelatedJobById(state, dataId));
  const { statusForSingleJob } = useAppSelector((state) => state.jobsEntity);
  const { statusForSingleSkill } = useAppSelector((state) => state.skill);
  const skill = useAppSelector((state) => selectActualSkillById(state, dataId));

  //   const data = useAppSelector((state) => {
  //     if (forSkillOrJob === "job") {
  //       return selectJobById(state, dataId);
  //     } else {
  //       return selectActualSkillById(state, dataId);
  //     }
  //   });

  const details = [
    {
      name: "type",
      data: forSkillOrJob === "job" ? "job" : skill?.attributes?.type,
    },
    {
      name: "importance",
      data: forSkillOrJob === "job" ? 2 : skill?.attributes?.importance,
    },
    {
      name: "level",
      data: forSkillOrJob === "job" ? 2 : skill?.attributes?.level,
    },
  ];

  if (
    forSkillOrJob === "job"
      ? statusForSingleSkill === "loading" || !job
      : statusForSingleJob === "loading" || !skill
  ) {
    return <Skeleton />;
  } else {
    return (
      <div className={Styles.container}>
        <h3 className={Styles.title}>
          {forSkillOrJob === "job" ? job.title : skill?.attributes?.name}
        </h3>
        <div className={Styles.importance_container}>
          {details.map((el) => (
            <p style={{ fontWeight: "700", textTransform: "capitalize" }}>
              {el.name}: <span style={{ fontWeight: "400" }}>{el.data}</span>
            </p>
          ))}
        </div>
      </div>
    );
  }
}
