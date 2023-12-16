import Styles from "./Skeleton.module.css";

export default function Skeleton() {
  return (
    <div className={`${Styles.container} ${Styles.backgroundColorAnimation}`}>
      <h3 className={`${Styles.title} ${Styles.backgroundColorAnimation}`} />
      <div
        className={`${Styles.importance_container} `}
      >
        {[1, 1, 1].map((_, i) => (
          <p  className={`${Styles.importance} ${Styles.backgroundColorAnimation}`} key={i} style={{ fontWeight: "700" }} />
        ))}
      </div>
    </div>
  );
}
