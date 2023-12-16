import { Link } from "react-router-dom";
import Styles from "./SkillItem.module.css";
import { useAppSelector } from "@/hooks/hooks";
import { selectActualSkillById } from "@/store/features/skillSlice";
import Skeleton from "./Skeleton";

export default function SkillItem({ skillId }: { skillId: string }) {
  // const { statusForSkills } = useAppSelector((state) => state.skill);
  const skill = useAppSelector((state) =>
    selectActualSkillById(state, skillId)
  );

  if (skill) {
    return (
      <Link to={`/skill/${skillId}`} className={Styles.container}>
        <span>{skill?.attributes.name}</span>
      </Link>
    );
  } else {
    return <Skeleton />;
  }
}
