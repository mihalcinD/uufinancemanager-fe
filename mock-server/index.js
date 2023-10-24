const express = require('express')
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const app = express()
const port = 3007

const householdRouter = require("./routes/household");
const identityRouter = require("./routes/identity");
const savingRouter = require("./routes/saving");
const transactionRouter = require("./routes/transaction");


// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: 'http://localhost:300',
  issuerBaseURL: `https://dev-ducb3de5dqthsoxl.us.auth0.com/`,
});

app.get('/', (_req, _res) => {
  _res.send('Hello World!')
})

app.use("/household", checkJwt, householdRouter)
app.use("/identity", checkJwt, identityRouter)
app.use("/saving", checkJwt, savingRouter)
app.use("/transaction", checkJwt, transactionRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})