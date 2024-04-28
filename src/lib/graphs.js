export const graph = [
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

export const graphTurns = [
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
    "Continue Straight, Then Turn Left  ",
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
    "Continue Straight, Then Turn Right",
    "",
    "Climb The Stairs, Then Turn Right",
    "Follow Signs For Richards Hall, Then Stairs",
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
    "Descend Stairs, Then Turn Right",
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
    "Descend Stairs, Turn Left, Turn Right",
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
    "Turn Left At End Of Bookstore Hallway",
    "",
    "",
    "Turn Right At End Of Bookstore Hallway, Then Continue Straight",
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
    "Descend Stairs",
    "Turn Right At End Of Hallway, Then Climb Stairs",
    "Continue Straught",
    "",
  ], // ELL TUNNEL LEFT (10)
  ["", "", "", "", "", "", "", "", "", "", "Descend Stairs", "", "", "", ""], // ELL GROUND LEFT (11)
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
    "Descend Stairs, Turn Left At Lockers",
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
