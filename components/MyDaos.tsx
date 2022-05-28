import { Group } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { DaoCard } from './DaoCard';

export default function MyDaosComponent() {
  const [myDAOs] = useLocalStorage({
    key: 'savedDAOS',
  });
  if (myDAOs != null && myDAOs !== undefined) {
    const _myDAOs = JSON.parse(myDAOs);
    //_myDAOs.map((i: any)=>console.log(i))
    return (
      <Group direction="row" spacing="md">
        {_myDAOs.map((i: any) => (
          <DaoCard key={i.name + i} name={i.name} network={i.network} followers={i.followers} />
        ))}
      </Group>
    );
  }
}
