import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { certArray } from "./certficateList";
import { setCertImg, setFilteredCerts } from "./stateReducer";

const SearchBox = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const dispatch = useDispatch();

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    
    setWordEntered(searchWord);
    
    const newFilter = certArray.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
      dispatch(setFilteredCerts(certArray))
    } else {
      setFilteredData(newFilter);
      dispatch(setFilteredCerts(newFilter))
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    dispatch(setFilteredCerts(certArray))
    setWordEntered("");
  };

  const handleSearchClick = (value) => {
    dispatch(setCertImg(value.path))
    setFilteredData([]);
  };

  return (
    <div className="search-wrapper">
      <div className="searchbox">
        <input
          type="text"
          placeholder="Search..."
          value={wordEntered}
          onChange={handleFilter}
        />
        {!wordEntered ? <i id="glass" className="fas fa-thin fa-magnifying-glass"></i>: <i id='cross' className="fa-solid fa-xmark" onClick={clearInput}></i>}
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <div key={key} className="dataItem" onClick={()=>handleSearchClick(value)}>{value.name}</div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default React.memo(SearchBox);
