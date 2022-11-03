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

fetch('https://data.namur.be/api/records/1.0/search/?dataset=namur-agenda-des-evenements&q=&rows=10&sort=datedebut&facet=title&facet=datedebut&facet=datefin&facet=post_code&facet=acom_nom_m&facet=rue_nom&facet=adr_nopol')
.then(res => {return res.json()})
.then(data => {
    console.log(data)
    data.records.forEach(element => {
        console.log(element.fields.title)
        console.log(element.fields.datedebut)
        console.log(element.fields.datefin)
        console.log(element.fields.post_code)
        console.log(element.fields.acom_nom_m)
        console.log(element.fields.rue_nom)
        console.log(element.fields.adr_nopol)
    });
    document.getElementById('eventName').innerHTML = "Nom : " + data.records[3].fields.title
    document.getElementById('eventDate').innerHTML = "Date de debut : " + data.records[3].fields.datedebut
    document.getElementById('eventEndDate').innerHTML = "Date de fin : " + data.records[3].fields.datefin
    document.getElementById('eventAdress').innerHTML = "Adresse : " + data.records[3].fields.rue_nom + " " + data.records[3].fields.adr_nopol + ", " + data.records[3].fields.post_code + " " + data.records[3].fields.acom_nom_m
    document.getElementById('eventDescription').innerHTML = "Description : " + data.records[3].fields.details
})
.catch(err => console.log(err));

fetch('https://data.namur.be/api/records/1.0/search/?dataset=patrimoine-wallon-monuments&q=&facet=referentie&facet=province&facet=arrondissement&facet=canton&facet=commune')
.then(res => {return res.json()})
.then(data1 => {
    console.log(data1)
    data1.records.forEach(element => {
        console.log(element.fields.geo_point_2d)
        console.log(element.fields.libelle)
        
    });
    document.getElementById('monumentLocation').innerHTML = "Location : " + data1.records[0].fields.geo_point_2d
    document.getElementById('monumentLibelle').innerHTML = "Nom : " + data1.records[0].fields.libelle
})  
.catch(err => console.log(err));

fetch('https://data.namur.be/api/records/1.0/search/?dataset=namur-annuaire-musees&q=&facet=ville')
.then(res => {return res.json()})
.then(data2 => {
    console.log(data2)
    data2.records.forEach(element => {
    
    });
    document.getElementById('museumName').innerHTML = "Nom : " + data2.records[0].fields.titre
    document.getElementById('museumAdress').innerHTML = "Adresse : " + data2.records[0].fields.rue + " " + data2.records[0].fields.numero + ", " + data2.records[0].fields.code_postal + " " + data2.records[0].fields.ville
    document.getElementById('museumPhone').innerHTML = "Téléphone : " + data2.records[0].fields.telephone
    document.getElementById('museumEmail').innerHTML = "Email : " + data2.records[0].fields.courriel
    document.getElementById('museumDescription').innerHTML = "Description  : " + data2.records[0].fields.description})
.catch(err => console.log(err));
