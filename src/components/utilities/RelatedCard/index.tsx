import Skeleton from "@/components/RelatedSkillCard/Skeleton";
import Styles from "./RelatedCard.module.css";
import { useAppSelector } from "@/hooks/hooks";
import { selectActualSkillById } from "@/store/features/skillSlice";
import { selectJobById } from "@/store/features/jobsEntitySlice";

type TRelatedCardProp = {
  dataId: string;
  forSkillOrJob: "skill" | "job";
};

export default function RelatedCard({
  forSkillOrJob,
  dataId,
}: TRelatedCardProp) {
  const job = useAppSelector((state) => selectJobById(state, dataId));
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

  if (!job || !skill) {
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
