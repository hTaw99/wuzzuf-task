import Styles from "./Skeleton.module.css";

export default function Skeleton() {
  return (
    <div className={`${Styles["related-skills_container"]}`}>
      <div
        className={`${Styles["skills"]} ${Styles.backgroundColorAnimation}`}
      />
    </div>
  );
}
