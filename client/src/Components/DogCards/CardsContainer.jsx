import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPageAction } from "../../Store/Actions";
import DogCard from "./DogCard";

export default function CardContainer() {
  const allDogs = useSelector((state) => state.filteredDogs);
  const dispatch = useDispatch();

  
  const renderCards = (data) => {
    return (
      <>
        {allDogs.length > 0 ? (
          data.map((doggie) => {
            return (
              <div key={doggie.id}>
                <DogCard
                  id={doggie.id}
                  name={doggie.name}
                  image={doggie.image}
                  temperaments={doggie.temperaments}
                  weight={doggie.weight}
                />
              </div>
            );
          })
        ) : (
          <div className="loading">Loading...</div>
        )}
      </>
    );
  };
  ///////////////////// PAGINATION ////////////////
  // const [currentPage, setCurrentPage] = useState(1);
  let currentPage = useSelector(state=>state.currentPage);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [pageNumberLimit, setpageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const pages = [];
  for (let i = 1; i < Math.ceil(allDogs.length / itemsPerPage) + 1; i++) {
    pages.push(i);
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allDogs.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          className={currentPage === number ? "active" : null}
          key={number}
          id={number}
          onClick={handlePageClick}
        >
          {number}
        </li>
      );
    } else return null;
  });
  function handlePageClick(e) {
    dispatch(setCurrentPageAction(Number(e.target.id)));
  }
  function handlePrevClick(e) {
    dispatch(setCurrentPageAction(currentPage - 1));
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  }
  function handleNextClick(e) {
    e.preventDefault();
    dispatch(setCurrentPageAction(currentPage + 1));

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  }

 

  /////////////////////////////////////////////////
  return (
      <div className="container-sup">
        <div className="card-container">{renderCards(currentItems)}</div>
        <ul className="pageNumbers">
          {currentPage > 1 && (
            <>
              <li onClick={handlePrevClick}>Prev</li>
              {maxPageNumberLimit > pageNumberLimit && (
                <li onClick={handlePrevClick}>&hellip;</li>
              )}
            </>
          )}
          {renderPageNumbers}

          {currentPage < pages.length && (
            <>
              {maxPageNumberLimit < pages.length && (
                <li onClick={handleNextClick}>&hellip;</li>
              )}
              <li onClick={handleNextClick}>Next</li>
            </>
          )}
        </ul>
      </div>
      
  );
}
