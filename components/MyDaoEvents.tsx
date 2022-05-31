import { ReactNode } from 'react';
import { BadgeCard } from './Card/Card';
import Events from '../public/events.json';

interface DaoEventProps {
  mydaos: string;
}

export default function MyDaoEvents({ mydaos }: DaoEventProps) {
  const selectedEvents = Events.filter((event) => mydaos?.includes(event.DAO));
  //console.log(selectedEvents)
  const cards: ReactNode[] = [];
  selectedEvents &&
    selectedEvents.map((item, i) =>
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
  return <>{cards}</>;
}
