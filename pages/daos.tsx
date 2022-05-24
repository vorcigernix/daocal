
import React, { useState, ReactNode, lazy} from 'react';
import { useLocalStorage } from '@mantine/hooks';
import DaosJson from '../public/daos.json';
import dynamic from 'next/dynamic';
const MyDaosComponent = dynamic(() => import('../components/MyDaos'),
{ ssr: false }
)
import {
  Button,
  createStyles,
  Text,
  Group,
  Autocomplete,
  SimpleGrid,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  okButton: {
    paddingTop: theme.spacing.md,

  }
}));

export default function Daos() {

  const [myDAOs, setMyDAOs] = useLocalStorage({
    key: 'savedDAOS'
  });

  //console.log(Object.values(savedDAOS))

  let daoNames: string[] = [];
  const { classes } = useStyles();
  for (const { name } of Object.values(DaosJson)) {
    //console.log(`${key}: ${value}`);
    //let { name } = value
    daoNames.push(name)
    //console.log(name);
  }
  const [selectedDao, setSelectedDao] = useState('');
  // const userDaos : any[] = []
  // for(let i = 0; i < myDAOs.length; i++){
  //   userDaos.push(JSON.parse(myDAOs[i]));
  // }

  return (
    <>
      <MyDaosComponent></MyDaosComponent>
      <Autocomplete
        value={selectedDao}
        onChange={setSelectedDao}
        label="Add a new DAO to your DAOs"
        placeholder="Pick one"
        data={daoNames}
      />
      <Group align="flex-end" className={classes.okButton}>
        <Button onClick={() => handleAddDao()}>OK</Button>
      </Group>
    </>
  );
  function handleAddDao() {
    for (const dao of Object.values(DaosJson)) {

      if (dao.name === selectedDao) {
        //console.log(myDAOs + JSON.stringify([dao]))
        if(myDAOs === undefined || myDAOs === null){
          setMyDAOs(JSON.stringify([dao]))
        }
        else if(!myDAOs.includes(dao.name)){
          setMyDAOs(JSON.stringify(JSON.parse(myDAOs).concat([dao])))
        }
        console.log(myDAOs);
      }
    }
  }
}
