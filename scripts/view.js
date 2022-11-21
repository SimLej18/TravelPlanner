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
        }
    }

    static loadSummary(excursion) {
        for (let i of [1, 2, 3, 4, 5]) {
            $("#type"+i).text(excursion[i-1].type === "museum" ? "Musée" : excursion[i-1].type === "monument" ? "Monument" : "Événement");
            $("#title"+i).text(excursion[i-1].name)
        }
    }
}