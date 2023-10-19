import React, { useEffect, useState } from 'react';
import LayoutMaster from '../layouts/LayoutMaster';
import Breadcrumb from '../includes/Breadcrumb';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useParams } from 'react-router-dom';
import DeviceModel from '../models/DeviceModel';


function Calendar(props) {
    const { id } = useParams();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        DeviceModel.getDeviceCalendar(id)
          .then((res) => {
            setEvents(res.data);
            //console.log(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      }, []);

      const handleDayClick = (info) => {
        alert(`Clicked on: ${info.dateStr}`);
      };

    return (
        <LayoutMaster>
            <Breadcrumb page_title="Danh sách" />
            <div className='my-calendar'>
                <FullCalendar
                    plugins={[dayGridPlugin,interactionPlugin]}
                    initialView='dayGridMonth' // Chế độ xem ban đầu
                    events={events}
                    dayClick={handleDayClick}
                />
            </div>
        </LayoutMaster>

    );
}

export default Calendar;