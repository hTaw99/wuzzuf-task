import Styles from "./RelatedSkillCard.module.css";
import { useAppSelector } from "@/hooks/hooks";
import { selectActualSkillById } from "@/store/features/skillSlice";
import Skeleton from "./Skeleton";
import { memo } from "react";

type TRelatedSkillCardProp = {
  skillId: string;
};

export default memo(function RelatedSkillCard({
  skillId,
}: TRelatedSkillCardProp) {
  const skill = useAppSelector((state) =>
    selectActualSkillById(state, skillId)
  );

  const details = [
    {
      name: "type",
      data: skill?.attributes?.type,
    },
    {
      name: "importance",
      data: skill?.attributes?.type,
    },
    {
      name: "level",
      data: skill?.attributes?.level,
    },
  ];

  if (skill) {
    return (
      <div className={Styles.container}>
        <h3 className={Styles.title}>{skill?.attributes?.name}</h3>

        <div className={Styles.importance_container}>
          {details.map((el) => (
            <p style={{ fontWeight: "700", textTransform: "capitalize" }}>
              {el.name}: <span style={{ fontWeight: "400" }}>{el.data}</span>
            </p>
          ))}
        </div>
      </div>
    );
  } else {
    return <Skeleton />;
  }
});
