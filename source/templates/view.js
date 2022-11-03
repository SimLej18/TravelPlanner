/*
Here we manage the user interface.
*/

function changeTitleAndHideParagraph() {
    let name = getName();
    $(".paragraph").hide();  // Hides the paragraph
    $("h1").text("Salut "+name+" !")  // Change title text
}
