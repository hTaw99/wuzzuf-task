import { Link } from "react-router-dom";
import Styles from "./RelatedLink.module.css";
import { useAppSelector } from "@/hooks/hooks";
import { selectActualSkillById } from "@/store/features/skillSlice";

type TStaticProp = {
  to: string;
};

type TRelatedLinkConditionalProps =
  | {
      title?: string;
      selectDataById?: never;
    }
  | {
      title?: never;
      selectDataById?: string;
    };

export default function RelatedLink({
  to,
  title,
  selectDataById,
}: TStaticProp & TRelatedLinkConditionalProps) {
  const skill = useAppSelector((state) =>
    selectActualSkillById(state, selectDataById as string)
  );
  return (
    <Link to={to} className={Styles.link}>
      {selectDataById ? skill?.attributes?.name : title}
    </Link>
  );
}
