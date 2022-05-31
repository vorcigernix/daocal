import { Container, Title, Text, List, ThemeIcon } from '@mantine/core';
import React from 'react';
import Link from 'next/link';
import { Check } from 'tabler-icons-react';
import { FaqSimple } from '../Card/Question';
import { useStyles } from './HeroBullets.styles';

export function HeroBullets() {
  const { classes } = useStyles();
  return (
    <Container>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            A <span className={classes.highlight}>modern</span> event <br /> management platform
          </Title>
          <Text color="dimmed" mt="md">
            Easy to use platform for DAOs to organize their events. Single source of truth for
            everyone involved.
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
              <b>Built for DAOs</b> – Recurring events, meetups, and internal meetings gated by DAO
              tokens.
            </List.Item>
            <List.Item>
              <b>All DAOs in one place</b> – Have only one calendar across all DAOs.
            </List.Item>
            <List.Item>
              <b>Wallet security</b> – Your events are as secure as your wallet.
            </List.Item>
          </List>
          <Title align="left" className={classes.title} mt="md">
            Frequently Asked Questions
          </Title>
          <FaqSimple
            title="How do create event?"
            text="You need to be whitelisted. Reach out to us at zitrone@younf.com."
          />
          <FaqSimple
            title="How do I add a DAO?"
            text="So, DeepDAO don't know about you. That's not a problem. Reach out to Vorcigernix#1185 on Discord and he will help you out."
          />
        </div>
      </div>
    </Container>
  );
}
