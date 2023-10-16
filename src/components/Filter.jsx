import { useRef } from 'react';
import {statusOptions,typeOptions,sortOptions,}
from '../constants';
import { filterByStatus,filterByType,handleSearch,sortState,handleClear,}
from '../redux/jobSlice';
import { useDispatch } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();

  const inputRef = useRef();

  //   Runs every time input changes
  const handleChange = (e) => {
    dispatch(handleSearch(e.target.value));
  };

  //  Runs whenever the status value changes
  const handleStatusChange = (e) => {
    dispatch(filterByStatus(e.target.value));
  };

  // Runs whenever type value changes
  const handleTypeChange = (e) => {
    dispatch(filterByType(e.target.value));
  };

  //It runs whenever the sort value changes.
  const handleSortChange = (e) => {
    dispatch(sortState(e.target.value));
  };

  // It works when you click on the Clear button.
  const handleClick = (e) => {
    e.preventDefault();
    // Cleaning the inside of the input.
    inputRef.current.value = '';
    //  cleaning (action) works
    dispatch(handleClear());
  };

  return (
    <section className="filter-select">
      <h2>Filtering Form</h2>
      <form>
        <div className="input-field">
          <label>SEARCH</label>
          <input
            ref={inputRef}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label>State</label>
          <select onChange={handleStatusChange}>
            <option selected hidden>
              SELECT STATE
            </option>
            {statusOptions.map((opt) => (
              <option value={opt.label}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="input-field">
          <label>TYPE</label>
          <select onChange={handleTypeChange}>
            {typeOptions.map((opt) => (
              <option value={opt.label}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="input-field">
          <label>Sort By</label>
          <select onChange={handleSortChange}>
            {sortOptions.map((opt) => (
              <option value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <button onClick={handleClick}>
        Clear Filters
        </button>
      </form>
    </section>
  );
};

export default Filter;