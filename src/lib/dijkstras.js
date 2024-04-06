// the same Dijkstra.cpp but rewritten in JavaScript
// just in case it's easier to make that work with the react app
// to run, use Chrome console

import locations from "@/lib/nodes.json";

let path = "";
let result = "";
export let time = "";

const V = locations.nodes.length;
const names = locations.nodes.map((item) => item.name);
export const graph = [
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
/*
function getRestPath(parent, destination) {
  let currentVertex = destination;
  while (currentVertex !== -1) {
    path = "-> " + names[currentVertex] + "\n" + path;
    currentVertex = parent[currentVertex];
  }
} */

function getRestPath(dist, parent, destination) {
  let currentVertex = destination;
  while (currentVertex !== -1) {
    const previousVertex = parent[currentVertex];
    if (previousVertex === -1) {
      break; // Exit the loop if there is no parent vertex
    }
    const seconds = dist[currentVertex] - dist[previousVertex];
    path = "-> " + names[currentVertex] + "\n" + " ^ " + seconds + " seconds to" + "\n" + path;
    currentVertex = previousVertex; // Update currentVertex to its parent for the next iteration
  }
}

function printSolution(dist, parent, src, dest) {
  result += "\u000A" + path + "\u000A";
  console.log(result);
}

function printTime(dist, parent, src, dest) {
  time = "";
  time += "\n";
  time +=
    Math.floor(dist[dest] / 60) +
    " minutes, " +
    (dist[dest] - Math.floor(dist[dest] / 60) * 60) +
    " seconds";
  return time;
}

function dijkstras(graph, source, destination) {
  path = "";
  result = "";
  source = locations.nodes.findIndex((item) => item.name === source);
  destination = locations.nodes.findIndex((item) => item.name === destination);

  const dist = new Array(V);
  const sptSet = new Array(V).fill(false);
  const parent = new Array(V).fill(-1);

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
      }
    }
  }

  getRestPath(dist, parent, destination);
  printSolution(dist, parent, source, destination);
  printTime(dist, parent, source, destination);
  console.log("Result: ", result);
  return result;
}

export default dijkstras;
