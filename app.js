const express = require('express')
const app = express()
app.use(express.json())
const BTC_Routes = require('./routes/BTC/routes.js')
const ETH_Routes = require('./routes/ETH/routes.js')
const STD_Routes = require('./routes/routes.js')
app.use('/BTC' ,BTC_Routes)
app.use('/ETH' ,ETH_Routes)
app.use('/' ,STD_Routes)
// mibJp8dZVGj75p2Yie7bMDEdK3ixJ26XQn
// mrdwvWkma2D6n9mGsbtkazedQQuoksnqJV
const port = 3000
app.listen(3000, () => {
  console.log(`App running on port ${port}`)
})
