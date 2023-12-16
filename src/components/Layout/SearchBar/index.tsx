import SearchIcon from "@/assets/icons/SearchIcon";
import Styles from "./Searchbar.module.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect } from "react";
import SuggestionList from "@/components/SuggestionList";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  clearSuggestion,
  closeSuggestionList,
  fetchSearchedJobs,
  openSuggestionList,
  setQueryKeyword,
} from "@/store/features/searchSlice";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import useDebounce from "@/hooks/useDebounce";

export default function Searchbar() {
  const { isSuggestionListOpen, queryKeyword } = useAppSelector(
    (state) => state.search
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const listRef = useOutsideClick(
    () => dispatch(closeSuggestionList()),
    isSuggestionListOpen
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQueryKeyword(e.target.value));
    if (!isSuggestionListOpen) {
      dispatch(openSuggestionList());
    }
    if (queryKeyword?.length === 3 && location.pathname !== "/jobs/search") {
      navigate(`/jobs/search?query=${queryKeyword}`, {
        replace: true,
      });
    }
  };

  const handleOnFocus = () => {
    if (!isSuggestionListOpen) {
      dispatch(openSuggestionList());
    }
  };

  useEffect(() => {
    if (queryKeyword === "" && location.pathname !== "/") {
      dispatch(closeSuggestionList());
      navigate(`/`, {
        replace: true,
      });
    }
  }, [queryKeyword]);

  return (
    <div className={Styles["search-bar"]}>
      <div className={`${Styles.search_container} container`}>
        <div ref={listRef} className={Styles.input_suggestion_container}>
          <div className={Styles["input_container"]}>
            <input
              onChange={handleOnChange}
              onFocus={handleOnFocus}
              className={Styles["input"]}
              value={(queryKeyword as string) || undefined}
              type="text"
              placeholder="search keyword"
            />

            <SearchIcon />
          </div>

          <SuggestionList />
        </div>
      </div>
    </div>
  );
}
