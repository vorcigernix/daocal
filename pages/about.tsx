import { MantineProvider } from "@mantine/core";
import React from 'react';
import Link from 'next/link';
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
} from '@mantine/core';
import { Check } from 'tabler-icons-react';
import image from '../public/favicon.svg';
import { lutimes } from "fs";

export default function About() {
    return <MantineProvider      theme={{
      // Override any other properties from default theme
      spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
      colorScheme: 'dark',
      colors: {
        brand: [
          '#f1fde0',
          '#dcf4b9',
          '#c7eb91',
          '#b1e367',
          '#9cdb3d',
          '#83c224',
          '#65971a',
          '#486c10',
          '#2a4106',
          '#0c1700',
        ],
      },
      primaryColor: 'brand',
    }}>
      <HeroBullets></HeroBullets>
    </MantineProvider>
  }
  const useStyles = createStyles((theme) => ({
    inner: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: theme.spacing.xl * 4,
      paddingBottom: theme.spacing.xl * 4,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      color: theme.black,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.lg,
    },
  
    content: {
      maxWidth: 480,
      marginRight: theme.spacing.xl * 3,
  
      [theme.fn.smallerThan('md')]: {
        maxWidth: '100%',
        marginRight: 0,
      },
    },
  
    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontSize: 44,
      lineHeight: 1.2,
      fontWeight: 900,
  
      [theme.fn.smallerThan('xs')]: {
        fontSize: 28,
      },
    },
  
    control: {
      [theme.fn.smallerThan('xs')]: {
        flex: 1,
      },
    },
  
    image: {
      flex: 1,
  
      [theme.fn.smallerThan('md')]: {
        display: 'none',
      },
    },
  
    highlight: {
      position: 'relative',
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
          : theme.colors[theme.primaryColor][0],
      borderRadius: theme.radius.sm,
      padding: '4px 12px',
    },
  }));
  
  export function HeroBullets() {
    const { classes } = useStyles();
    return (
      <div>
        <Container>
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                A <span className={classes.highlight}>modern</span> React <br /> components library
              </Title>
              <Text color="dimmed" mt="md">
                Build fully functional accessible web applications faster than ever – Mantine includes
                more than 120 customizable components and hooks to cover you in any situation
              </Text>
  
              <List
                mt={30}
                spacing="sm"
                size="sm"
                icon={
                  <ThemeIcon size={20} radius="xl">
                    <Check size={12} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <b>TypeScript based</b> – build type safe applications, all components and hooks
                  export types
                </List.Item>
                <List.Item>
                  <b>Free and open source</b> – all packages have MIT license, you can use Mantine in
                  any project
                </List.Item>
                <List.Item>
                  <b>No annoying focus ring</b> – focus ring will appear only when user navigates with
                  keyboard
                </List.Item>
              </List>
  
              <Group mt={30}>
                <Button variant="gradient" gradient={{ from: 'lime', to: 'teal' }} radius="md" size="md" className={classes.control}>
                  <Link href="/">
                    <a className={classes.link}>Main Page</a>
                  </Link>
                </Button>
                <Button variant="outline" color="lime" radius="md" size="md" className={classes.control}>
                  Source code
                </Button>
              </Group>
            </div>
            <Image src={image.src} className={classes.image} />
          </div>
        </Container>
      </div>
    );
  }
  