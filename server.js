const express = require('express');
const app = express();
const {login}= require('./google-api');
const { createEvent } = require("./meet");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) =>{
  response.send('it is working');
});

app.post('/', async (req, res)=>{
  const auth = await login();
  const {url,name} = await createEvent(auth, req.body.user_name);
  res.send({
    response_type: 'in_channel', // public to the channel
    text: `Join <${url}|${name}>`
  });
})

// listen for requests :)
const listener = app.listen(process.env.PORT, ()=> {
  console.log('Your app is listening on port ' + listener.address().port);
});
