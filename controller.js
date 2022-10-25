/*
Here we manage all the input from the user and call the various other scripts
to treat them correctly
*/

$("#clickButton").click(() => {
  let newName = $("#exampleInput").val()
  changeName(newName);
  changeTitleAndHideParagraph();
})
