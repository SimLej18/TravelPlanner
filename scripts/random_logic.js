/*
Here we code the random itinerary generation.
*/

async function generateExcursion(date) {
  /*
  * Generate an excursion from all events recoverable from data.js available at a given date
  */
  let excursion = undefined;
  let graph =  await createGraph(date, 3);
  let valid = false;

  while (!valid) {
    excursion = getRandomPath(graph, 5);
    valid = validatePath(excursion);
  }

  return excursion;
}

async function createGraph(date, linkDistance) {
  /*
  * Return a graph with all events recovered from data.js
  * Events are linked if their distance apart is shorter than linkDistance
  */
  let graph = new graphology.Graph({allowSelfLoops: false});

  // Add nodes
  Utils.add(graph, "event", await getCurrentEvents(date))
  Utils.add(graph, "museum", await getMuseums())
  Utils.add(graph, "monument", await getMonuments())

  // Add links
  Utils.computeLinks(graph, linkDistance)

  // Remove non-connected nodes
  Utils.cleanGraph(graph)

  // Done
  return graph;
}

function getRandomPath(graph, nodeNb) {
  /*
  * Generate a random path including <nodeNb> nodes
  */
  let start = graph.nodes()[Math.floor(Math.random()*graph.nodes().length)];
  let path = [graph.getNodeAttribute(start, "object")];
  let visitedIDs = [start];
  let goneReverse = false;
  let current = start;

  while (path.length < nodeNb) {
    let neighbours = graph.filterNeighbors(current, n => !visitedIDs.includes(n));
    if (neighbours.length !== 0) {
      current = neighbours[Math.floor(Math.random()*neighbours.length)];
      path.push(graph.getNodeAttribute(current, "object"));
      visitedIDs.push(current);
    }
    else if (!goneReverse) {
      // Try from the other side of path
      current = start;
      goneReverse = true;
    }
    else {
      // Couldn't generate a path. Try again
      return getRandomPath(graph, nodeNb);
    }
  }

  return path;
}

function validatePath(path) {
  /*
  * Validate a given path. Verifications include :
  *   - path must go through at least a museum
  *   - path must go through at least two monuments
  * Return true if the path is valid, false otherwise
  */
  let valid = true;
  valid = valid && path.some(s => s instanceof Museum);
  valid = valid && path.filter(s => s instanceof Monument).length >= 2;
  return valid
}

class Utils {
  /*
  * This class contains utility methods to simplify the comprehension of the code above.
  */
  static add(graph, type, nodes) {
    let counter = graph.nodes().length;
    for (let node of nodes) {
      graph.addNode("n"+counter, {
        id: "n"+counter,
        type: type,
        object: node,
      })
      counter++;
    }
  }

  static computeLinks(graph, linkDistance) {
    for (let i = 0 ; i < graph.nodes().length ; i++) {
      for (let j = i+1 ; j < graph.nodes().length ; j++) {
        let nodeA = graph.nodes()[i];
        let nodeB = graph.nodes()[j];

        let stageA = graph.getNodeAttribute(nodeA, "object");
        let stageB = graph.getNodeAttribute(nodeB, "object");

        if (Utils.distanceBetween(stageA, stageB) < linkDistance) {
          graph.addEdge(nodeA, nodeB);
        }
      }
    }
  }

  static cleanGraph(graph) {
    for (let nodeID of graph.nodes()) {
      if (graph.neighbors(nodeID).length === 0) {
        graph.dropNode(nodeID);
      }
    }
  }

  static distanceBetween(stageA, stageB) {
    if ((stageA.latitude === stageB.latitude) && (stageA.longitude === stageB.longitude)) {
      return 0;
    }
    else {
      let radlat1 = Math.PI * stageA.latitude/180;
      let radlat2 = Math.PI * stageB.latitude/180;
      let theta = stageA.longitude-stageB.longitude;
      let radtheta = Math.PI * theta/180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515 * 1.609344;
      return dist;
    }
  }

}