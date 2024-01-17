const express = require('express')
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const app = express()
const port = 3007

const householdRouter = require("./routes/household");
const tagRouter = require("./routes/tag");
const savingRouter = require("./routes/saving");
const transactionRouter = require("./routes/transaction");


//? Authorization middleware.
const checkJwt = auth({
  audience: 'http://localhost:300',
  issuerBaseURL: `https://dev-ducb3de5dqthsoxl.us.auth0.com/`,
});

//? Pro implementaci přihlašování apod je potřeba využít auth0
//? Na BE je už potřeba poslat jenom bearer token (access_token)
/*
  userName: kubalucky762@gmail.com
  userPassword: Heslo1234
  domain: dev-ducb3de5dqthsoxl.us.auth0.com
  clientId: 0xLrLmh2QJBfQjkv0IgDtRHignlRsiuk
  clientSecret: u-89mfKaGAX9aGQmsg5NvqfHaZkgNYjzEf25h5WhI4QU-rBdWjpNxUOxO0DdGqGA
*/

app.get('/', (_req, _res) => {
  _res.send('Hello World!')
})

app.use("/household", checkJwt, householdRouter)
app.use("/tag", checkJwt, tagRouter)
app.use("/saving", checkJwt, savingRouter)
app.use("/transactions", checkJwt, transactionRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
