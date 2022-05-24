import React, { useState } from 'react';
import Link from 'next/link';
import addresses from '../../public/addresses.json';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useEnsName, useEnsAddress } from 'wagmi'
import {
  createStyles,
  Navbar,
  Group,
  Code,
  ScrollArea,
  Box,
  Paper,
  Container,
} from '@mantine/core';
import {
  BellRinging,
  Logout,
  Calendar,
  ChartBubble,
  InfoCircle,
  CirclePlus,
  Bookmarks,
}
  from 'tabler-icons-react';
const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    navbar: {
      borderRight: 0,
    },
    navbox: {
      background: theme.fn.linearGradient(120, theme.colors[theme.primaryColor][6], 'teal'),
      borderRadius: theme.radius.lg,
      padding: theme.spacing.lg,
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
    ethButton: {
      paddingTop: theme.spacing.sm,
      display: 'flex'
    }
  };
});


const dataLinks = [
  { link: '/', label: 'Highlights', icon: BellRinging },
  { link: '/myevents', label: 'Attending', icon: Bookmarks },
  { link: '/calendar', label: 'Calendar', icon: Calendar },
  { link: '/daos', label: 'My DAOs', icon: ChartBubble },
  { link: '/about', label: 'About', icon: InfoCircle },
];

type Props = {
  opened?: boolean;
};

export function MainLinks({ opened = false }: Props) {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Higlights');
  const [isVisible, setIsVisible] = useState(false)
  const { data: accountData } = useAccount()
  const { data: ensNameData } = useEnsName({ address: accountData?.address })

  function checkRights(): boolean | undefined {
    if (addresses.filter(address => address.Address === accountData?.address).length > 0) return true
    //return false
  }

  const links = dataLinks.map((item) => (
    <Link href={item.link} key={item.link} passHref>
      <a
        className={cx(classes.link, { [classes.linkActive]: item.label === active })}
        onClick={(event) => {
          setActive(item.label);
        }}
      >
        <item.icon className={classes.linkIcon} />
        <span>{item.label}</span>
      </a>
    </Link>
  ));
  return (
    <Navbar
      p="lg"
      hiddenBreakpoint="sm"
      width={{ sm: 200, lg: 300 }}
      hidden={!opened}
      className={classes.navbar}
    >
      <Box className={classes.navbox}>
        <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
          {links}
        </Navbar.Section>

        <Navbar.Section className={classes.footer} >

          <div hidden={!checkRights()} style={checkRights() ?{ display: 'none' } : { display: 'block' }}>
            <Link href='../../addevent' >
              <a className={classes.link} onClick={(event) => event.preventDefault()}>
                <CirclePlus className={classes.linkIcon} />
                <span>Add Event</span>
              </a>
            </Link>
          </div>


        </Navbar.Section>
      </Box>
      <div className={classes.ethButton}>
        <ConnectButton chainStatus='icon' accountStatus='full' showBalance={false} />
      </div>
    </Navbar>
  );
}


export default MainLinks;