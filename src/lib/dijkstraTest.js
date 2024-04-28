let path = "";
let result = "";
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
  [0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0], // ELL GROUND RIGHT (8)
  [0, 0, 0, 0, 0, 0, 0, 38, 0, 0, 30, 0, 0, 0, 0], // CURRY SERVICE DESK (9)
  [0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 20, 44, 30, 0], // ELL TUNNEL LEFT (10)
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0], // ELL GROUND LEFT (11)
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44, 0, 0, 0, 0], // MUGAR GROUND (12)
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 22], // DODGE TUNNEL (13)
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0], // DODGE GROUND (14)
];

const graphTurns = [
  [
    "",
    "Continue Straight ",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ], // SNELL GROUND (0)
  [
    "Continue Straight ",
    "",
    "Turn Right Before The Elevator ",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ], // SWEESS INTERSECTION (1)
  [
    "",
    "Turn Left At The End Of The Hallway ",
    "",
    "Continue Straight ",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ], // CHURCHILL TUNNEL (2)
  [
    "",
    "",
    "Continue Straight ",
    "",
    "Continue Straight, Then Turn Left At The End Of The Hallway ",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ], // SNELL TUNNEL (3)
  [
    "",
    "",
    "",
    "Continue Straight, Then Turn Right At The End Of The Hallway",
    "",
    "Climb The Stairs, Then Turn Right",
    "Follow Signs For Richards Hall, Then Climb The Stairs",
    "Follow Signs For Ell Hall",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ], // HAYDEN INTERSECTION (4)
  [
    "",
    "",
    "",
    "",
    "Descend The Stairs, Then Turn Right",
    "",
    "Continue Straight",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ], // HAYDEN DUNKIN' (5)
  [
    "",
    "",
    "",
    "",
    "Descend The Stairs, Turn Left, Turn Right",
    "Continue Straight",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ], // RICHARDS GROUND (6)
  [
    "",
    "",
    "",
    "",
    "Continue Straight",
    "",
    "",
    "",
    "Climb Stairs",
    "Turn Right At Bookstore Hallway",
    "Continue Straight",
    "",
    "",
    "",
    "",
  ], // ELL TUNNEL RIGHT (7)
  ["", "", "", "", "", "", "", "Descend Stairs", "", "", "", "", "", "", ""], // ELL GROUND RIGHT (8)
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "Turn Left At End Of Book Store Hallway",
    "",
    "",
    "Turn Right At End Of Book Store Hallway, Then Continue Straight",
    "",
    "",
    "",
    "",
  ], // CURRY SERVICE DESK (9)
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "Continue Straight",
    "",
    "",
    "",
    "Descend The Stairs",
    "Turn Right At End Of Hallway, Then Climb Stairs",
    "Continue Straught",
    "",
  ], // ELL TUNNEL LEFT (10)
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "Descend The Stairs",
    "",
    "",
    "",
    "",
  ], // ELL GROUND LEFT (11)
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "Descend Stairs, Then Turn Left At Lockers",
    "",
    "",
    "",
    "",
  ], // MUGAR GROUND (12)
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "Continue Straight",
    "",
    "",
    "",
    "Continue Straight, Then Climb The Stairs On The Left", // 14
  ], // DODGE TUNNEL (13)
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "Descend, Turn Right, Then Continue Straight", // 13
    "",
  ], // DODGE GROUND (14)
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

function getRestPath(parent, destination, turns) {
  let currentVertex = destination;
  while (currentVertex !== -1) {
    path = turns[currentVertex] + "-> " + names[currentVertex] + " " + path;
    currentVertex = parent[currentVertex];
  }
}

function printSolution(dist, parent, source, dest) {
  result +=
    "Shortest path from " + names[source] + " to " + names[dest] + ":\n";
  result += "\n" + path + "\n";
  result += "\nSeconds to Walk: " + dist[dest];
  result +=
    "\nTime to Walk: " +
    Math.floor(dist[dest] / 60) +
    " minutes, " +
    (dist[dest] - Math.floor(dist[dest] / 60) * 60) +
    " seconds";
}

function dijkstras(graph, source, destination) {
  const dist = new Array(V);
  const sptSet = new Array(V).fill(false);
  const parent = new Array(V).fill(-1);
  const turns = new Array(V);

  for (let i = 0; i < V; i++) {
    dist[i] = Infinity;
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
        turns[v] = graphTurns[u][v];
      }
    }
  }

  getRestPath(parent, destination, turns);
  printSolution(dist, parent, source, destination);
}

const source = parseInt(prompt("Enter Source: "));
const destination = parseInt(prompt("Enter Destination: "));

console.log();
dijkstras(graph, source, destination);
console.log(result);
