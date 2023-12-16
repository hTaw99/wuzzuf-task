import Styles from "./PageTitle.module.css";
import { ReactNode } from "react";

type TPageTitleProp = {
  isLoading: boolean;
  children: ReactNode;
};

export default function PageTitle({ isLoading, children }: TPageTitleProp) {
  return isLoading ? (
    <div className={Styles.page_title_skeleton} />
  ) : (
    <h1 className={Styles.title}>{children}</h1>
  );
}
