const express = require('express');
const app = express();
const {createEvent} = require("./meet");

app.use(express.json());

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) =>{
  response.send('it is working');
});

app.post('/', async (req, res)=>{
  await createEvent();
  res.send({
    response_type: 'in_channel', // public to the channel
    text: 'URL'
  });
})

// listen for requests :)
const listener = app.listen(process.env.PORT, ()=> {
  console.log('Your app is listening on port ' + listener.address().port);
});
