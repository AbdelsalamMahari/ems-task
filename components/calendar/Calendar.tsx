import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import 'temporal-polyfill/global'
import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react'
 
function Calendar({allEvents}:any) {
  const eventsService = useState(() => createEventsServicePlugin())[0]

  console.log('allEvents',allEvents)

  const events = allEvents.map((event:any) => ({
  id: event.id,              
  title: event.full_name,
  start: Temporal.ZonedDateTime.from(`${event.start_time}[Universal]`),
  end: Temporal.ZonedDateTime.from(`${event.end_time}[Universal]`),
}));
 
  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: events,
    plugins: [eventsService]
  })
 
  useEffect(() => {
    // get all events
    eventsService.getAll()
  }, [])
 
  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}
 
export default Calendar