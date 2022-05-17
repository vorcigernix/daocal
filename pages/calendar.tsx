import Events from "../public/events.json";
import { useState } from 'react';
import { Calendar } from '@mantine/dates';
import { Group, useMantineTheme } from "@mantine/core";
import dayjs from 'dayjs';
import { Container } from "tabler-icons-react";

export default function EventCalendar() {
  const [value, setValue] = useState(new Date());
  const theme = useMantineTheme();
  return (
    <Group position="left" >
      <Calendar
        value={value}
        onChange={setValue}
        renderDay={(date) => {
          const day = dayjs(date);
          var customParseFormat = require('dayjs/plugin/customParseFormat');
          dayjs.extend(customParseFormat);
          //console.log((dayjs("05/18/2022 @ 8:00am", "MM/DD/YYYY @ h:mma")));
          //console.log(day);
          let todayEvent = Events.find(event => dayjs(day).isSame(dayjs(event.Start, "MM/DD/YYYY @ h:mma"), "day"))

          return (
            <div>{todayEvent ? day.date().toString() + '■' : day.date().toString()}</div>
            
          );
        }}
        dayStyle={(date) => {
          let todayEvent = Events.find(event => dayjs(date).isSame(dayjs(event.Start, "MM/DD/YYYY @ h:mma"), "day"));
          console.log(todayEvent)
          return todayEvent
            ? {
              color: theme.white,
              border: `1px solid ${theme.colors.brand[5]
                }`
            } : {
              color: theme.white,
              border: `0px solid ${theme.colors.brand[0]
                }`
            } /*{ backgroundColor: theme.colors.dark[7], color: theme.white }*/
        }
        }
      />
    </Group>
  );
}
