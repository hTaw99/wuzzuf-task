import { ReactNode } from "react";
import Styles from "./PageLeftContainer.module.css";

type TPageLeftContainerProp = {
  containerTitle: string;
  children: ReactNode;
};

export default function PageLeftContainer({
  children,
  containerTitle,
}: TPageLeftContainerProp) {
  return (
    <div className={Styles.left_container}>
      <h2 className={Styles.title}>{containerTitle}</h2>
      <div>{children}</div>
    </div>
  );
}
