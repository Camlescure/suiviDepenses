const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = process.env.PORT || 4000;
const host = process.env.HOST || '127.0.0.1';
const cors = require('cors');
const app = express();
const fs = require('fs');

app.use(morgan('dev'));
app.use(cors({ 
  origin: '*'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.json('Fake API')
});

app.get('/mon/ping', (req, res) => {
  res.json({
    status: 'OK',
    cds_version: {
    }
  })
});

app.get('/depenses', handler_get('./depenses.json'));
console.log(`Start on :${port}`);
app.listen(port, host);

app.post('/depense', function(request, response) {
    console.log('POST /depense')
    let newDep = request.body
    let rawdata = fs.readFileSync('./server/depenses.json');
    let alldeps = JSON.parse(rawdata);
    alldeps.push(newDep);
    let data = JSON.stringify(alldeps, null, 4);
    fs.writeFileSync("./server/depenses.json", data)
    response.setHeader('Content-Type', 'application/json');
    response.end(data)
  
  });
  

function handler_get(pth) {
    const data = require(pth)
    return (req, res) => {
      res.json(data)
    }
  };