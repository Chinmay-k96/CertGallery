import React, { useCallback, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { certArray } from "./certficateList";
import { setCertImg, setFilteredCerts } from "./stateReducer";

const SearchBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [wordEntered, setWordEntered] = useState("");

  const filteredData = useMemo(() => {
    return wordEntered
      ? certArray.filter((value) => {
          return value.name.toLowerCase().includes(wordEntered.toLowerCase());
        })
      : [];
  }, [wordEntered]);

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
    dispatch(setCertImg(value.path));
    setWordEntered("");
    setInputValue("");
  };

  return (
    <div className="search-wrapper">
      <div className="searchbox">
        <input
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e?.target?.value);
            debouncedHandleFilter(e);
          }}
        />
        {!wordEntered ? (
          <i id="glass" className="fas fa-thin fa-magnifying-glass"></i>
        ) : (
          <i id="cross" className="fa-solid fa-xmark" onClick={clearInput}></i>
        )}
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <div
                key={key}
                className="dataItem"
                onClick={() => handleSearchClick(value)}
              >
                {value.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default React.memo(SearchBox);
