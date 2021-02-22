import React from 'react';
import calendarStyles from '../../styles/components/event-calendar.module.scss';

const EventCalendar = () => {
  return (
    <div className={calendarStyles.root}>
      <h1>ΘT Event Calendar</h1>
      <div className={calendarStyles.responsive__calendar}>
        <iframe
          title="tt-calendar"
          src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FLos_Angeles&amp;src=c2pzdS5lZHVfZzFpYTJsYzZmYmVnMGxyNTdvaDlsM2Q2ZzhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%233F51B5&amp;showTitle=0&amp;showNav=0&amp;showDate=1&amp;showPrint=0&amp;showCalendars=0&amp;mode=MONTH"
          style={{ borderWidth: '0' }}
          frameBorder="0"
          scrolling="no"
        />
      </div>
    </div>
  );
};

export default EventCalendar;
