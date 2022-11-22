/*
Here we manage the user interface.
*/

function changeTitleAndHideParagraph() {
    let name = getName();
    $(".paragraph").hide();  // Hides the paragraph
    $("h1").text("Salut "+name+" !")  // Change title text
}

class View {
    static loadSuggestions(suggestions, likes) {
        /* Loads the data contained in a list of 3 excursions into the cards of generation.html */
        for (let i of [1, 2, 3]) {
            let exc = suggestions[i-1];
            for (let j of [1, 2, 3, 4, 5]) {
                $("#stage"+i+"-"+j).text(`${j}: `+exc[j-1].name);
            }
            View.loadMap("mapdiv"+i, exc);
        }
    }

    static loadSummary(excursion) {
        for (let i of [1, 2, 3, 4, 5]) {
            $("#type"+i).text(excursion[i-1].type === "museum" ? "Musée" : excursion[i-1].type === "monument" ? "Monument" : "Événement");
            $("#title"+i).text(excursion[i-1].name)
        }
        View.loadMap("mapdiv", excursion);
    }

    static loadStage(excursion, stageID) {
        let stage = excursion[stageID-1]

        // Show and center map
        if ($("#mapdiv").data("ref") === undefined)
            View.loadMap("mapdiv", excursion);
        View.centerMap($("#mapdiv").data("ref"), stage.longitude, stage.latitude, 18);

        // Change displayed info
        $("#stageName").text(stage.name);

        $("#infoContainer").empty();
        if (stage.address)
            $("#infoContainer").append(`<span class="fs-4"><i class="bi bi-pin-map-fill"></i> ${stage.address}</span>`);
        if (stage.phone)
            $("#infoContainer").append(`<span class="fs-4"><i class="bi bi-telephone-fill"></i> ${stage.phone}</span>`);
        if (stage.mail)
            $("#infoContainer").append(`<span class="fs-4"><i class="bi bi-envelope-fill"></i> ${stage.mail}</span>`);

        $("#stageDescription").text("");
        if (stage.description)
            $("#stageDescription").text(stage.description);

        // Change UI components
        if (stageID > 1)
            $("#previousButton").removeClass("disabled");

        for (let s of [1, 2, 3, 4, 5]) {
            if (s === stageID)
                $("#btnradio"+s).prop("checked", true);
            else
                $("#btnradio"+s).prop("checked", false);
        }

        if (stageID < 5) {
            $("#nextButton").text("Suivant");
        }
        else {
            $("#nextButton").text("Fini !");
        }
    }

    static thank(appreciation) {
        $("#thank-message").prop("hidden", false);
        $("#message-did-not-like").prop("hidden", appreciation !== 0);
        $("#message-did-like").prop("hidden", appreciation !== 2);
    }

    static loadMap(mapID, excursion) {
        // Instantiate map and save its reference into the DOM
        let map = new OpenLayers.Map(mapID);
        $("#"+mapID).data("ref", map);
        map.addLayer(new OpenLayers.Layer.OSM());

        // Center map to average location of the excursion
        View.centerMap(map,
            excursion.reduce((a, s) => a+s.longitude, 0)/excursion.length,  // Avergage longitude
            excursion.reduce((a, s) => a+s.latitude, 0)/excursion.length,  // Avergage latitude
            13.5  // Zoom
            )

        // Add markers to the map
        let markers = new OpenLayers.Layer.Markers( "Markers" );
        map.addLayer(markers);

        for (let stage of excursion) {
            let loc = new OpenLayers.LonLat(stage.latitude, stage.longitude)
                .transform(
                    new OpenLayers.Projection("EPSG:4326"),
                    map.getProjectionObject()
                );
            markers.addMarker(new OpenLayers.Marker(loc));
        }
    }

    static centerMap(map, longitude, latitude, zoom) {
        let coord = new OpenLayers.LonLat(latitude, longitude).transform(
            new OpenLayers.Projection("EPSG:4326"),
            map.getProjectionObject()
        );

        map.setCenter(coord, zoom);
    }
}