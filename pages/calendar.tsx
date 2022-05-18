import Events from "../public/events.json";
import { useState } from 'react';
import { Calendar } from '@mantine/dates';
import { Group, useMantineTheme, createStyles} from "@mantine/core";
import dayjs from 'dayjs';
import { Container } from "tabler-icons-react";


const useStyles = createStyles((theme) => ({
  altbutton: {
    color: theme.white,
    backgroundColor: theme.colors.blue[6],
    border: 0,
    borderRadius: theme.radius.md,
    //padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
    cursor: 'pointer',
    //margin: theme.spacing.md,

    // Use pseudo-classes just like you would in Sass
    '&:hover': {
      backgroundColor: theme.colors.blue[9],
    },

    '&:not(:first-of-type)': {
      backgroundColor: theme.colors.violet[6],

      // pseudo-classes can be nested
      '&:hover': {
        backgroundColor: theme.colors.violet[9],
      },
    },
  },
}));

export default function EventCalendar() {
  const [value, setValue] = useState(new Date());
  const { classes } = useStyles();
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
          if (todayEvent)
            return <div className={classes.altbutton}>{day.date().toString() + '■'}</div>
          else return <div>{day.date().toString()}</div>
          // return (
          //   <div>{todayEvent ? day.date().toString() + '■' : day.date().toString()}</div>
          // );
        }}
      // dayStyle={(date) => {
      //   let todayEvent = Events.find(event => dayjs(date).isSame(dayjs(event.Start, "MM/DD/YYYY @ h:mma"), "day"));
      //   console.log(todayEvent)
      //   return todayEvent
      //     ? {
      //       color: theme.white,
      //       border: `1px solid ${theme.colors.brand[5]
      //         }`
      //     } : {
      //       color: theme.white,
      //       border: `0px solid ${theme.colors.brand[0]
      //         }`
      //     } /*{ backgroundColor: theme.colors.dark[7], color: theme.white }*/
      // }
      // }
      />
    </Group>
  );
}
