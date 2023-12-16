import Styles from "./skeleton.module.css";

export default function Skeleton() {
  return (
    <div className={`${Styles.container} `}>
      <div className={`${Styles.title} ${Styles.backgroundColorAnimation}`} />
      <p
        className={`${Styles["related-skills_title"]} ${Styles.backgroundColorAnimation}`}
      />
      <div className={`${Styles["related-skills_container"]}`}>
        {Array.from({ length: 3 }, () => (
          <div
            className={`${Styles["skills"]} ${Styles.backgroundColorAnimation}`}
          />
        ))}
      </div>
      <div className={`${Styles.btn} ${Styles.backgroundColorAnimation}`} />
    </div>
  );
}
