// import { dir } from "console";

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const PORT = 8080;
const {json} = require('express')
app.use(cors());
const db = require('./models/entryModel.js');
// At the top of your server file
const { DMX, EnttecUSBDMXProDriver } = require("dmx-ts");
const dmx = new DMX();
let universe;

// You might need to replace this with the actual path to your DMX USB device
const serialPort = '/dev/tty.usbserial-EN286139';



//const { entryController } = require('./controllers/entryController.js');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'..','dist')));
// app.use('/media', express.static(path.join(__dirname,'..','assets')))


app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.post('/dmx/connect', async (req, res) => {
  console.log('inside dmx/connect')
  try {
    universe = await dmx.addUniverse('demo', new EnttecUSBDMXProDriver(serialPort));
    res.status(200).send({ message: `Connected to DMX interface at ${serialPort}` });

  } catch (err) {
    console.error('Failed to connect:', err);
    res.status(500).send('Failed to connect to DMX interface');
  }
});
app.post('/dmx/on', async (req, res) => {
  console.log('UPDATING COLOR TO ',req.body.outgoingUniverse)
  try {
    const channelValues = req.body.outgoingUniverse;
    // universe.updateAll(250)
    universe.update(channelValues);
    // universe.updateAll(250)
    // for (const [channel, value] of Object.entries(channelValues)) {
    //   console.log(channel,value)
    //   universe.update({channel: value});
    // }

    // console.log('Channels updated',channelValues);
    res.status(200).send('Channels updated');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to update channels');
  }
});

app.post('/dmx/off', async (req, res) => {
  try {
    universe.updateAll(0);
    console.log('off');
    res.status(200).send('Turned off');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to turn off');
  }
});

app.post('/dmx/disconnect', async (req, res) => {
  try {
    universe.close();
    res.status(200).send('Disconnected from DMX interface');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to disconnect from DMX interface');
  }
});



app.get('/assets/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  console.log('inside image send route')
  res.sendFile(path.join(__dirname, '..', 'assets', imageName));
});

app.get('/assets/:videoName', (req, res) => {
  const videoName = req.params.videoName;
  const videoPath = path.join(__dirname, '..', 'assets', videoName);
  res.type('video/quicktime');
  res.sendFile(videoPath);
});


//app.get('/',(req,res)=>res.status(200).sendFile(path.resolve(__dirname, '../client/index.html')));
app.get('/media',
       (req,res)=>{
        console.log('red horiz path')
        return (res.status(200).json({'test':'test'}))})

app.get('/retrieve', (req,res)=>{
    console.log('@ /retrieve')
    db.query('SELECT * FROM entries')
    .then((data)=>{
        console.log('@ first .then()')
        console.log(data.rows)
        //console.log(data.json())
        
        res.locals.return = data.rows
        res.status(200).json({'response':'success'})})
    .catch(()=>({log:'error',message:'error In /retrieve', status:500}));
})
// //route error handler
app.use((req, res) => {
  res.status(404).send('Sorry, we cannot find that!');
});
// app.get('*', (req,res)=>res.status(404).json({hello:'we\'ve been trying to reach you about your car\'s extended warranty'}));
//global error handler
app.use((err, req, res, next)=>{

  const GEH = {
    log: 'global error handler',
    message: `somewhere, a developer is about to get fired ` ,
    status: 500
  };
  Object.assign(GEH,err);
  res.status(GEH.status).json(GEH.message);
});

app.listen(PORT, ()=> console.log( 'listening on port ' + PORT));