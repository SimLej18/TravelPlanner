/*
Here we recover all the data from the different APIs and format it to make it
available to other scripts via soma async functions.
*/

class Stage {
    /*
    * This class defines a stage (aka. a stop, a halt) in an excursion
    */
    constructor(name, longitude, latitude) {
        if (name === "null" || longitude === "null" || latitude === "null")
            throw new Error("Mandatory field is null.")
        this.name = name;
        this.longitude = longitude
        this.latitude = latitude
    }
}

class Event extends Stage {
    /*
    * This class defines an event, stages only available for a limited time
    */
    constructor(name, longitude, latitude, start, finish, address, description, link) {
        super(name, longitude, latitude);
        this.type = "event";
        this.name = name;
        this.start = start;
        this.finish = finish;
        this.address = address;
        this.description = description;
        this.link = link;
    }
}

class Museum extends Stage {
    /*
    * This class defines a museum, building where you can make a visit
    */
    constructor(name, longitude, latitude, address, description, phone, mail) {
        super(name, longitude, latitude);
        this.type = "museum";
        this.address = address;
        this.description = description;
        this.phone = phone;
        this.mail = mail;
    }
}

class Monument extends Stage {
    /*
    * This class defines a monument, interesting piece of architecture to see
    */
    constructor(name, longitude, latitude) {
        super(name, longitude, latitude);
        this.type = "monument";
    }
}

async function getEvents(){
    /*
    * Cette fonction renvoie une liste d'Event contenant les infos de chaque event
    */
    let events = []

    // Fetch data into JSON
    let res = await fetch('https://data.namur.be/api/records/1.0/search/?dataset=namur-agenda-des-evenements&q=&rows=999&sort=datedebut&facet=title&facet=datedebut&facet=datefin&facet=post_code&facet=acom_nom_m&facet=rue_nom&facet=adr_nopol');
    let data = await res.json();

    // Load data into Event instances
    for (record of data.records) {
        try {
            events.push( new Event(
                record.fields.title != null ? record.fields.title : "null",  // Name
                record.fields.geo_point_2d[0],  // Longitude
                record.fields.geo_point_2d[1],  // Latitude
                record.fields.datedebut != null ? new Date(record.fields.datedebut) : "null",  // Start
                record.fields.datefin != null ? new Date(record.fields.datefin) : "null", // Finish
                record.fields.acom_nom_m != null ? record.fields.rue_nom + " " + record.fields.adr_nopol + ", " + record.fields.post_code + " " + record.fields.acom_nom_m : "null",  // Address
                record.fields.details != null ? record.fields.details : "null", // Finish
                record.fields.link != null ? record.fields.link : "null" // Finish
            ));
        }
        catch {}
    }

    // Done
    return events;
}

async function getCurrentEvents(date) {
    /*
    * Cette fonction renvoie la liste des événements ayant lieu à la date indiquée
    */
    return (await getEvents()).filter(e => date > e.start && date < e.finish);
}

async function getMuseums() {
    /*
    * Cette fonction renvoie une liste de Museum contenant les infos de chaque musée
    */
    let museums = []

    // Fetch data into JSON
    let res = await fetch('https://data.namur.be/api/records/1.0/search/?dataset=namur-annuaire-musees&q=&facet=ville&rows=999');
    let data = await res.json();

    // Load data into Museum instances
    for (record of data.records) {
        try {
            museums.push( new Museum(
                record.fields.titre != null ? record.fields.titre : "null",  // Name
                record.fields.geo_point_2d != null ? record.fields.geo_point_2d[0] : "null",  // Longitude
                record.fields.geo_point_2d != null ? record.fields.geo_point_2d[1] : "null",  // Latitude
                record.fields.ville != null ? record.fields.rue + " " + record.fields.numero + ", " + record.fields.code_postal + " " + record.fields.ville : "null",  // Address
                record.fields.description != null ? record.fields.description : "null", // Description
                record.fields.telephone != null ? record.fields.telephone : "null", // Phone
                record.fields.courriel != null ? record.fields.courriel : "null" // Mail
            ));
        }
        catch {}
    }

    // Done
    return museums;
}

async function getMonuments() {
    /*
    * Cette fonction renvoie une liste de Monument contenant les infos de chaque monument
    */
    let monuments = []

    // Fetch data into JSON
    let res = await fetch('https://data.namur.be/api/records/1.0/search/?dataset=patrimoine-wallon-monuments&q=&facet=referentie&facet=province&facet=arrondissement&facet=canton&facet=commune&rows=999');
    let data = await res.json();

    // Load data into Museum instances
    for (record of data.records) {
        try {
            monuments.push( new Monument(
                record.fields.libelle != null ? record.fields.libelle : "null",  // Name
                record.fields.geo_point_2d != null ? record.fields.geo_point_2d[0] : "null",  // Longitude
                record.fields.geo_point_2d != null ? record.fields.geo_point_2d[1] : "null",  // Latitude
            ));
        }
        catch {}
    }

    // Done
    return monuments;
}

function getRandomExistingExcursionID(mockDatabase) {
    /*
    * Cette fonction renvoie une excursion existante aléatoire
    */
    return Math.floor(Math.random()*mockDatabase.excursions.length);
}
