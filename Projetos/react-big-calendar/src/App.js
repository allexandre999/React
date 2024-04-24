import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import dayjs from 'dayjs';

const localizer = momentLocalizer(moment);

function App() {
  const [events, setEvents] = useState([
    {
      id: 1,
      start: new Date(),
      end: new Date(moment().add(1, 'days')),
      title: 'Example Event',
    },
    {
      id: 2,
      start: dayjs('2024-04-11T12:00:00').toDate(),
      end: dayjs('2024-04-12T12:00:00').toDate(),
      title: 'Prof Augusto',
    },
    {
      id: 3,
      start: dayjs('2024-04-12T12:00:00').toDate(),
      end: dayjs('2024-04-13T12:00:00').toDate(),
      title: 'Prof Gustavo',
    },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    start: '',
    end: '',
    title: '',
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const clickRef = useRef(null);

  useEffect(() => {
    return () => {
      window.clearTimeout(clickRef?.current);
    };
  }, []);

  const handleSlotClick = useCallback(() => {
    setIsFormOpen(true);
    setIsEditing(false);
    setFormData({
      id: null,
      start: '',
      end: '',
      title: '',
    });
  }, []);

  const onSelectEvent = useCallback(
    (event) => {
      setIsFormOpen(true);
      setIsEditing(true);
      setFormData({
        id: event.id,
        start: event.start,
        end: event.end,
        title: event.title,
      });
    },
    [setIsFormOpen, setIsEditing, setFormData]
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const editedEvent = {
      id: formData.id,
      start: formData.start,
      end: formData.end,
      title: formData.title,
    };

    let updatedEvents;
    if (isEditing) {
      updatedEvents = events.map((existingEvent) =>
        existingEvent.id === editedEvent.id ? editedEvent : existingEvent
      );
    } else {
      editedEvent.id = events.length + 1; // Novo ID para o novo evento
      updatedEvents = [...events, editedEvent];
    }

    setEvents(updatedEvents);
    setIsFormOpen(false);
    setIsEditing(false);
    setFormData({
      id: null,
      start: '',
      end: '',
      title: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setIsEditing(false);
    setFormData({
      id: null,
      start: '',
      end: '',
      title: '',
    });
  };

  return (
    <div>
      <Calendar
        events={events}
        localizer={localizer}
        toolbar={true}
        defaultView="month"
        startAccessor="start"
        max={dayjs().toDate()}
        defaultDate={new Date()}
        onSelectEvent={onSelectEvent}
        onSelectSlot={handleSlotClick}
        selectable
        style={{ height: 500 }}
      />
      {isFormOpen && (
        <form onSubmit={handleFormSubmit}>
          <label>
            Título:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Início:
            <input
              type="datetime-local"
              name="start"
              value={formData.start}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Fim:
            <input
              type="datetime-local"
              name="end"
              value={formData.end}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Salvar</button>
          <button type="button" onClick={handleCloseForm}>
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
