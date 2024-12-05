import React, { useCallback, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { THEME_ALTERNATE } from "../shared/constants";
import { setCertObject } from "../shared/stateReducer";

const SearchBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [wordEntered, setWordEntered] = useState("");

  const { filteredCerts } = useSelector(store => store.cert);

  const filteredData = useMemo(() => {
    return wordEntered
      ? filteredCerts.filter((value) => {
          return value?.filename?.toLowerCase().includes(wordEntered.toLowerCase());
        })
      : [];
  }, [wordEntered, filteredCerts]);

  const dispatch = useDispatch();

  const debounce = (func) => {
    let timer;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(this, args);
      }, 500);
    };
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
  };

  const debouncedHandleFilter = useCallback(debounce(handleFilter), []);

  const clearInput = () => {
    setWordEntered("");
    setInputValue("");
  };

  const handleSearchClick = (value) => {
    dispatch(setCertObject(value));
    setWordEntered("");
    setInputValue("");
  };

  return (
    <div className="pr-10">
      <label className="input input-bordered flex items-center gap-2 w-[34rem] h-[4rem]">
        <input
          type="text"
          className="grow text-xl/8 text-[1.5rem]"
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e?.target?.value);
            debouncedHandleFilter(e);
          }}
        />
        {!wordEntered ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-8 w-8 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <i id="cross" className="fa-solid fa-xmark" onClick={clearInput}></i>
        )}
      </label>
      {filteredData.length !== 0 && (
        <div className="dataResult w-[34rem] bg-base-200" data-theme={THEME_ALTERNATE}>
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <div
                key={value?.filename}
                className="dataItem hover:bg-base-300"
                onClick={() => handleSearchClick(value)}
              >
                {value.filename}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default React.memo(SearchBox);
