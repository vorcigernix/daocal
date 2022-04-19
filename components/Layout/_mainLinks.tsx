import React, { useState } from 'react';
import { createStyles, Navbar, Group, Code, ScrollArea } from '@mantine/core';
import {
  BellRinging,
  SwitchHorizontal,
  Logout,
  Calendar,
  ChartBubble,
  InfoCircle,
  CirclePlus,
} from 'tabler-icons-react';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    navbar: {
      backgroundColor: theme.colors[theme.primaryColor][6],
      borderRadius: theme.radius.lg,
    },

    version: {
      backgroundColor: theme.colors[theme.primaryColor][7],
      color: theme.white,
      fontWeight: 700,
    },

    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${theme.colors[theme.primaryColor][7]}`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.colors[theme.primaryColor][7]}`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.white,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.lg,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colors[theme.primaryColor][5],
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.white,
      opacity: 0.75,
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.colors[theme.primaryColor][7],
        [`& .${icon}`]: {
          opacity: 0.9,
        },
      },
    },
  };
});

const data = [
  { link: '', label: 'Highlights', icon: BellRinging },
  { link: '', label: 'Calendar', icon: Calendar },
  { link: '', label: 'My DAOs', icon: ChartBubble },
  { link: '', label: 'About', icon: InfoCircle },
];

type Props = {
  opened?: boolean;
};

export function MainLinks({ opened = false }: Props) {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Higlights');

  const links = data.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      width={{ sm: 200, lg: 300 }}
      className={classes.navbar}
      hidden={!opened}
    >
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <CirclePlus className={classes.linkIcon} />
          <span>Add Event</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <Logout className={classes.linkIcon} />
          <span>0x5bbiushd98679ccc</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
