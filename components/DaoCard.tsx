import React from 'react';
import { Heart, X } from 'tabler-icons-react';
import { useLocalStorage } from '@mantine/hooks';
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
    /* minWidth: 200,
    maxWidth: 200,
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      minWidth: 325,
      maxWidth: 325,
    }, */
  },

  section: {
    borderBottom: `1px solid ${theme.colors.dark[4]}`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    /*paddingBottom: theme.spacing.md, */
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
  const [myDAOs, setMyDAOs] = useLocalStorage({
    key: 'savedDAOS'
  });
  let _myDaos = Object.values(JSON.parse(myDAOs));
  return (
    <Card radius="md" p="md" className={classes.card}>
      <Card.Section className={classes.section}>
          <Group position="apart" direction='row'>
            <Text size="sm" weight={500}>
              {name}
            </Text>
            <Badge size="xs">{'Followers: ' + followers}</Badge>
            <Button variant='subtle' onClick={() => handleRemoveDao()}>
              <X/>
            </Button>
          </Group>
      </Card.Section>
    </Card>
  );
  function handleRemoveDao(){
    for (let index = 0; index < _myDaos.length; index++) {
      const element:any = _myDaos[index];
      if(element.name === name){
        _myDaos.splice(index, 1);
      }
    }
    setMyDAOs(JSON.stringify(_myDaos))
  }
}