import Events from "../public/events.json";
import { useState } from 'react';
import { Calendar } from '@mantine/dates';
import { Group } from "@mantine/core";
import dayjs from 'dayjs';
export default function EventCalendar() {
  const [value, setValue] = useState(new Date());
    return (
      <Group position="center">
      <Calendar
        value={value}
        onChange={setValue}
        renderDay={(date) => {
          const day = dayjs(date);
          var customParseFormat = require('dayjs/plugin/customParseFormat');
          dayjs.extend(customParseFormat);
          //console.log((dayjs("05/18/2022 @ 8:00am", "MM/DD/YYYY @ h:mma")));
          //console.log(day);
          let todayEvent = Events.find(event => dayjs(day).isSame(dayjs(event.Start, "MM/DD/YYYY @ h:mma"),"day"))

          return (
              <div>{todayEvent ? day.date().toString() + '■' : day.date().toString()}</div>
          );
        }}
      />
    </Group>
    );
  }
  