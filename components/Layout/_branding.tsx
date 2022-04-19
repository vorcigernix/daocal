import React from 'react';
import { Title, Container, Text } from '@mantine/core';
import { Logo } from './_logo';
import useStyles from './Layout.styles';

export function Branding() {
  const { classes } = useStyles();

  return (
    <Container className={classes.inner}>
      <Title className={classes.logotext} align="center">
        <Logo colorScheme="dark" />
        <Text inherit variant="gradient"  gradient={{ from: 'lime', to: 'teal', deg: 45 }} component="span">
          Zitrone
        </Text>
      </Title>
    </Container>
  );
}
