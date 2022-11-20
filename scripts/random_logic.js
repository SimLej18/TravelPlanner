/*
Here we code the random itinerary generation.
*/

function generateExcursion() {
  /*
  * Generate an excursion from all events recoverable from data.js
  */
  let excursion = undefined;
  let graph = createGraph(3);
  let valid = false;

  while (!valid) {
    excursion = getRandomPath(4);
    valid = validatePath(excursion);
  }

  return excursion;
}

function createGraph(linkDistance) {
  /*
  * Return a graph with all events recovered from data.js
  * Events are linked if their distance apart is shorter than linkDistance
  */
  let cy = cytoscape({});

  // Add nodes

  // Add links

  // Done
  return cy;
}

function getRandomPath(nodeNb) {
  /*
  * Generate a random path including <nodeNb> nodes
  */
}

function validatePath(path) {
  /*
  * Validate a given path. Verifications include :
  *   -
  * Return true if the path is valid, false otherwise
  */
}

class Utils {
  /*
  * This class contains utility methods to simplify the comprehension of the code above.
  */


}