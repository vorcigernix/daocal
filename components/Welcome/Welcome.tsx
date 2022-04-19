import { createStyles, SimpleGrid } from '@mantine/core';
import { BadgeCard } from '../Card/Card';

export function Welcome() {
  const data = [
    {
      image:
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      title: 'DAOPlanet TownHall',
      dao: 'DAOPlanet',
      eventtime: '2020-01-01T00:00:00.000Z',
      description:
        'Come join us on the regular Town Hall, discussing governance issues, plans for the future and whether spaghetti is a pasta or not.',
      badges: [
        {
          emoji: '',
          label: 'Governance',
        },
        {
          emoji: '',
          label: 'Regular',
        },
        {
          emoji: '',
          label: 'Open Call',
        },
      ],
    },
    {
      image:
        'https://images.unsplash.com/photo-1598209494655-b8e249540dfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      title: 'Polygon Village',
      dao: 'PolygonDAO',
      eventtime: '2020-01-01T00:00:00.000Z',
      description:
        'Talk of the town: #PolygonVillage brings Experts Talks. Sandeep Nailwal and Sanket Shah to kick off the discussion. Get to know everything about Welcome Vouchers and Grants. On the importance of network effect, grants, welcome vouchers, and more. Learn how to apply for grants end to end. First set of Welcome Vouchers and shared grants to be given by Akash Network, Quickswap and Huobi, Tatum & CertiK. Grants and Welcome Vouchers are a great way to scale projects. #PolygonVillage, built with Copestudio and supported by Questbook is creating an ecosystem where projects can thrive with much-needed support.',
      badges: [
        {
          emoji: '',
          label: 'Onboarding',
        },
        {
          emoji: '',
          label: 'Grants',
        },
        {
          emoji: '',
          label: 'Sponsoring',
        },
      ],
    },
  ];

  return (
    <SimpleGrid
      cols={4}
      spacing="lg"
      breakpoints={[
        { maxWidth: 980, cols: 3, spacing: 'md' },
        { maxWidth: 755, cols: 2, spacing: 'sm' },
        { maxWidth: 600, cols: 1, spacing: 'sm' },
      ]}
    >
      {data.map((item, i) => (
        <BadgeCard
          key={item.title + i}
          image={item.image}
          title={item.title}
          dao={item.dao}
          eventtime={item.eventtime}
          description={item.description}
          badges={item.badges}
        />
      ))}
    </SimpleGrid>
  );
}
