import React, { useState, ReactNode, Suspense, lazy } from 'react';
import { AppShell, MediaQuery, Burger, useMantineTheme, createStyles, Header } from '@mantine/core';
import dynamic from 'next/dynamic'

import { Branding } from './_branding';
const MainLinks = dynamic(
  () => import('./_mainLinks'),
  { ssr: false,},
)
type Props = {
  children?: ReactNode;
  title?: string;
};

const useStyles = createStyles((theme) => ({
  header: {
    borderBottom: 0,
  },
  navbar: {
    borderRight: 0,
  },
}));

export const Layout = ({ children, title = 'DAO Events: Zitrone' }: Props) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
          <MainLinks opened={opened} />
      }
      header={
        <Header height={85} p="lg" className={classes.header}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Branding />
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};
