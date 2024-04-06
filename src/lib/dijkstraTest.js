
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
  ["", "continue straight ", "", "", "", "", "", "", "", "", "", "", "", "", ""], // SNELL GROUND (0)
  ["continue straight ", "", "turn right before the elevator ", "", "", "", "", "", "", "", "", "", "", "", ""], // SWEESS INTERSECTION (1)
  ["", "turn left at the end of the hallway ", "", "continue straight ", "", "", "", "", "", "", "", "", "", "", ""], // CHURCHILL TUNNEL (2)
  ["", "", "continue straight ", "", "continue straight, then turn left at the end of the hallway ", "", "", "", "", "", "", "", "", "", ""], // SNELL TUNNEL (3)
  ["", "", "", "continue straight, then turn right at the end of the hallway", "", "climb the stairs, then turn right", "follow signs for Richards Hall, then climb the stairs", "follow signs for Ell Hall", "", "", "", "", "", "", ""], // HAYDEN INTERSECTION (4)
  ["", "", "", "", "descend the stairs, then turn right", "", "continue straight", "", "", "", "", "", "", "", ""], // HAYDEN DUNKIN' (5)
  ["", "", "", "", "descend the stairs, turn left, turn right", "continue straight", "", "", "", "", "", "", "", "", ""], // RICHARDS GROUND (6)
  ["", "", "", "", "continue straight", "", "", "", "climb stairs", "turn right at bookstore hallway", "continue straight", "", "", "", ""], // ELL TUNNEL RIGHT (7)
  ["", "", "", "", "", "", "", "descend stairs", "", "", "", "", "", "", ""], // ELL GROUND RIGHT (8)
  ["", "", "", "", "", "", "", "turn left at end of book store hallway", "", "", "turn right at end of book store hallway, then continue straight", "", "", "", ""], // CURRY SERVICE DESK (9)
  ["", "", "", "", "", "", "", "continue straight", "", "", "", "descend the stairs", "turn right at end of hallway, then climb stairs", "continue straught", ""], // ELL TUNNEL LEFT (10)
  ["", "", "", "", "", "", "", "", "", "", "descend the stairs", "", "", "", ""], // ELL GROUND LEFT (11)
  ["", "", "", "", "", "", "", "", "", "", "descend stairs, then turn left at lockers", "", "", "", ""], // MUGAR GROUND (12)
  ["", "", "", "", "", "", "", "", "", "", "continue straight", "", "", "", "", "continue straight, then climb the stairs on the left"], // DODGE TUNNEL (13)
  ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "descend, turn right, then continue straight", ""] // DODGE GROUND (14)
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
  result += "Shortest path from " + names[source] + " to " + names[dest] + ":\n";
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
