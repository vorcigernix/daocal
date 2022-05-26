
import React, { useState, ReactNode, lazy } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import DaosJson from '../public/daos.json';
import dynamic from 'next/dynamic';
import fetcher from '../libs/fetcher';
const MyDaoEvents = dynamic(() => import('../components/MyDaoEvents'),
  { ssr: false }
)
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

  async function useDaoName(id: string) {
    const result = fetcher(`./api/data/${id}`)
    return (await result)

  }
  //console.log(Object.values(savedDAOS))


  const { classes } = useStyles();
  /* for (const { name } of Object.values(DaosJson)) {
    //console.log(`${key}: ${value}`);
    //let { name } = value
    daoNames.push(name)
    //console.log(name);
  } */

  const [selectedDao, setSelectedDao] = useState('');
  const [filteredDaos, setFilteredDaos] = useState([])
  //console.log(useDaoName(selectedDao))
  // const userDaos : any[] = []
  // for(let i = 0; i < myDAOs.length; i++){
  //   userDaos.push(JSON.parse(myDAOs[i]));
  // }

  function handleAddDao() {
    for (const dao of Object.values(DaosJson)) {

      if (dao.name === selectedDao) {
        //console.log(myDAOs + JSON.stringify([dao]))
        if (myDAOs === undefined || myDAOs === null) {
          setMyDAOs(JSON.stringify([dao]))
        }
        else if (!myDAOs.includes(dao.name)) {
          setMyDAOs(JSON.stringify(JSON.parse(myDAOs).concat([dao])))
        }

      }
    }
  }
  async function filterDAOs(e: string) {
    setSelectedDao(e)
    //console.log(e, e.length)
    if (e.length > 1) {
      const daolist = await useDaoName(e)
      setFilteredDaos(daolist.map((v: { name: string; }) => v.name))
    }
    else {
      setFilteredDaos([]);
    }
    //setFilteredDaos(daolist.daoobject as [])

  }

  /*   function handleACChange(val: string) {
      setSelectedDao(val)
      let names: string[] = [];
      if (selectedDao.length >= 3) {
        let daos = useDaoName(selectedDao);
        Object.values(daos).forEach(element => {
          names.push(element.name);
        });
      }
      return names;
    } */



  return (
    <>
      <MyDaosComponent />
      <Autocomplete
        value={selectedDao}
        onChange={(e) => filterDAOs(e)}
        label="Add a new DAO to your DAOs"
        placeholder="Pick one"
        data={filteredDaos.length > 0 ? filteredDaos : ['type more to see suggestions']}
      />
      <Group align="flex-end" className={classes.okButton}>
        <Button onClick={() => handleAddDao()}>OK</Button>
      </Group>
      <SimpleGrid
      cols={4}
      spacing="lg"
      py='md'
      breakpoints={[
        { maxWidth: 980, cols: 3, spacing: 'md' },
        { maxWidth: 755, cols: 2, spacing: 'sm' },
        { maxWidth: 600, cols: 1, spacing: 'sm' },
      ]}
      >
        <MyDaoEvents mydaos={myDAOs} />
      </SimpleGrid>
    </>
  );
}




