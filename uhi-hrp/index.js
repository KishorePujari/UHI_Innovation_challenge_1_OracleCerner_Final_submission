const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require("fs");
const port = process.env.PORT || 3000;
const geolib = require('geolib');

var cors = require('cors');


app.use(cors());

app.use(bodyParser.urlencoded({
    limit: '200mb',
    extended: true
}))
app.use(bodyParser.json({
    limit: '200mb'
}));
// let HRPInfo = {};
// try {
//     const jsonString = fs.readFileSync("./HRPInfo.json");
//     HRPInfo = JSON.parse(jsonString);
// } catch (err) {
//     console.log(err);
//     return;
// }

app.post("/", (req, resp) => {
    console.log('/POST');
    resp.status(200).send("HOME via POST");
});

app.get("/", (req, resp) => {
    console.log('/GET');
    resp.status(200).send("HOME");
});

app.get("/search", (req, resp) => {
    console.log('GET /locations');
    try {

        const jsonString = fs.readFileSync("./HRPInfo.json");
        const HRPInfo = JSON.parse(jsonString);
        let locations = [];

        for (let locationIndex = 0; locationIndex < HRPInfo.Locations.length; locationIndex++) {
            let location = {};

            location.name = HRPInfo.Locations[locationIndex].name;
            location.fee = HRPInfo.Locations[locationIndex].fee;
            location.std = HRPInfo.Locations[locationIndex].std;
            location.address = HRPInfo.Locations[locationIndex].address;
            location.country = HRPInfo.Locations[locationIndex].country;

            if (req.body && req.body.locationFlag && req.body.locationFlag == 1) {
                location.lat = HRPInfo.Locations[locationIndex].lat;
                location.long = HRPInfo.Locations[locationIndex].long;
                location.distance = geolib.getDistance({
                    latitude: req.body.lat,
                    longitude: req.body.lat
                }, {
                    latitude: HRPInfo.Locations[locationIndex].lat,
                    longitude: HRPInfo.Locations[locationIndex].long
                });
            }

            if (req.body && req.body.speciality && req.body.speciality.length > 0) {
                let doctors = [];
                for (let specialityIndex = 0; specialityIndex < HRPInfo.Locations[locationIndex].specialities.length; specialityIndex++) {
                    if (HRPInfo.Locations[locationIndex].specialities[specialityIndex].speciality == req.body.speciality) {


                        if (req.body.method == 1) // Teleconsultation
                        {
                            for (let docIndex = 0; docIndex < HRPInfo.Locations[locationIndex].specialities[specialityIndex].doctors.length; docIndex++) {
                                let doctor = {};
                                let doc = HRPInfo.Locations[locationIndex].specialities[specialityIndex].doctors[docIndex];
                                if (doc.consulationMethod.indexOf("Teleconsultation") >= 0) {
                                    doctor.name = doc.name;
                                    doctor.image = doc.image;
                                    doctor.rating = doc.rating;
                                    doctor.method = "Teleconsultation";
                                    doctors.push(doctor);
                                }
                            }

                        } else if (req.body.method == 2) // Physical
                        {
                            for (let docIndex = 0; docIndex < HRPInfo.Locations[locationIndex].specialities[specialityIndex].doctors.length; docIndex++) {
                                let doctor = {};
                                let doc = HRPInfo.Locations[locationIndex].specialities[specialityIndex].doctors[docIndex];
                                if (doc.consulationMethod.indexOf("Physical") >= 0) {
                                    doctor.name = doc.name;
                                    doctor.image = doc.image;
                                    doctor.rating = doc.rating;
                                    doctor.method = "Physical";
                                    doctors.push(doctor);
                                }
                            }
                        } else //Both
                        {
                            for (let docIndex = 0; docIndex < HRPInfo.Locations[locationIndex].specialities[specialityIndex].doctors.length; docIndex++) {
                                let doctor = {};
                                let doc = HRPInfo.Locations[locationIndex].specialities[specialityIndex].doctors[docIndex];
                                doctor.name = doc.name;
                                doctor.image = doc.image;
                                doctor.rating = doc.rating;
                                doctor.method = "Physical and Teleconsultation";
                                doctors.push(doctor);
                            }
                        }
                        break;
                    }
                }
                location.doctors = doctors;
            }

            locations.push(location);
        }
        resp.status(200).send(locations);
    } catch (err) {
        console.log(err);
        return;
    }


});
app.post("/search", (req, resp) => {
    console.log('GET /locations');
    try {

        const jsonString = fs.readFileSync("./HRPInfo.json");
        const HRPInfo = JSON.parse(jsonString);
        let locations = [];

        for (let locationIndex = 0; locationIndex < HRPInfo.Locations.length; locationIndex++) {
            let location = {};

            location.name = HRPInfo.Locations[locationIndex].name;
            location.fee = HRPInfo.Locations[locationIndex].fee;
            location.std = HRPInfo.Locations[locationIndex].std;
            location.address = HRPInfo.Locations[locationIndex].address;
            location.country = HRPInfo.Locations[locationIndex].country;

            if (req.body && req.body.locationFlag && req.body.locationFlag == 1) {
                location.lat = HRPInfo.Locations[locationIndex].lat;
                location.long = HRPInfo.Locations[locationIndex].long;
                location.distance = geolib.getDistance({
                    latitude: req.body.lat,
                    longitude: req.body.lat
                }, {
                    latitude: HRPInfo.Locations[locationIndex].lat,
                    longitude: HRPInfo.Locations[locationIndex].long
                });
            }

            if (req.body && req.body.speciality && req.body.speciality.length > 0) {
                let doctors = [];
                for (let specialityIndex = 0; specialityIndex < HRPInfo.Locations[locationIndex].specialities.length; specialityIndex++) {
                    if (HRPInfo.Locations[locationIndex].specialities[specialityIndex].speciality == req.body.speciality) {


                        if (req.body.method == 1) // Teleconsultation
                        {
                            for (let docIndex = 0; docIndex < HRPInfo.Locations[locationIndex].specialities[specialityIndex].doctors.length; docIndex++) {
                                let doctor = {};
                                let doc = HRPInfo.Locations[locationIndex].specialities[specialityIndex].doctors[docIndex];
                                if (doc.consulationMethod.indexOf("Teleconsultation") >= 0) {
                                    doctor.name = doc.name;
                                    doctor.image = doc.image;
                                    doctor.rating = doc.rating;
                                    doctor.method = "Teleconsultation";
                                    doctors.push(doctor);
                                }
                            }

                        } else if (req.body.method == 2) // Physical
                        {
                            for (let docIndex = 0; docIndex < HRPInfo.Locations[locationIndex].specialities[specialityIndex].doctors.length; docIndex++) {
                                let doctor = {};
                                let doc = HRPInfo.Locations[locationIndex].specialities[specialityIndex].doctors[docIndex];
                                if (doc.consulationMethod.indexOf("Physical") >= 0) {
                                    doctor.name = doc.name;
                                    doctor.image = doc.image;
                                    doctor.rating = doc.rating;
                                    doctor.method = "Physical";
                                    doctors.push(doctor);
                                }
                            }
                        } else //Both
                        {
                            for (let docIndex = 0; docIndex < HRPInfo.Locations[locationIndex].specialities[specialityIndex].doctors.length; docIndex++) {
                                let doctor = {};
                                let doc = HRPInfo.Locations[locationIndex].specialities[specialityIndex].doctors[docIndex];
                                doctor.name = doc.name;
                                doctor.image = doc.image;
                                doctor.rating = doc.rating;
                                doctor.method = "Physical and Teleconsultation";
                                doctors.push(doctor);
                            }
                        }
                        break;
                    }
                }
                location.doctors = doctors;
            }

            locations.push(location);
        }
        resp.status(200).send(locations);
    } catch (err) {
        console.log(err);
        return;
    }


});
app.get("/name_search", (req, resp) => {
    console.log('/name_search');
    resp.status(200).send("Name");
});
app.get("/specialization", (req, resp) => {
    console.log('GET /specialization');
    resp.status(200).send("specialization");
});
app.use((req, res) => {
    res.status(404).send("Unknown request");
})
app.listen(port, () => {
    console.log(`On port ${port}`);
})


function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    } else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
            dist = dist * 1.609344
        }
        if (unit == "N") {
            dist = dist * 0.8684
        }
        return dist;
    }
}