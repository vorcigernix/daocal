import daosJSON from "../../../public/DeepDAOapi.json"
/* import dynamic from 'next/dynamic'
const daos = dynamic(
  () => import('../../../public/daos.json'),
) */
const {data: {resources: daos}} = daosJSON;
export default function userHandler(req, res) {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      // Get data from your database
      //console.log(daos);
        let matchNames = daos.filter((dao) => dao.name.toLowerCase().includes(id.toLowerCase()))
        //console.log(matchNames)
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