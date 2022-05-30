import React from 'react';
import { Heart } from 'tabler-icons-react';
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  createStyles,
  useMantineTheme,
  Tooltip,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.dark[6],
    color: 'white',
    paddingTop: theme.spacing.md,
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

interface BadgeCardProps {
  image: string;
  title: string;
  dao: string;
  eventtime: string;
  description: string;
  badges: {
    emoji: string;
    label: string;
  }[];
}

export function BadgeCard({ image, title, description, dao, eventtime, badges }: BadgeCardProps) {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const features = badges.map((badge) => (
    <Badge
      color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
      key={badge.label}
      leftSection={badge.emoji}
    >
      {badge.label}
    </Badge>
  ));

  return (
    <Card radius="lg" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} height={200} />
      </Card.Section>
      <Card.Section className={classes.section} mt="md">
        <div className={classes.description}>
          <Group position="apart">
            <Text size="lg" weight={500}>
              {title}
            </Text>
            <Badge size="sm">{dao}</Badge>
          </Group>
          <Tooltip
            wrapLines
            width={300}
            position="bottom"
            withArrow
            transition="slide-down"
            openDelay={500}
            transitionDuration={200}
            label={description}
          >
            <Text size="sm" mt="xs" lineClamp={8}>
              {description}
            </Text>
          </Tooltip>
        </div>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group spacing="sm" my="sm" noWrap>
          {features}
        </Group>
      </Card.Section>
      <Card.Section>
        <Text m="md" className={classes.label}>
          {/* dayjs(eventtime, "MM/DD/YYYY @ h:mma").format('MMMM Dd YYYY, h:mm:ss a') */ eventtime}
        </Text>
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>
          Attend
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <Heart size={18} className={classes.like} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
