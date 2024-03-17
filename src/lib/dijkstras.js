// the same dijkstras algorithm but rewritten in javascript
// just in case it's easier to make that work with the react app

const V = 13;

const locNames = [
  "Snell Ground",
  "Swess? Intersection",
  "Churchill Tunnel",
  "Snell Tunnel",
  "Hayden Intersection",
  "Hayden Dunkin'",
  "Richards Ground",
  "Ell Tunnel Right",
  "Ell Ground Right",
  "Curry Service Desk",
  "Ell Tunnel Left",
  "Ell Ground Left",
  "Mugar Ground",
];

function minDistance(dist, sptSet) {
  let min = Infinity;
  let min_index;

  for (let v = 0; v < V; v++) {
    if (sptSet[v] === false && dist[v] <= min) {
      min = dist[v];
      min_index = v;
    }
  }
  return min_index;
}

function printPath(parent, j, src) {
  if (parent[j] === -1) {
    console.log(names[src] + " ");
    return;
  }

  printPath(parent, parent[j], src);
  console.log("-> " + names[j] + " ");
}

function printSolution(dist, parent, src, dest) {
  console.log("Shortest path from " + names[src] + " to " + names[dest] + ":");
  printPath(parent, dest, src);
  console.log();
  console.log("Seconds to Walk: " + dist[dest]);
  console.log(
    "Time to Walk: " +
      Math.floor(dist[dest] / 60) +
      " minutes, " +
      (dist[dest] - Math.floor(dist[dest] / 60) * 60) +
      " seconds"
  );
}

function printAllSolution(dist, parent, src) {
  console.log("Vertex \t\t\t\t Distance from Source \t\t Path");
  for (let i = 0; i < V; i++) {
    console.log(names[i] + " \t\t " + dist[i] + " \t\t\t\t ");
    printPath(parent, i, src);
    console.log();
  }
}

function dijkstras(graph, src, destination) {
  const dist = new Array(V);
  const sptSet = new Array(V).fill(false);
  const parent = new Array(V).fill(-1);

  for (let i = 0; i < V; i++) {
    dist[i] = Infinity;
    sptSet[i] = false;
  }

  dist[src] = 0;

  for (let count = 0; count < V - 1; count++) {
    const u = minDistance(dist, sptSet);
    sptSet[u] = true;

    for (let v = 0; v < V; v++) {
      if (
        !sptSet[v] &&
        graph[u][v] &&
        dist[u] !== Infinity &&
        dist[u] + graph[u][v] < dist[v]
      ) {
        parent[v] = u;
        dist[v] = dist[u] + graph[u][v];
      }
    }
  }

  // printAllSolution(dist, parent, src);
  printSolution(dist, parent, src, destination);
}

const graph = [
  [0, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // SNELL GROUND (0)
  [60, 0, 55, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // SWEESS INTERSECTION (1)
  [0, 55, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0], // CHURCHILL TUNNEL (2)
  [0, 0, 18, 0, 55, 0, 0, 0, 0, 0, 0, 0, 0], // SNELL TUNNEL (3)
  [0, 0, 0, 55, 0, 35, 35, 15, 0, 0, 0, 0, 0], // HAYDEN INTERSECTION (4)
  [0, 0, 0, 0, 35, 0, 22, 0, 0, 0, 0, 0, 0], // HAYDEN DUNKIN' (5)
  [0, 0, 0, 0, 35, 22, 0, 0, 0, 0, 0, 0, 0], // RICHARDS GROUND (6)
  [0, 0, 0, 0, 15, 0, 0, 0, 18, 38, 30, 0, 0], // ELL TUNNEL RIGHT (7)
  [0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 30, 0, 0], // ELL GROUND RIGHT (8)
  [0, 0, 0, 0, 0, 0, 0, 38, 0, 0, 30, 0, 0], // CURRY SERVICE DESK (9)
  [0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 20, 44], // ELL TUNNEL LEFT (10)
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0], // ELL GROUND LEFT (11)
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44, 0, 0], // MUGAR GROUND (12)
];

const source = parseInt(prompt("Enter Source: "));
const destination = parseInt(prompt("Enter Destination: "));

console.log();
dijkstras(graph, source, destination);
