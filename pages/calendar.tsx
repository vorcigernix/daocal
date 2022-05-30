import { ReactNode, useState } from 'react';
import { Calendar } from '@mantine/dates';
import {
  createStyles,
  Indicator,
  Grid,
  MediaQuery,
  Text,
  Stack,
  Checkbox,
  Group,
} from '@mantine/core';
import dayjs from 'dayjs';
import { useLocalStorage } from '@mantine/hooks';
import { BadgeCard } from '../components/Card/Card';
import defaultEvent from '../public/defaultEvent.json';
import DefaultCard from '../components/Card/DefaultCard';
import Events from '../public/events.json';
import { start } from 'repl';

const useStyles = createStyles(() => ({
  eventName: {
    maxHeight: 50,
    overflow: 'hidden',
  },
}));

export default function EventCalendar() {
  const [value, setValue] = useState<Date>(new Date());
  const [eventDetail, setEventDetail] = useState<ReactNode>();
  const { classes } = useStyles();
  const [myDaosOnly, setMyDaosOnly] = useState(false);
  const [myDAOs] = useLocalStorage({
    key: 'savedDAOS',
  });
  const cards: any[] = [];

  function CalendarChange(e: string | number | Date | null) {
    e && setValue(new Date(e));

    const customParseFormat = require('dayjs/plugin/customParseFormat');
    dayjs.extend(customParseFormat);
    //let selectEvents = Events.filter(event => dayjs(e).isSame(dayjs(event.Start, "MM/DD/YYYY @ h:mma"), "day"))
    let selectEvents;
    if (myDaosOnly) {
      selectEvents = Events.filter(
        (event) =>
          dayjs(e).isSame(dayjs(event.Start, 'MM/DD/YYYY @ h:mma'), 'day') &&
          myDAOs.includes(event.DAO)
      );
    } else {
      selectEvents = Events.filter((event) =>
        dayjs(e).isSame(dayjs(event.Start, 'MM/DD/YYYY @ h:mma'), 'day')
      );
    }
    if (selectEvents.length !== 0) {
      {
        selectEvents.map((item, i) =>
          cards.push(
            <BadgeCard
              key={item.Name + i}
              image={item.Image}
              title={item.Name}
              dao={item.DAO}
              eventtime={item.Start}
              description={item.Description}
              badges={item.Badges}
            />
          )
        );
      }
      //console.log(cards);
    } else {
      cards.push(
        <DefaultCard
          title={defaultEvent[0].Name}
          description={defaultEvent[0].Description}
          image={defaultEvent[0].Image}
        />
      );
    }
    setEventDetail(cards);
  }
  return (
    <Grid columns={3}>
      <Grid.Col md={3} lg={2}>
        <Calendar
          value={value}
          fullWidth
          size="xl"
          onChange={(e) => CalendarChange(e)}
          styles={(theme) => ({
            calendarBase: {
              color: 'white',
              backgroundColor: theme.colors.dark[6],
              borderRadius: theme.radius.lg,
            },
            cell: {},
            day: {
              height: 100,
              fontSize: theme.fontSizes.sm,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            selected: { backgroundColor: 'red' },
          })}
          renderDay={(date) => {
            const day = dayjs(date);
            var customParseFormat = require('dayjs/plugin/customParseFormat');
            dayjs.extend(customParseFormat);
            //console.log((dayjs("05/18/2022 @ 8:00am", "MM/DD/YYYY @ h:mma")));
            //console.log(day);
            let todayEvents;
            if (myDaosOnly) {
              todayEvents = Events.filter(
                (event) =>
                  dayjs(day).isSame(dayjs(event.Start, 'MM/DD/YYYY @ h:mma'), 'day') &&
                  myDAOs.includes(event.DAO)
              );
            } else {
              todayEvents = Events.filter((event) =>
                dayjs(day).isSame(dayjs(event.Start, 'MM/DD/YYYY @ h:mma'), 'day')
              );
            }
            if (todayEvents.length >= 1 && todayEvents.length <= 3) {
              return (
                <>
                  <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                    <Stack>
                      <div>{day.date().toString()}</div>
                      {todayEvents.map((todayEvent, i) => (
                        <Text className={classes.eventName} key={i}>
                          {todayEvent.Name}
                        </Text>
                      ))}
                    </Stack>
                  </MediaQuery>
                  <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Indicator>
                      <div>{day.date().toString()}</div>
                    </Indicator>
                  </MediaQuery>
                </>
              );
            } else if (todayEvents.length > 3) {
              return (
                <>
                  <Indicator>
                    <div>{day.date().toString()}</div>
                  </Indicator>
                </>
              );
            } else {
              return (
                <Stack>
                  <div>{day.date().toString()}</div>
                </Stack>
              );
            }
          }}
        />
      </Grid.Col>
      <Grid.Col md={3} lg={1}>
        <Checkbox
          py="sm"
          label="My DAOs only"
          checked={myDaosOnly}
          onChange={(event) => setMyDaosOnly(event.currentTarget.checked)}
        />
        <Group mt="sm" align="center">
          {eventDetail}
        </Group>
      </Grid.Col>
    </Grid>
  );
}
