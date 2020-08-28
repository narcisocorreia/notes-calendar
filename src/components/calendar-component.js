import React from "react";
import ReactCalendar from "react-calendar";
import styled from "styled-components";

import "react-calendar/dist/Calendar.css";

const CalendarComponet = styled(ReactCalendar)`
  width: 40%;
  height: 50%;
  border-radius: 3%;
  margin-top: 3rem;
`;
function Calendar(prop) {
  return <CalendarComponet onChange={prop.onChange} value={prop.date} />;
}
export default Calendar;
