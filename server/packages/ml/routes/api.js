import express from 'express'
const router = express.Router()
import {getItems, getItem} from "../services";


router.get('/', async (req, res, next) => {

  res.status(200).send('ml-test apirest')
  
})


router.get('/items', async (req, res, next) => {
  try {

    /*
    setTimeout(async () => {
      let r = await getItems(req.query.q, req.query.limit, req.query.offset, req.query.full)
      res.status(200).send(r)
    }, 3000)
    */
    
    let r = await getItems(req.query.q, req.query.limit, req.query.offset, req.query.full)
    res.status(200).send(r)
    
  }
  catch(e) {
    console.log('Error:',e)
    res.status(500).send(e.message)
  }
})


router.get('/items/:id', async (req, res, next) => {
  try {
    let r = await getItem(req.params.id)
    res.status(200).send(r)
  }
  catch(e) {
    console.log('Error:',e.message)
    res.status(500).send(e.message)
  }
})





export default router