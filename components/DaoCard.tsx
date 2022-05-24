import React from 'react';
import { Heart } from 'tabler-icons-react';
import {
  Card,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  createStyles,
  useMantineTheme,

} from '@mantine/core';


const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.dark[6],
    color: "white",
    minWidth: 200,
    maxWidth: 200,
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      minWidth: 325,
      maxWidth: 325,
    },
  },

  section: {
    borderBottom: `1px solid ${theme.colors.dark[4]}`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  description: { height: 200 },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

interface DaoCardProps {
  name: string;
  network: string;
  followers: number;
}

export function DaoCard({name, network, followers}: DaoCardProps) {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <Card radius="lg" p="md" className={classes.card}>
      <Card.Section className={classes.section} mt="md">
        <div className={classes.description}>
          <Group position="apart">
            <Text size="lg" weight={500}>
              {name}
            </Text>
            <Badge size="sm">{'Followers: ' + followers}</Badge>
          </Group>
            <Text size="sm" mt="xs" lineClamp={8}>
              {'Network: ' + network}
            </Text>
        </div>
      </Card.Section>
    </Card>
  );
}