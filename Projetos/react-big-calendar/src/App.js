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
  const [nextId, setNextId] = useState(1); // Estado para controlar o próximo ID disponível
  const [selectedEventId, setSelectedEventId] = useState(null);
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
      id: nextId, // Usar o próximo ID disponível ao criar um novo evento
      start: dayjs().hour(8).startOf('hour').toDate(),
      end: dayjs().hour(8).startOf('hour').add(1, 'hour').toDate(),
      userName: '',
      duration: 0,
    });
    setNextId(nextId + 1); // Incrementar o próximo ID disponível
  }, [nextId]);

  const onSelectEvent = useCallback(
    (event) => {
      if (event && event.id) {
        setSelectedEventId(event.id);
        setIsFormOpen(true);
        setIsEditing(true);
        setFormData({
          ...event,
          duration: dayjs(event.end).diff(dayjs(event.start), 'minutes'),
        });
      }
    },
    [setSelectedEventId, setIsFormOpen, setIsEditing, setFormData]
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
  
    const updatedEvents = [...events, ...createFragmentedEvents(formData)];
    setEvents(updatedEvents);
    setIsFormOpen(false);
    setFormData({
      id: null,
      start: '',
      end: '',
      userName: '',
      duration: 0,
    });
  };
  
  
  const handleEditSubmit = (e) => {
    e.preventDefault();
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

  const handleEditEvent = () => {
    console.log("Editar evento chamado");
    setIsFormOpen(true);
    setIsEditing(true);
  
    // Encontrar o evento selecionado para edição
    const selectedEventIndex = events.findIndex(event => event.id === selectedEventId);
    
    if (selectedEventIndex !== -1) {
      const updatedEvents = [...events];
      updatedEvents[selectedEventIndex] = formData;
      setEvents(updatedEvents);
    }
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

  const handleDeleteEvent = () => {
    if (!selectedEventId) {
      console.log("Nenhum evento selecionado para exclusão.");
      return;
    }
  
    const selectedEventIndex = events.findIndex(event => event.id === selectedEventId);
    if (selectedEventIndex === -1) {
      console.log("Evento selecionado não encontrado.");
      return;
    }
  
    const updatedEvents = [...events];
    updatedEvents.splice(selectedEventIndex, 1);
    setEvents(updatedEvents);
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

    const updatedEvents = events.map((event) =>
      event.id === formData.id ? { ...editedEvent } : event
    );

    return updatedEvents;
  };

  const createFragmentedEvents = (formData) => {
    const start = dayjs(formData.start);
    const end = dayjs(formData.end);
    const duration = formData.duration;
    const userName = formData.userName;

    const eventsArray = [];
    let currentId = nextId; // Usar uma variável temporária para armazenar o próximo ID

    let current = start.clone();
    while (current.isBefore(end)) {
      const nextEnd = current.clone().add(duration, 'minutes');
      if (current.hour() >= 8 && current.hour() < 18) {
        eventsArray.push({
          id: currentId,
          start: current.toDate(),
          end: nextEnd.toDate(),
          userName: userName,
        });
        currentId++; // Incrementar o próximo ID disponível
      }
      current = nextEnd;
    }

    return eventsArray;
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
        style={{ height: 800 }}
        components={{
          event: ({ event }) => <div>{eventTitle(event)}</div>,
        }}
      />
      {isFormOpen && (
        <form onSubmit={isEditing ? handleEditSubmit : handleFormSubmit}>
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
          {!isEditing ? (
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          ) : (
            <Button type="primary" onClick={handleEditEvent}>
              Editar
            </Button>
          )}
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
