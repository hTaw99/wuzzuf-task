import Styles from "./Search.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect } from "react";
import { fetchSearchedJobs } from "@/store/features/searchSlice";
import JobCard from "../JobCard";
import Skeleton from "../JobCard/Skeleton";
import NotFoundIcon from "@/assets/icons/NotFoundIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import ErrorIcon from "@/assets/icons/ErrorIcon";
import { useDispatch } from "react-redux";
import { fetchSkillsByIds } from "@/store/features/skillSlice";

type TProps = {
  debouncedValue: string | null;
};

export default function SearchResult({ debouncedValue }: TProps) {
  const { searchResultJobs, status, error, queryKeyword } = useAppSelector(
    (state) => state.search
  );
  const { statusForMultipleSkills } = useAppSelector((state) => state.skill);
  const dispatch = useDispatch();

  const uniqueSkillsArr = searchResultJobs
    .flatMap((job) => job.skillsId)
    .reduce((acc: string[], currentValue) => {
      if (!acc.find((el) => el === currentValue)) {
        acc.push(currentValue);
      }

      return acc;
    }, []);
  console.log({ searchResultJobs });

  useEffect(() => {
    if (
      searchResultJobs?.length !== 0 &&
      status === "success" &&
      statusForMultipleSkills === "idle"
    ) {
      dispatch(fetchSkillsByIds(uniqueSkillsArr));
    }
  }, [uniqueSkillsArr, status, statusForMultipleSkills]);

  return searchResultJobs?.length === 0 || queryKeyword?.length < 3 ? (
    queryKeyword?.length > 3 ? (
      <div
        style={{
          //   backgroundColor: "red",
          display: "flex",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: "16px" }}>
          <NotFoundIcon size={150} />
        </div>
        <h2
          style={{
            color: "rgba(0,0,0,1)",
            fontSize: "32px",
            fontWeight: "600",
            marginBottom: "16px",
          }}
        >
          No result found
        </h2>
        <p
          style={{
            color: "rgba(0,0,0,0.5)",
            fontSize: " 20px",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          we couldn't find what you are looking for
        </p>
      </div>
    ) : (
      <>
        <div
          style={{
            //   backgroundColor: "red",
            display: "flex",
            height: "100%",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <SearchIcon size={100} strokeColor="rgba(0,0,0,0.2)" />
          <h1 style={{ color: "rgba(0,0,0,0.5)", fontWeight: "500" }}>
            Start typing to search for jobs
          </h1>
        </div>
      </>
    )
  ) : (
    <div className={Styles["jobs_container"]}>
      {searchResultJobs?.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );

  // if (searchResultJobs?.length !== 0 && queryKeyword?.length >= 3) {
  //   return (
  //     <div className={Styles["jobs_container"]}>
  //       {searchResultJobs?.length !== 0 ? (
  //         searchResultJobs?.map((job) => <JobCard key={job.id} {...job} />)
  //       ) : (
  //         <div
  //           style={{
  //             //   backgroundColor: "red",
  //             display: "flex",
  //             height: "100%",
  //             flexDirection: "column",
  //             alignItems: "center",
  //           }}
  //         >
  //           <div style={{ marginBottom: "16px" }}>
  //             <NotFoundIcon size={150} />
  //           </div>
  //           <h2
  //             style={{
  //               color: "rgba(0,0,0,1)",
  //               fontSize: "32px",
  //               fontWeight: "600",
  //               marginBottom: "16px",
  //             }}
  //           >
  //             No result found
  //           </h2>
  //           <p
  //             style={{
  //               color: "rgba(0,0,0,0.5)",
  //               fontSize: " 20px",
  //               fontWeight: "500",
  //               textAlign: "center",
  //             }}
  //           >
  //             we couldn't find what you are looking for
  //           </p>
  //         </div>
  //       )}
  //     </div>
  //   );
  // } else if (queryKeyword?.length < 3) {
  //   return (
  //     <div
  //       style={{
  //         //   backgroundColor: "red",
  //         display: "flex",
  //         height: "100%",
  //         flexDirection: "column",
  //         alignItems: "center",
  //         gap: 24,
  //       }}
  //     >
  //       <SearchIcon size={100} strokeColor="rgba(0,0,0,0.2)" />
  //       <h1 style={{ color: "rgba(0,0,0,0.5)", fontWeight: "500" }}>
  //         Start typing to search for jobs
  //       </h1>
  //     </div>
  //   );
  // } else {
  //   <h1>not found</h1>;
  // }
  // else if (status === "loading") {
  //   return (
  //     <div className={Styles["jobs_container"]}>
  //       {[1, 1, 1].map((_, i) => (
  //         <Skeleton key={i} />
  //       ))}
  //     </div>
  //   );
  // } else if (status === "failed") {
  //   return (
  //     <div
  //       style={{
  //         //   backgroundColor: "red",
  //         display: "flex",
  //         height: "100%",
  //         flexDirection: "column",
  //         alignItems: "center",
  //       }}
  //     >
  //       <div style={{ marginBottom: "16px" }}>
  //         <ErrorIcon size={150} />
  //       </div>
  //       <h2
  //         style={{
  //           color: "rgba(0,0,0,1)",
  //           fontSize: "32px",
  //           fontWeight: "600",
  //           marginBottom: "16px",
  //         }}
  //       >
  //         {error as string}
  //       </h2>
  //       <p
  //         style={{
  //           color: "rgba(0,0,0,0.5)",
  //           fontSize: " 20px",
  //           fontWeight: "500",
  //           textAlign: "center",
  //         }}
  //       >
  //         JobSearch has encountered an error. If this proplem persists, contact
  //         us at help@getpostman.com
  //       </p>
  //     </div>
  //   );
  // } else if (status === "idle") {
  //   return (
  //     <div
  //       style={{
  //         //   backgroundColor: "red",
  //         display: "flex",
  //         height: "100%",
  //         flexDirection: "column",
  //         alignItems: "center",
  //         gap: 24,
  //       }}
  //     >
  //       <SearchIcon size={100} strokeColor="rgba(0,0,0,0.2)" />
  //       <h1 style={{ color: "rgba(0,0,0,0.5)", fontWeight: "500" }}>
  //         Start typing to search for jobs
  //       </h1>
  //     </div>
  //   );
  // }
}
// return <h1>search page</h1>;
// }
{
  /* <div
        style={{
          //   backgroundColor: "red",
          display: "flex",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: "32px" }}>
          <NotFoundIcon size={150} />
        </div>
        <h2
          style={{
            color: "rgba(0,0,0,1)",
            fontSize: "32px",
            fontWeight: "600",
            marginBottom: "16px",
          }}
        >
          {error}
        </h2>
        <p
          style={{
            color: "rgba(0,0,0,0.5)",
            fontSize: " 20px",
            fontWeight: "500",
          }}
        >
          we couldn't find what you are looking for
        </p>
      </div> */
}
