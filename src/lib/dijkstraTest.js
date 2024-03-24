
let path = "hello world";
const V = 15;
const names = [
  "Snell Ground",
  "Sweess Intersection",
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
  "Dodge Tunnel",
  "Dodge Ground",
];
const graph = [
  [0, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // SNELL GROUND (0)
  [60, 0, 55, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // SWEESS INTERSECTION (1)
  [0, 55, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // CHURCHILL TUNNEL (2)
  [0, 0, 18, 0, 55, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // SNELL TUNNEL (3)
  [0, 0, 0, 55, 0, 35, 35, 15, 0, 0, 0, 0, 0, 0, 0], // HAYDEN INTERSECTION (4)
  [0, 0, 0, 0, 35, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0], // HAYDEN DUNKIN' (5)
  [0, 0, 0, 0, 35, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0], // RICHARDS GROUND (6)
  [0, 0, 0, 0, 15, 0, 0, 0, 18, 38, 30, 0, 0, 0, 0], // ELL TUNNEL RIGHT (7)
  [0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 30, 0, 0, 0, 0], // ELL GROUND RIGHT (8)
  [0, 0, 0, 0, 0, 0, 0, 38, 0, 0, 30, 0, 0, 0, 0], // CURRY SERVICE DESK (9)
  [0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 20, 44, 30, 0], // ELL TUNNEL LEFT (10)
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0], // ELL GROUND LEFT (11)
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44, 0, 0, 0, 0], // MUGAR GROUND (12)
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 22], // DODGE TUNNEL (13)
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0], // DODGE GROUND (14)
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

function getPath(parent, j, source) {

  if (parent[j] === -1) {
    path += names[source] + " ";
    return path;
  }

  //path += "-> " + names[j] + " ";
  //path += getPath(parent, parent[j], source);
  path += "-> " + names[j] + " ";
  console.log(path); 
}

/**
 * Returns the sum of two numbers.
 * @returns {String} Solution
 */
function printSolution(dist, parent, src, dest) {
  let result = "";
  result += "Shortest path from " + names[src] + " to " + names[dest] + ":\n";
  result += getPath(parent, dest, src) + "\n";
  result += "\nSeconds to Walk: " + dist[dest];
  result +=
    "\nTime to Walk: " +
    Math.floor(dist[dest] / 60) +
    " minutes, " +
    (dist[dest] - Math.floor(dist[dest] / 60) * 60) +
    " seconds";
  return result;
}

/**
 * Returns the path between a source and dest node
 * @param {number} source
 * @param {number} destination
 * @returns {Any} Solution
 */
function dijkstras(source, destination) {
  const dist = new Array(V);
  const sptSet = new Array(V).fill(false);
  const parent = new Array(V).fill(-1);

  for (let i = 0; i < V; i++) {
    dist[i] = 0;
    sptSet[i] = false;
  }

  dist[source] = 0;

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
  printSolution(dist, parent, source, destination);
}

const source = parseInt(prompt("Enter Source: "));
const destination = parseInt(prompt("Enter Destination: "));

console.log();
dijkstras(graph, source, destination);
console.log(path);
