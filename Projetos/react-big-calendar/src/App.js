import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/pt-br'; // Importe o idioma português do Moment
import dayjs from 'dayjs';

const localizer = momentLocalizer(moment);

function App() {
  const [events, setEvents] = useState([]);
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

  // Função auxiliar para dividir um evento em intervalos de 20 minutos
  const divideEventBy20Minutes = (event) => {
    const eventsArray = [];
    const start = dayjs(event.start);
    const end = dayjs(event.end);

    let current = start.clone();
    while (current.isBefore(end)) {
      const nextEnd = current.clone().add(20, 'minutes');
      eventsArray.push({
        id: eventsArray.length + 1,
        start: current.toDate(),
        end: nextEnd.toDate(),
        title: event.title,
      });
      current = nextEnd;
    }

    return eventsArray;
  };

  // Função para atualizar os eventos após editar ou adicionar um evento
  const updateEvents = (formData) => {
    const editedEvent = {
      id: formData.id,
      start: dayjs(formData.start).toDate(),
      end: dayjs(formData.end).toDate(),
      title: formData.title,
    };

    const eventsArray = [];
    const start = dayjs(editedEvent.start);
    const end = dayjs(editedEvent.end);

    let current = start.clone();
    while (current.isBefore(end)) {
      const nextEnd = current.clone().add(20, 'minutes');
      // Verifica se o horário está dentro da faixa de 8h às 18h
      if (current.hour() >= 8 && current.hour() < 18) {
        eventsArray.push({
          id: eventsArray.length + 1,
          start: current.toDate(),
          end: nextEnd.toDate(),
          title: editedEvent.title,
        });
      }
      current = nextEnd;
    }

    return isEditing ? eventsArray : [...events, ...eventsArray];
  };

  // Função para lidar com a submissão do formulário
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.start || !formData.end || !formData.title) {
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
      title: '',
    });
  };

  // Função para deletar um evento existente
  const handleDeleteEvent = (eventId) => {
    const filteredEvents = events.filter((event) => event.id !== eventId);
    setEvents(filteredEvents);
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
        min={new Date().setHours(8, 0, 0)} // Define o horário mínimo como 8:00
        max={new Date().setHours(18, 0, 0)} // Define o horário máximo como 18:00
        formats={{
          timeGutterFormat: 'HH:mm', // Formato de hora
          eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
            `${localizer.format(start, 'HH:mm', culture)} - ${localizer.format(end, 'HH:mm', culture)}`, // Formato de intervalo de hora em eventos
          dayFormat: 'DD/MM/YYYY', // Formato de dia
          dayHeaderFormat: 'dddd, DD/MM', // Formato de cabeçalho de dia
          monthHeaderFormat: 'MMMM YYYY', // Formato de cabeçalho de mês
          dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
            `${localizer.format(start, 'DD/MM/YYYY', culture)} - ${localizer.format(end, 'DD/MM/YYYY', culture)}`, // Formato de cabeçalho de intervalo de dias
          agendaDateFormat: 'DD/MM/YYYY', // Formato de data na agenda
          agendaTimeFormat: 'HH:mm', // Formato de hora na agenda
          agendaTimeRangeFormat: ({ start, end }, culture, localizer) =>
            `${localizer.format(start, 'HH:mm', culture)} - ${localizer.format(end, 'HH:mm', culture)}`, // Formato de intervalo de hora na agenda
        }}
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
              value={dayjs(formData.start).format('YYYY-MM-DDTHH:mm')}
              onChange={handleInputChange}
              step="1200" // 20 minutos em segundos
            />
          </label>
          <label>
            Fim:
            <input
              type="datetime-local"
              name="end"
              value={dayjs(formData.end).format('YYYY-MM-DDTHH:mm')}
              onChange={handleInputChange}
              step="1200" // 20 minutos em segundos
            />
          </label>
          <button type="submit">Salvar</button>
          <button type="button" onClick={handleCloseForm}>
            Cancelar
          </button>
          {isEditing && (
            <button type="button" onClick={() => handleDeleteEvent(formData.id)}>
              Excluir
            </button>
          )}
        </form>
      )}
    </div>
  );
}

export default App;
