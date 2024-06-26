import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Sidebar from './Sidebar';

const localizer = momentLocalizer(moment);

const Calender = () => {
  
    const events = [
        {
          id: 1,
          title: 'Event 1',
          start: new Date(2024, 4, 1),
          end: new Date(2024, 4, 2),
        },
        {
          id: 2,
          title: 'Event 2',
          start: new Date(2024, 4, 5),
          end: new Date(2024, 4, 6),
        },
      ];
    
      const eventStyleGetter = () => {
        const backgroundColor = '#615EF0';
        const style = {
          backgroundColor,
          borderRadius: '5px',
          opacity: 0.8,
          color: 'white',
          border: '0px',
          display: 'block',
        };
        return {
          style: style
        };
      };
    
      return (
        <div className='w-full h-full flex'>
        <Sidebar/>
        <div className='mt-16 h-[500px] w-[90%]'>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            eventPropGetter={eventStyleGetter}
            style={{ margin: '50px' }}
          />
        </div>
        </div>
      );
    };

export default Calender;