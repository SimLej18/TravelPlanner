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
