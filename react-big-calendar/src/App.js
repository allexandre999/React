import { Calendar, momentLocalizer,dayjsLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css"
//import moment from 'moment'
import dayjs from "dayjs"

//const localizer = momentLocalizer(moment)


function App() {
  const localizer2 = dayjsLocalizer(dayjs)

  const myEventsList = [
    {
      start: dayjs('2024-04-11T12:00:00').toDate(),
      end: dayjs('2024-04-12T12:00:00').toDate(),
      title: "Prof Augusto"
    },
    {
      start: dayjs('2024-04-12T12:00:00').toDate(),
      end: dayjs('2024-04-13T12:00:00').toDate(),
      title: "Prof Gustavo"
    },
  ]


  return (
  <div>
    <Calendar
      localizer={localizer2}
      events={myEventsList}
      views={["month","week","day","agenda"]}
      toolbar={true}
      //min={dayjs().toDate()}
      max={dayjs().toDate()}
      defaultView="month"
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
  );


  
}

export default App;
