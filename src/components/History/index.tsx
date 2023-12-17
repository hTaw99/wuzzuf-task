import { useAppSelector } from "@/hooks/hooks";
import Styles from "./History.module.css";
import { Link } from "react-router-dom";

export default function History() {
  const { searchHistory } = useAppSelector((state) => state.search);
  return (
    <div className={Styles["history_container"]}>
      <h2 style={{ marginBottom: "16px" }}>History:</h2>
      <ul style={{}}>
        {searchHistory?.map((job) => (
          <Link
            to={`/job/${job.id}`}
            style={{
              marginBottom: 8,
              listStyle: "inside",
              display: "block",
              textDecoration: "underline",
            }}
          >
            {job?.title}
          </Link>
        ))}
      </ul>
    </div>
  );
}
