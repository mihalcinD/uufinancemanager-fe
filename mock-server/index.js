const express = require('express')
const app = express()
const port = 3007

const householdRouter = require("./routes/household");
const identityRouter = require("./routes/identity");
const savingRouter = require("./routes/saving");
const transactionRouter = require("./routes/transaction");

app.get('/', (_req, _res) => {
  res.send('Hello World!')
})

app.use("/household", householdRouter)
app.use("/identity", identityRouter)
app.use("/saving", savingRouter)
app.use("/transaction", transactionRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})