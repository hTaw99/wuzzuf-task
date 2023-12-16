import { useAppSelector } from "@/hooks/hooks";
import Styles from "./RelatedJobCard.module.css";
import { selectJobById } from "@/store/features/jobsEntitySlice";

export default function RelatedJobCard({ jobId }: { jobId: string }) {
  const job = useAppSelector((state) => selectJobById(state, jobId));
  return (
    <div className={Styles.container}>
      <h3 className={Styles.title}>{job?.title}</h3>
      <div className={Styles["importance_container"]}>
        <h2 style={{ fontSize: "16px" }}>
          Importance: <span style={{ fontWeight: 400 }}>2</span>
        </h2>
        <h2 style={{ fontSize: "16px" }}>
          Level: <span style={{ fontWeight: 400 }}>2</span>
        </h2>
      </div>
    </div>
  );
}
