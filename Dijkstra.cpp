
// Thanks to Rishabh Arya: https://github.com/RishabhArya for the initial code. Modified by Ethan Tang: https://github.com/ethtang.
// Repository: https://github.com/RishabhArya/Campus-Navigation-System. MIT License. Copyright (c) 2019 Rishabh Arya.

#include <limits.h>
#include <stdio.h>
#include <iostream>
#include <vector>
using namespace std;

#define V 13

int source, destination;

string names[V] = {
    "SNELL GROUND",
    "SWEESS INTERSECTION",
    "CHURCHILL TUNNEL",
    "SNELL TUNNEL",
    "HAYDEN INTERSECTION",
    "HAYDEN DUNKIN'",
    "RICHARDS GROUND",
    "ELL TUNNEL RIGHT",
    "ELL GROUND RIGHT",
    "CURRY SERVICE DESK",
    "ELL TUNNEL LEFT",
    "ELL GROUND LEFT",
    "MUGAR GROUND",
};

int minDistance(int dist[], bool sptSet[]) { 
    int min = INT_MAX, min_index; 
  
    for (int v = 0; v < V; v++) {
        if (sptSet[v] == false && dist[v] <= min) {
            min = dist[v], min_index = v; 
        }
    }
    return min_index; 
}

void printPath(vector<int>& parent, int j, int src) {
    if (parent[j] == -1) {
        cout << names[src] << " ";
        return;
    }
  
    printPath(parent, parent[j], src);
    cout << "-> " << names[j] << " ";
}

void printSolution(int dist[], vector<int>& parent, int src, int dest) {
    cout << "Shortest path from " << names[source] << " to " << names[destination] << ":\n";
    printPath(parent, dest, src);
    cout << endl;
    cout << "Seconds to Walk: " << dist[dest] << endl;
    cout << "Time to Walk: " << (floor (((float) dist[dest]) / 60)) << " minutes, " 
    << dist[dest] - ((floor (((float) dist[dest]) / 60)) * 60) << " seconds" << endl;
}

void printAllSolution(int dist[], vector<int>& parent, int src) {
    printf("Vertex \t\t\t\t Distance from Source \t\t Path\n"); 
    for (int i = 0; i < V; i++) {
        cout << names[i] << " \t\t " << dist[i] << " \t\t\t\t ";
        printPath(parent, i, src);
        cout << endl;
    }
}

void dijkstra(int graph[V][V], int src) { 
    int dist[V]; 
    bool sptSet[V]; 
    vector<int> parent(V, -1); 
  
    for (int i = 0; i < V; i++) 
        dist[i] = INT_MAX, sptSet[i] = false; 
  
    dist[src] = 0; 
  
    for (int count = 0; count < V - 1; count++) { 
        int u = minDistance(dist, sptSet); 
        sptSet[u] = true; 
  
        for (int v = 0; v < V; v++) 
            if (!sptSet[v] && graph[u][v] && 
                dist[u] != INT_MAX && 
                dist[u] + graph[u][v] < dist[v]) {
                parent[v] = u;
                dist[v] = dist[u] + graph[u][v]; 
            }
    }
  
    // printAllSolution(dist, parent, src); 
    printSolution(dist, parent, src, destination);
} 

int main() {
    // the elements are seconds between each vertex (node weight)
    // Each row is a vertex (location). Each element is the number of seconds to walk from this vertex to that adjacent vertex. 
    // (00 should be the diagonal of the matrix)
    // nodes are from 0 to 12, add more nodes in the future starting from 13

    int graph[V][V] = {
        {00,60,00,00,00,00,00,00,00,00,00,00,00}, // SNELL GROUND (0)
        {60,00,55,00,00,00,00,00,00,00,00,00,00}, // SWEESS INTERSECTION (1)
        {00,55,00,18,00,00,00,00,00,00,00,00,00}, // CHURCHILL TUNNEL (2)
        {00,00,18,00,55,00,00,00,00,00,00,00,00}, // SNELL TUNNEL (3)
        {00,00,00,55,00,35,35,15,00,00,00,00,00}, // HAYDEN INTERSECTION (4)
        {00,00,00,00,35,00,22,00,00,00,00,00,00}, // HAYDEN DUNKIN' (5)
        {00,00,00,00,35,22,00,00,00,00,00,00,00}, // RICHARDS GROUND (6)
        {00,00,00,00,15,00,00,00,18,38,30,00,00}, // ELL TUNNEL RIGHT (7)
        {00,00,00,00,00,00,00,18,00,00,30,00,00}, // ELL GROUND RIGHT (8)
        {00,00,00,00,00,00,00,38,00,00,30,00,00}, // CURRY SERVICE DESK (9)
        {00,00,00,00,00,00,00,30,00,00,00,20,44}, // ELL TUNNEL LEFT (10)
        {00,00,00,00,00,00,00,00,00,00,20,00,00}, // ELL GROUND LEFT (11)
        {00,00,00,00,00,00,00,00,00,00,44,00,00}, // MUGAR GROUND (12)
	};

    cout << "Enter Source: ";
    cin >> source;
    cout << "Enter Destination: ";
    cin >> destination;
    cout << endl;
    dijkstra(graph, source); 
    return 0;
}
