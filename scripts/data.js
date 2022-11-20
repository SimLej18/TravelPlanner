/*
Here we recover all the data from the different APIs and format it to make it
available to other scripts via soma async functions.
*/

var name;

function changeName(newName) {
  name = newName;
}

function getName() {
  return name;
}

class Stage {
    /*
    * This class defines a stage (aka. a stop, a halt) in an excursion
    */
    constructor() {

    }

}

class Event extends Stage {
    /*
    * This class defines an event, stages only available for a limited time
    */
    constructor() {
        super();
    }
}

class Museum extends Stage {
    /*
    * This class defines a museum, building where you can make a visit
    */
    constructor() {
        super();

    }
}

class Monument extends Stage {
    /*
    * This class defines a monument, interesting piece of architecture to see
    */
    constructor() {
        super();
    }
}

/* Cette fonction renvoie une série de liste, chaque liste contient, par exemple, tous les noms de tous les évenements. 
Pour travailler avec un évenement particulier, il suffit de mettre le même index dans chaque liste. Les champs repris de sont, pour l'instant jamais null donc ça ne pose pas de soucis 
*/
function getEvent(){
    fetch('https://data.namur.be/api/records/1.0/search/?dataset=namur-agenda-des-evenements&q=&rows=10&sort=datedebut&facet=title&facet=datedebut&facet=datefin&facet=post_code&facet=acom_nom_m&facet=rue_nom&facet=adr_nopol')
    .then(res => {return res.json()})
    .then(data => {
        const event_name = [];
        for (let i = 0; i < data.records.length; i++) {
            if (data.records[i].fields.title != null) {
            event_name.push(data.records[i].fields.title);} 
            else {event_name.push("null");}
        }
        const event_debut = [];
        for (let i = 0; i < data.records.length; i++) {
            if (data.records[i].fields.datedebut != null) {
            event_debut.push(data.records[i].fields.datedebut);}
            else {event_debut.push("null");}
        }
        const event_fin = [];
        for (let i = 0; i < data.records.length; i++) {
            if (data.records[i].fields.datefin != null) {
            event_fin.push(data.records[i].fields.datefin);}
            else {event_fin.push("null");}
        }
        const event_adress = [];
        for (let i = 0; i < data.records.length; i++) {
            if (data.records[i].fields.acom_nom_m != null) {
            event_adress.push(data.records[i].fields.rue_nom + " " + data.records[i].fields.adr_nopol + ", " + data.records[i].fields.post_code + " " + data.records[i].fields.acom_nom_m);}
            else {event_adress.push("null");}
        }
        const event_description = [];
        for (let i = 0; i < data.records.length; i++) {
            if (data.records[i].fields.details != null) {
            event_description.push(data.records[i].fields.details);}
            else {event_description.push("null");}
        }
        const link = [];
        for (let i = 0; i < data.records.length; i++) {
            if (data.records[i].fields.link != null) {
            link.push(data.records[i].fields.link);}
            else {link.push("null");}
        }
        const coord = [];
        for (let i = 0; i < data.records.length; i++) {
            if (data.records[i].fields.geo_point_2d != null) {
            coord.push(data.records[i].fields.geo_point_2d);}
            else {coord.push("null");}
        }
        document.getElementById('event').innerHTML = event_name + " || " + event_debut + " || " + event_fin + " || " + event_adress + " || " + event_description + " || " + link + ' || ' + coord;
    })
    .catch(err => console.log(err));
    return document.getElementById('event').innerHTML
}
function getMuseum() {
    fetch('https://data.namur.be/api/records/1.0/search/?dataset=namur-annuaire-musees&q=&facet=ville')
    .then(res => {return res.json()})
    .then(data2 => {
        
        const museum_name = [];
        for (let i = 0; i < data2.records.length; i++) {
            if (data2.records[i].fields.titre != null) {
                museum_name.push(data2.records[i].fields.titre);}
            else { museum_name.push("null");}
        }
        const museum_adress = [];
        for (let i = 0; i < data2.records.length; i++) {
            if (data2.records[i].fields.ville != null) {
            museum_adress.push(data2.records[i].fields.rue + " " + data2.records[i].fields.numero + ", " + data2.records[i].fields.code_postal + " " + data2.records[i].fields.ville);}
            else { museum_adress.push("null");}
        }
        const museum_phone = [];
        for (let i = 0; i < data2.records.length; i++) {
            if (data2.records[i].fields.telephone != null) {
                museum_phone.push(data2.records[i].fields.telephone);}
            else {museum_phone.push("null");}}
        const museum_email = [];
        for (let i = 0; i < data2.records.length; i++) {
            if (data2.records[i].fields.courriel != null) {
            museum_email.push(data2.records[i].fields.courriel);}
            else {museum_email.push("null");}
        }
        const museum_description = [];
        for (let i = 0; i < data2.records.length; i++) {
            if (data2.records[i].fields.description != null) {
            museum_description.push(data2.records[i].fields.description);}
            else {museum_description.push("null");}
        }
        const museun_coord = [];
        for (let i = 0; i < data2.records.length; i++) {
            if (data2.records[i].fields.geo_point_2d != null) {
            museun_coord.push(data2.records[i].fields.geo_point_2d);}
            else {museun_coord.push("null");}
        }
        document.getElementById('museum').innerHTML = museum_name + " || " + museum_adress + " || " + museum_phone + " || " + museum_email + " || " + museum_description + " || " + museun_coord;
        }) 
        
     
    .catch(err => console.log(err));

    return document.getElementById('museum').innerHTML
}

