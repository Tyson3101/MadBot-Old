enum Position { // Enum
  OWNER, // Owner being 0,
  DEVELOPER, // DEVELOPER being 1,
  TESTER, // Tester being ...
}

export interface Developer {
  id: string; // User object of that developer
  position: Position; // There postion of the enum
}
