import { Link } from "react-router-dom";
import Styles from "./JobCard.module.css";
import SkillItem from "../SkillItem";
import { memo } from "react";

type TProps = {
  title: string;
  id: string;
  skillsId: string[];
  type: string;
};

export default memo(function JobCard({ title, skillsId, id }: TProps) {
  return (
    <div id={id} className={Styles.container}>
      <h3 className={Styles.title}>{title}</h3>
      <p className={Styles["related-skills_title"]}>Related skills:</p>
      <div className={Styles["related-skills_container"]}>
        {skillsId.map((SingleSkillId) => (
          <SkillItem key={SingleSkillId} skillId={SingleSkillId} />
        ))}
      </div>
      <Link to={`/job/${id}`} className={Styles.btn}>
        view job detail
      </Link>
    </div>
  );
});
