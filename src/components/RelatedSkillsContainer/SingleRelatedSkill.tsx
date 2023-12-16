import { useAppSelector } from "@/hooks/hooks";
import { selectActualSkillById } from "@/store/features/skillSlice";
import { Link } from "react-router-dom";

type TSingleRelatedSkillProp = {
  skillId: string;
};

export default function SingleRelatedSkill({
  skillId,
}: TSingleRelatedSkillProp) {
  const skill = useAppSelector((state) =>
    selectActualSkillById(state, skillId)
  );

  return (
    <Link
      to={`/skill/${skillId}`}
      style={{
        marginBottom: 8,
        listStyle: "inside",
        display: "block",
        textDecoration: "underline",
      }}
    >
      {skill?.attributes?.name}
    </Link>
  );
}
