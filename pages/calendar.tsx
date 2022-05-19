import Events from "../public/events.json";
import { ReactNode, useState, useEffect } from 'react';
import { Calendar } from '@mantine/dates';
import { Group, useMantineTheme, createStyles, Indicator, Badge, Grid, MediaQuery } from "@mantine/core";
import dayjs from 'dayjs';
import { Container, RadiusTopRight, Underline } from "tabler-icons-react";
import { BadgeCard } from "../components/Card/Card";
import { isDesktop } from "react-device-detect";


const useStyles = createStyles((theme) => ({
  /*   altbutton: {
      color: theme.white,
      backgroundColor: theme.colors.blue[6],
      border: 0,
      borderRadius: 0,
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
    cell: {
      border: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
      borderRadius: 0,
    },
    day: { borderRadius: 0, height: 70, fontSize: theme.fontSizes.lg },
    weekday: { fontSize: theme.fontSizes.lg },
    weekdayCell: {
      fontSize: theme.fontSizes.xl,
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
      border: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
      height: 70,
    },
     */
  eventCell: {

    border: `1px solid ${theme.colors.brand[4]
      }`,
    borderRadius: 0,


  },
  eventName: {
    maxHeight: 100,
  }
}));

export default function EventCalendar() {
  const [value, setValue] = useState<Date>(new Date());
  const [eventDetail, setEventDetail] = useState<ReactNode>()
  const { classes } = useStyles();
  let card;

  function CalendarChange(e: string | number | Date | null) {
    e && setValue(new Date(e))

    var customParseFormat = require('dayjs/plugin/customParseFormat');
    dayjs.extend(customParseFormat);
    let selectEvent = Events.find(event => dayjs(e).isSame(dayjs(event.Start, "MM/DD/YYYY @ h:mma"), "day"))
    if (selectEvent) {
      card = <BadgeCard badges={selectEvent.Badges} title={selectEvent.Name} image={selectEvent.Image} dao={selectEvent.DAO} eventtime={selectEvent.Start} description={selectEvent.Description}></BadgeCard>
      setEventDetail(card)
    }
  }
  return (
    <Grid columns={3}>
      <Grid.Col md={3} lg={2}>
        <Calendar
          value={value}
          fullWidth
          size="xl"
          allowLevelChange={false}
          onChange={(e) => CalendarChange(e)}
          styles={(theme) => ({
            cell: {
              border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
            },
            day: { borderRadius: 0, height: 100, fontSize: theme.fontSizes.lg },
            weekday: { fontSize: theme.fontSizes.lg },
            weekdayCell: {
              fontSize: theme.fontSizes.xl,
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
              border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
              height: 100,
            },
          })}
          renderDay={(date) => {
            const day = dayjs(date);
            var customParseFormat = require('dayjs/plugin/customParseFormat');
            dayjs.extend(customParseFormat);
            //console.log((dayjs("05/18/2022 @ 8:00am", "MM/DD/YYYY @ h:mma")));
            //console.log(day);
            let todayEvent = Events.find(event => dayjs(day).isSame(dayjs(event.Start, "MM/DD/YYYY @ h:mma"), "day"))
            if (todayEvent) {

              return <>
                <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                  <Group className={classes.eventName} direction="column" spacing={0} position="center"><u>{day.date().toString()}</u><Badge color="blue" variant="filled">{todayEvent.Name}</Badge></Group></MediaQuery>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                  <Indicator color='blue'><u>{day.date().toString()}</u></Indicator></MediaQuery></>
            }
            else {
              return <div>{day.date().toString()}</div>
            }
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
      </Grid.Col>
      <Grid.Col md={3} lg={1}>
        {eventDetail}
      </Grid.Col>
    </Grid>
  );
}
