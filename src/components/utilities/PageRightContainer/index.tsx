import { ReactNode } from "react";
import Styles from "./PageRightContainer.module.css";

type TPageRightContainerProp = {
  containerTitle: string;
  children?: ReactNode;
};

export default function PageRightContainer({
  children,
  containerTitle,
}: TPageRightContainerProp) {
  return (
    <div className={Styles.right_container}>
      <h2 className={Styles.title}>{containerTitle}</h2>
      <ul>{children}</ul>
    </div>
  );
}