// attention que les coordonnées vont par 2 et donc pour chaque monument faut prendre [i] et [i+1]

function getMonument() {
    fetch('https://data.namur.be/api/records/1.0/search/?dataset=patrimoine-wallon-monuments&q=&facet=referentie&facet=province&facet=arrondissement&facet=canton&facet=commune')
    .then(res => {return res.json()})
    .then(data1 => {
        const monument_name = [];
        for (let i = 0; i < data1.records.length; i++) {
            if (data1.records[i].fields.libelle != null) {
            monument_name.push(data1.records[i].fields.libelle);}
            else {monument_name.push("null");}
        }
        const monument_coord = [];
        for (let i = 0; i < data1.records.length; i++) {
            if (data1.records[i].fields.geo_point_2d != null) {
            monument_coord.push(data1.records[i].fields.geo_point_2d)}
            else {monument_coord.push("null");}
        }
        document.getElementById('monument').innerHTML = monument_name + " || " + monument_coord;
        })
    .catch(err => console.log(err));
    return document.getElementById('monument').innerHTML
}


/* 

<html><body>
  <div id="mapdiv"></div>
  <script src="http://www.openlayers.org/api/OpenLayers.js"></script>
  <style type="text/css">
      html, body, #basicMap {
          width: 100%;
          height: 100%;
          margin: 0;
      }
  </style>
  <script>
    map = new OpenLayers.Map("mapdiv");
    map.addLayer(new OpenLayers.Layer.OSM());
    
    var lonLat = new OpenLayers.LonLat(4.86,50.465)
          .transform(
            new OpenLayers.Projection("EPSG:4326"), 
            map.getProjectionObject()
          );
          
    var zoom=15;

    var markers = new OpenLayers.Layer.Markers( "Markers" );
    map.addLayer(markers);
    

    //Add marker 
    var event1 = new OpenLayers.LonLat(4.8712975446,50.4633886)
          .transform(
            new OpenLayers.Projection("EPSG:4326"), 
            map.getProjectionObject()
          );

    var event2 = new OpenLayers.LonLat(4.89,50.47)
    .transform(
      new OpenLayers.Projection("EPSG:4326"), 
      map.getProjectionObject()
    );
          
    markers.addMarker(new OpenLayers.Marker(event1)); //add marker to map

    markers.addMarker(new OpenLayers.Marker(event2));
    
    map.setCenter (lonLat, zoom);
  </script>
</body></html>

*/
