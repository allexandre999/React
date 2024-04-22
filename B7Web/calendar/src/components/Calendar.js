import React, { useState } from 'react';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(selectedDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setSelectedDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(selectedDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setSelectedDate(nextMonth);
  };

  const renderCalendar = () => {
    const days = [];
    const totalDays = daysInMonth(selectedDate);
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    let dayCounter = 1;

    for (let i = 0; i < 6; i++) { // Renderizando 6 linhas, mesmo que nem todas sejam necessárias
      const week = [];
      for (let j = 0; j < 7; j++) { // Renderizando 7 dias por semana
        if ((i === 0 && j < firstDayOfMonth) || dayCounter > totalDays) {
          week.push(<div key={`${i}-${j}`} className="empty-cell"></div>);
        } else {
          const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), dayCounter);
          week.push(
            <div key={`${i}-${j}`} className={`day p-2 rounded-full text-center ${currentDate.toDateString() === selectedDate.toDateString() ? 'bg-blue-500 text-white' : ''}`}>
              {dayCounter}
            </div>
          );
          dayCounter++;
        }
      }
      days.push(<div key={`week-${i}`} className="week flex justify-between">{week}</div>);
    }

    return days;
  };

  return (
    <div className="calendar p-4 bg-gray-100">
      <div className="header flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="px-2 py-1 bg-blue-500 text-white rounded">Prev</button>
        <h2 className="text-lg font-bold">{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={handleNextMonth} className="px-2 py-1 bg-blue-500 text-white rounded">Next</button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        <div className="text-center">Sun</div>
        <div className="text-center">Mon</div>
        <div className="text-center">Tue</div>
        <div className="text-center">Wed</div>
        <div className="text-center">Thu</div>
        <div className="text-center">Fri</div>
        <div className="text-center">Sat</div>
      </div>
      <div className="days mt-2">{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;
