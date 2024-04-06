// the same Dijkstra.cpp but rewritten in JavaScript
// just in case it's easier to make that work with the react app
// to run, use Chrome console

import locations from "@/lib/nodes.json";
import { graph, graphTurns } from "@/lib/graphs";

let path = "";
let result = "";
export let time = "";
const graphLoc = graph;
const graphDir = graphTurns;

const V = locations.nodes.length;
const names = locations.nodes.map((item) => item.name);

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

function getRestPath(dist, parent, destination, turns) {
  let currentVertex = destination;
  while (currentVertex !== -1) {
    const previousVertex = parent[currentVertex];
    if (previousVertex === -1) {
      break; // Exit the loop if there is no parent vertex
    }
    const seconds = dist[currentVertex] - dist[previousVertex];
    path =
      "@" +
      turns[currentVertex] +
      "@" +
      " ^ (" +
      seconds +
      " seconds) ^ " +
      names[currentVertex] +
      path;
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

  getRestPath(dist, parent, destination, turns);
  printSolution(dist, parent, source, destination);
  printTime(dist, parent, source, destination);
  console.log("Result: ", result);
  return result;
}

export default dijkstras;
