import SearchIcon from "@/assets/icons/SearchIcon";
import Styles from "./SuggestionList.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  closeSuggestionList,
  fetchSearchedJobs,
  setQueryKeyword,
} from "@/store/features/searchSlice";
import { createPortal } from "react-dom";
import { renderHighlightedText } from "@/utilities/renderHighlightedText.tsx";
import useDebounce from "@/hooks/useDebounce";
import { memo, useEffect } from "react";
import { Link } from "react-router-dom";

export default memo(function SuggestionList() {
  const {
    isSuggestionListOpen,
    queryKeyword,
    searchResultJobs,
    searchHistory,
  } = useAppSelector((state) => state.search);

  // const filteredSuggestions = suggestion.filter((title) =>
  //   title?.toLowerCase().includes(queryKeyword?.toLowerCase())
  // );

  const dispatch = useAppDispatch();

  const debounceValue = useDebounce(queryKeyword, 700);

  useEffect(() => {
    if (debounceValue && debounceValue.length >= 3) {
      dispatch(fetchSearchedJobs({ query: debounceValue }));
    }
  }, [debounceValue]);

  //   return (
  //     <>
  //       {isSuggestionListOpen && (
  //         <div className={Styles.container}>
  //           {!queryKeyword && searchHistory.length !== 0 ? (
  //             <>
  //               <span
  //                 style={{
  //                   marginBottom: "16px",
  //                   display: "block",
  //                   color: "rgba(0,0,0,0.5)",
  //                 }}
  //               >
  //                 Your search history
  //               </span>
  //               <ul>
  //                 {searchHistory.map((el: string, i) => (
  //                   <li
  //                     onClick={() => {
  //                       dispatch(setQueryKeyword("as"));
  //                       dispatch(closeSuggestionList());
  //                     }}
  //                     key={i}
  //                     className={Styles.list_item_history}
  //                   >
  //                     <SearchIcon size={16} strokeColor="black" />
  //                     <span>past history</span>
  //                   </li>
  //                 ))}
  //               </ul>
  //             </>
  //           ) : (
  //             <ul>
  //               {filteredSuggestions.map((jobTitle, i) => (
  //                 <li
  //                   onClick={() => {
  //                     dispatch(setQueryKeyword(jobTitle));
  //                     dispatch(closeSuggestionList());
  //                   }}
  //                   key={i}
  //                   className={Styles.list_item}
  //                 >
  //                   <SearchIcon size={22} strokeColor="black" />
  //                   <span>{renderHighlightedText(jobTitle, queryKeyword)}</span>
  //                 </li>
  //               ))}
  //             </ul>
  //           )}
  //         </div>
  //       )}
  //       {createPortal(
  //         <div
  //           className={` ${
  //             isSuggestionListOpen
  //               ? Styles.overlay
  //               : `${Styles.overlay} ${Styles.hidden}`
  //           }`}
  //         />,
  //         document.body
  //       )}
  //     </>
  //   );
  // }
  return (
    <>
      {isSuggestionListOpen && (
        <div className={Styles.container}>
          <ul>
            {searchResultJobs.length === 0 || queryKeyword?.length < 3 ? (
              queryKeyword?.length > 3 ? (
                <h3>Not found result</h3>
              ) : (
                <>
                  <p style={{ marginBottom: "16px", color: "rgba(0,0,0,0.5)" }}>
                    Recently Previewed Jobs
                  </p>
                  <ul>
                    {searchHistory.map((job) => (
                      <Link
                        to={`/job/${job.id}`}
                        className={Styles.list_item}
                        style={{
                          fontSize: "16px",
                        }}
                      >
                        <SearchIcon size={18} strokeColor="black" />
                        {job?.title}
                      </Link>
                    ))}
                  </ul>
                </>
              )
            ) : (
              searchResultJobs?.slice(1, 10).map((job, i) => (
                <Link
                  to={`/job/${job.id}`}
                  onClick={() => {
                    dispatch(setQueryKeyword(job.title));
                    dispatch(closeSuggestionList());
                  }}
                  key={i}
                  className={Styles.list_item}
                >
                  <SearchIcon size={22} strokeColor="black" />
                  <span>{renderHighlightedText(job.title, queryKeyword)}</span>
                </Link>
              ))
            )}
          </ul>
        </div>
      )}
      {createPortal(
        <div
          className={` ${
            isSuggestionListOpen
              ? Styles.overlay
              : `${Styles.overlay} ${Styles.hidden}`
          }`}
        />,
        document.body
      )}
    </>
  );
});
