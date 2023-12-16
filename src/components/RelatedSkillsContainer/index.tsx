import SingleRelatedSkill from "./SingleRelatedSkill";

type TRelatedSkillsContainerProp = {
  skillIdsArr: string[];
};

export default function RelatedSkillsContainer({
  skillIdsArr,
}: TRelatedSkillsContainerProp) {
  return (
    <ul>
      {skillIdsArr?.map((skillId) => (
        <SingleRelatedSkill key={skillId} skillId={skillId} />
      ))}
    </ul>
  );
}
