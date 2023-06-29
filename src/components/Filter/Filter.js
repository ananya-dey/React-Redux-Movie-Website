import React, { useEffect, useState } from "react";
import "./Filter.scss";
import moment from "moment";
import { useDispatch } from "react-redux";
import { fetchAllMovies } from "../../features/Movies/MovieSlice";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";

const Filter = () => {
  const dispatch = useDispatch();
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  });

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const dateData = {
        page_no: 1,
        from_date: moment(selectedDayRange.from)
          .subtract(1, "months")
          .format("YYYY-MM-DD"),
        to_date: moment(selectedDayRange.to)
          .subtract(1, "months")
          .format("YYYY-MM-DD"),
      };
      dispatch(fetchAllMovies(dateData));
    }
  }, [dispatch, selectedDayRange.from, selectedDayRange.to]);
  return (
    <div className="date_picker_section">
      <DatePicker
        value={selectedDayRange}
        onChange={setSelectedDayRange}
        inputPlaceholder="Select a day range"
        shouldHighlightWeekends
      />
    </div>
  );
};

export default Filter;
