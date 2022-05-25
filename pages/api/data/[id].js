import daos from '../../../public/daos.json'
/* import dynamic from 'next/dynamic'
const daos = dynamic(
  () => import('../../../public/daos.json'),
) */
export default function userHandler(req, res) {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      // Get data from your database
      //console.log(daos);
        let matchNames = Object.values(daos).filter((dao) => dao.name.includes(id))
      /* for (const dao of Object.values(daos)) {

        if (dao.name.includes(id)) {
          matchNames.push(dao.name);
        }
      } */
      
      //res.status(200).json({ id, name: `User ${id}` })
      res.status(200).json(matchNames)
      break
    default:
      res.setHeader('Allow', 'GET')
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}