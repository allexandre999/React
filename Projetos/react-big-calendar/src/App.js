import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/pt-br'; // Importe o idioma português do Moment
import dayjs from 'dayjs';
import { DatePicker, Select, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/pt_BR';

const localizer = momentLocalizer(moment);

function App() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    start: new Date(),
    end: new Date(),
    userName: '',
    duration: 0,
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
      start: dayjs().hour(8).startOf('hour').toDate(),
      end: dayjs().hour(8).startOf('hour').add(1, 'hour').toDate(),
      userName: '',
      duration: 0,
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
        userName: event.userName,
        duration: dayjs(event.end).diff(dayjs(event.start), 'minutes'),
      });
    },
    [setIsFormOpen, setIsEditing, setFormData]
  );

  const handleDateTimeChange = (time, field) => {
    if (!time) return;
    setFormData({
      ...formData,
      [field]: time.toDate(),
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.start || !formData.end || !formData.userName) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const updatedEvents = updateEvents(formData);
    setEvents(updatedEvents);
    setIsFormOpen(false);
    setIsEditing(false);
    setFormData({
      id: null,
      start: '',
      end: '',
      userName: '',
      duration: 0,
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
      userName: '',
      duration: 0,
    });
  };

  const handleDeleteEvent = (eventId) => {
    const filteredEvents = events.filter((event) => event.id !== eventId);
    setEvents(filteredEvents);
    setIsFormOpen(false);
  };

  const eventTitle = ({ userName, start, end }) => {
    const formattedStart = dayjs(start).format('HH:mm');
    const formattedEnd = dayjs(end).format('HH:mm');
    return `${userName} - ${formattedStart} - ${formattedEnd}`;
  };

  const disabledMinutes = () => [5, 10, 25, 35, 40, 45, 50, 55]; 

  const disabledTime = (time) => {
    const hour = time.hour();
    return {
      disabledHours: () => {
        const disabled = [];
        for (let i = 0; i < 8; i++) {
          disabled.push(i);
        }
        for (let i = 19; i < 24; i++) {
          disabled.push(i);
        }
        return disabled;
      },
      disabledMinutes: () => disabledMinutes(),
    };
  };

  const updateEvents = (formData) => {
    const editedEvent = {
      id: formData.id,
      start: dayjs(formData.start).toDate(),
      end: dayjs(formData.end).toDate(),
      userName: formData.userName,
    };

    const eventsArray = [];
    const start = dayjs(editedEvent.start);
    const end = dayjs(editedEvent.end);

    let current = start.clone();
    while (current.isBefore(end)) {
      const nextEnd = current.clone().add(formData.duration, 'minutes');
      if (current.hour() >= 8 && current.hour() < 18) {
        eventsArray.push({
          id: eventsArray.length + 1,
          start: current.toDate(),
          end: nextEnd.toDate(),
          userName: editedEvent.userName,
        });
      }
      current = nextEnd;
    }

    return isEditing
      ? events.map((event) => (event.id === formData.id ? { ...editedEvent } : event))
      : [...events, ...eventsArray];
  };

  return (
    <div>
      <Calendar
        events={events}
        localizer={localizer}
        toolbar={true}
        messages={{
          today: 'Hoje',
          previous: 'Anterior',
          next: 'Próximo',
          month: 'Mês',
          week: 'Semana',
          day: 'Dia',
        }}
        defaultView="month"
        startAccessor="start"
        endAccessor="end"
        min={new Date().setHours(8, 0, 0)}
        max={new Date().setHours(18, 0, 0)}
        formats={{
          timeGutterFormat: 'HH:mm',
          eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
            `${localizer.format(start, 'HH:mm', culture)} - ${localizer.format(end, 'HH:mm', culture)}`,
          dayFormat: 'DD/MM/YYYY',
          dayHeaderFormat: 'dddd, DD/MM',
          monthHeaderFormat: 'MMMM YYYY',
          dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
            `${localizer.format(start, 'DD/MM/YYYY', culture)} - ${localizer.format(end, 'DD/MM/YYYY', culture)}`,
          agendaDateFormat: 'DD/MM/YYYY',
          agendaTimeFormat: 'HH:mm',
          agendaTimeRangeFormat: ({ start, end }, culture, localizer) =>
            `${localizer.format(start, 'HH:mm', culture)} - ${localizer.format(end, 'HH:mm', culture)}`,
        }}
        defaultDate={new Date()}
        onSelectEvent={onSelectEvent}
        onSelectSlot={handleSlotClick}
        selectable
        style={{ height: 500 }}
        components={{
          event: ({ event }) => <div>{eventTitle(event)}</div>,
        }}
      />
      {isFormOpen && (
        <form onSubmit={handleFormSubmit}>
          <label>
            Nome do usuário:
            <Input
              style={{
                width: 120,
              }}
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Início:
            <DatePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              locale={locale}
              minuteStep={5}
              value={moment(formData.start)}
              onChange={(time) => handleDateTimeChange(time, 'start')}
              disabledTime={disabledTime}
              needConfirm={false}
            />
          </label>
          <label>
            Fim:
            <DatePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              locale={locale}
              minuteStep={5}
              value={moment(formData.end)}
              onChange={(time) => handleDateTimeChange(time, 'end')}
              disabledTime={disabledTime}
              needConfirm={false}
            />
          </label>
          {!isEditing && (
            <Select
              defaultValue="60"
              style={{
                width: 120,
              }}
              onChange={(value) => setFormData({ ...formData, duration: value !== '0' ? parseInt(value) : 0 })}
              options={[
                {
                  value: '60',
                  label: '60',
                },
                {
                  value: '15',
                  label: '15',
                },
                {
                  value: '20',
                  label: '20',
                },
                {
                  value: '30',
                  label: '30',
                },
              ]}
            />
          )}
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
          <Button type="default" onClick={handleCloseForm}>
            Cancelar
          </Button>
          {isEditing && (
            <Button type="primary" onClick={() => handleDeleteEvent(formData.id)} danger>
              Excluir
            </Button>
          )}
        </form>
      )}
    </div>
  );
}

export default App;
