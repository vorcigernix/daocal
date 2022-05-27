import Events from "../public/events.json";
import { ReactNode, useState, useEffect, Fragment } from 'react';
import { Calendar } from '@mantine/dates';
import { Group, useMantineTheme, createStyles, Indicator, Badge, Grid, MediaQuery, Text, Stack, Checkbox } from "@mantine/core";
import dayjs from 'dayjs';
import { Container, RadiusTopRight, Underline } from "tabler-icons-react";
import { BadgeCard } from "../components/Card/Card";
import defaultEvent from '../public/defaultEvent.json';
import DefaultCard from "../components/Card/DefaultCard";
import { useLocalStorage } from "@mantine/hooks";

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
    height: 100,
  },
  eventName: {
    maxHeight: 40}
}));

export default function EventCalendar() {
  const [value, setValue] = useState<Date>(new Date());
  const [eventDetail, setEventDetail] = useState<ReactNode>()
  const { classes } = useStyles();
  const [myDaosOnly, setMyDaosOnly] = useState(false);
  const [myDAOs, setMyDAOs] = useLocalStorage({
    key: 'savedDAOS'
  });
  //let defaultCard = <BadgeCard title={defaultEvent[0].Name} image={defaultEvent[0].Image} dao={defaultEvent[0].DAO} eventtime={defaultEvent[0].Start} badges={defaultEvent[0].Badges} description={defaultEvent[0].Description}></BadgeCard>
  let cards:any[] = [];

  function CalendarChange(e: string | number | Date | null) {
    e && setValue(new Date(e))

    var customParseFormat = require('dayjs/plugin/customParseFormat');
    dayjs.extend(customParseFormat);
    //let selectEvents = Events.filter(event => dayjs(e).isSame(dayjs(event.Start, "MM/DD/YYYY @ h:mma"), "day"))
    let selectEvents;
    if(myDaosOnly){
      selectEvents = Events.filter(event => dayjs(e).isSame(dayjs(event.Start, "MM/DD/YYYY @ h:mma"), "day") && myDAOs.includes(event.DAO))
    }
    else{
      selectEvents = Events.filter(event => dayjs(e).isSame(dayjs(event.Start, "MM/DD/YYYY @ h:mma"), "day"))
    }
    if (selectEvents.length != 0) {
      {selectEvents.map((item, i) => (
          cards.push(<BadgeCard
          key={item.Name + i}
          image={item.Image}
          title={item.Name}
          dao={item.DAO}
          eventtime={item.Start}
          description={item.Description}
          badges={item.Badges}
        />)
      ))}
      console.log(cards);
    }
    else{
      cards.push(<DefaultCard title={defaultEvent[0].Name} description={defaultEvent[0].Description} image={defaultEvent[0].Image}/>);
    }
    setEventDetail(cards)
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
                margin: 0,
                padding: 0
            },
            day: { borderRadius: 0, height: 100, fontSize: theme.fontSizes.lg, overflow: "hidden"},
            weekday: { fontSize: theme.fontSizes.lg },
            weekdayCell: {
              fontSize: theme.fontSizes.xl,
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
              border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
              height: 100,
              overflow: "hidden",
            },
          })}
          renderDay={(date) => {
            const day = dayjs(date);
            var customParseFormat = require('dayjs/plugin/customParseFormat');
            dayjs.extend(customParseFormat);
            //console.log((dayjs("05/18/2022 @ 8:00am", "MM/DD/YYYY @ h:mma")));
            //console.log(day);
            let todayEvents
            if(myDaosOnly){
              todayEvents = Events.filter(event => dayjs(day).isSame(dayjs(event.Start, "MM/DD/YYYY @ h:mma"), "day") && myDAOs.includes(event.DAO))
            }
            else{
              todayEvents = Events.filter(event => dayjs(day).isSame(dayjs(event.Start, "MM/DD/YYYY @ h:mma"), "day"))
            }
            if (todayEvents.length == 1) {

              return <>
                <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                <Stack className={classes.eventCell} align="flex-start" justify="flex-start" spacing={0}>
                <div className={classes.eventName}>{day.date().toString()}</div>
                  <Text color="blue" mt={0} className={classes.eventName}>{todayEvents[0].Name}</Text>
                </Stack>
                </MediaQuery>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                  <Indicator color='blue'><div className={classes.eventName}>{day.date().toString()}</div></Indicator>
                </MediaQuery></>
            }
            else if(todayEvents.length > 1 && todayEvents.length <= 3){
              return <>
                <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                <Stack className={classes.eventCell} align="flex-start" justify="flex-start" spacing={0}>
                  <div className={classes.eventName}>{day.date().toString()}</div>
                  {todayEvents.map((todayEvent, i) => (
                    <Text key={i} align='left' color="blue" px={0} mx={0}>{todayEvent.Name}</Text>
                   ))}
                </Stack>
                </MediaQuery>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Indicator color='blue'><div className={classes.eventName}>{day.date().toString()}</div></Indicator>
                </MediaQuery></>
            }
            else if(todayEvents.length > 3){
              return <>
                <Indicator color='blue'><div className={classes.eventName}>{day.date().toString()}</div></Indicator>
              </>
            }
            else {
              return <Stack className={classes.eventCell} align="flex-start" justify="flex-start" spacing={0}><div className={classes.eventName}>{day.date().toString()}</div></Stack>
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
        <Checkbox py='sm' label="My DAOs only" checked={myDaosOnly} onChange={(event) => setMyDaosOnly(event.currentTarget.checked)}/>
        {eventDetail}
      </Grid.Col>
    </Grid>
  );
}
