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

/* Cette fonction renvoie une série de liste, chaque liste contient, par exemple, tous les noms de tous les évenements. 
Pour travailler avec un évenement particulier, il suffit de mettre le même index dans chaque liste. Les champs repris de sont, pour l'instant jamais null donc ça ne pose pas de soucis 
*/
function getEvent(){
    fetch('https://data.namur.be/api/records/1.0/search/?dataset=namur-agenda-des-evenements&q=&rows=10&sort=datedebut&facet=title&facet=datedebut&facet=datefin&facet=post_code&facet=acom_nom_m&facet=rue_nom&facet=adr_nopol')
    .then(res => {return res.json()})
    .then(data => {
        const event_name = [];
        for (let i = 0; i < data.records.length; i++) {
            event_name.push(data.records[i].fields.title);} 
        const event_debut = [];
        for (let i = 0; i < data.records.length; i++) {
            event_debut.push(data.records[i].fields.datedebut);}
        const event_fin = [];
        for (let i = 0; i < data.records.length; i++) {
            event_fin.push(data.records[i].fields.datefin);}
        const event_adress = [];
        for (let i = 0; i < data.records.length; i++) {
            event_adress.push(data.records[i].fields.rue_nom + " " + data.records[i].fields.adr_nopol + ", " + data.records[i].fields.post_code + " " + data.records[i].fields.acom_nom_m);}
        const event_description = [];
        for (let i = 0; i < data.records.length; i++) {
            event_description.push(data.records[i].fields.details);}
        const link = [];
        for (let i = 0; i < data.records.length; i++) {
            link.push(data.records[i].fields.link);}
        document.getElementById('event').innerHTML =  event_name + " || " + event_debut + " || " + event_fin + " || " + event_adress + " || " + event_description + " || " + link
    })
    .catch(err => console.log(err));
    return document.getElementById('event').innerHTML
}


// Même chose ici, attention qu'il y a des null, j'ai pas encore traité le problème
function getMuseum() {
    fetch('https://data.namur.be/api/records/1.0/search/?dataset=namur-annuaire-musees&q=&facet=ville')
    .then(res => {return res.json()})
    .then(data2 => {
        
        const museum_name = [];
        for (let i = 0; i < data2.records.length; i++) {
            museum_name.push(data2.records[i].fields.titre);}
        const museum_adress = [];
        for (let i = 0; i < data2.records.length; i++) {
            museum_adress.push(data2.records[i].fields.rue + " " + data2.records[i].fields.numero + ", " + data2.records[i].fields.code_postal + " " + data2.records[i].fields.ville);}
        const museum_phone = [];
        for (let i = 0; i < data2.records.length; i++) {
            museum_phone.push(data2.records[i].fields.telephone);}
        const museum_email = [];
        for (let i = 0; i < data2.records.length; i++) {
            museum_email.push(data2.records[i].fields.courriel);}
        const museum_description = [];
        for (let i = 0; i < data2.records.length; i++) {
            museum_description.push(data2.records[i].fields.description);}
        document.getElementById('museum').innerHTML = museum_name + " || " + museum_adress + " || " + museum_phone + " || " + museum_email + " || " + museum_description;
        })
        
     
    .catch(err => console.log(err));

    return document.getElementById('museum').innerHTML
}

// Ici aucun null donc pas de problème, mais attention que les coordonnées vont par 2 et donc pour chaque monument faut prendre [i] et [i+1]

function getMonument() {
    fetch('https://data.namur.be/api/records/1.0/search/?dataset=patrimoine-wallon-monuments&q=&facet=referentie&facet=province&facet=arrondissement&facet=canton&facet=commune')
    .then(res => {return res.json()})
    .then(data1 => {
        const monument_name = [];
        for (let i = 0; i < data1.records.length; i++) {
            monument_name.push(data1.records[i].fields.libelle);}
        const monument_adress = [];
        for (let i = 0; i < data1.records.length; i++) {
            monument_adress.push(data1.records[i].fields.geo_point_2d)}

        document.getElementById('monument').innerHTML = monument_name + " || " + monument_adress;
        })
    .catch(err => console.log(err));
    return document.getElementById('monument').innerHTML
}