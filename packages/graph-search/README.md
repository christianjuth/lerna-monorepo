# `@christianjuth/graph-search`

> TODO: description

## Usage

Represent a graph however you want.

### Example 1

```javascript
class TestNode {
  neighbors: TestNode[] = [];
}

const a = new TestNode();
const b = new TestNode();
const c = new TestNode();

a.neighbors = [b];
b.neighbors = [a, c];
c.neighbors = [b];

const path = bfs({
  start: a,
  dest: c,
  getNeighbors: (node) => node.neighbors,
});

console.log(path);
```

### Example 2

```javascript
const graph = {
  Washington: ["Oregon", "Idaho"],
  Oregon: ["Washington", "Idaho", "California"],
  California: ["Nevada", "Arizona", "Oregon"],
  Idaho: ["Washington", "Oregon", "Montana", "Wyoming", "Utah", "Nevada"],
  Nevada: ["Oregon", "California", "Idaho", "Utah", "Arizona"],
  Arizona: ["California", "Nevada", "Utah", "New Mexico"],
  Utah: ["Idaho", "Wyoming", "Nevada", "Arizona", "Colorado"],
  Montana: ["Idaho", "North Dakota", "South Dakota", "Wyoming"],
  Wyoming: ["Montana", "Idaho", "Utah", "Colorado", "Nebraska", "South Dakota"],
  Colorado: ["Wyoming", "Utah", "Nebraska", "Kansas", "Oklahoma", "New Mexico"],
  "New Mexico": ["Arizona", "Colorado", "Texas", "Oklahoma"],
  "North Dakota": ["Montana", "South Dakota", "Minnesota"],
  "South Dakota": [
    "North Dakota",
    "Montana",
    "Wyoming",
    "Nebraska",
    "Minnesota",
    "Iowa",
  ],
  Nebraska: [
    "South Dakota",
    "Wyoming",
    "Colorado",
    "Kansas",
    "Iowa",
    "Missouri",
  ],
  Kansas: ["Nebraska", "Colorado", "Oklahoma", "Missouri"],
  Oklahoma: [
    "Kansas",
    "Colorado",
    "New Mexico",
    "Texas",
    "Missouri",
    "Arkansas",
  ],
  Texas: ["New Mexico", "Oklahoma", "Arkansas", "Louisiana"],
  Minnesota: ["North Dakota", "South Dakota", "Iowa", "Wisconsin"],
  Iowa: [
    "Minnesota",
    "South Dakota",
    "Nebraska",
    "Missouri",
    "Illinois",
    "Wisconsin",
  ],
  Missouri: ["Iowa", "Illinois", "Kentucky", "Tennessee", "Arkansas"],
  Arkansas: [
    "Missouri",
    "Oklahoma",
    "Texas",
    "Louisiana",
    "Mississippi",
    "Tennessee",
  ],
  Louisiana: ["Texas", "Arkansas", "Mississippi"],
  Wisconsin: ["Michigan", "Minnesota", "Iowa", "Illinois"],
  Illinois: ["Wisconsin", "Iowa", "Missouri", "Kentucky", "Indiana"],
  Kentucky: [
    "Illinois",
    "Indiana",
    "Ohio",
    "West Virginia",
    "Virginia",
    "Tennessee",
    "Missouri",
  ],
  Tennessee: [
    "Missouri",
    "Arkansas",
    "Mississippi",
    "Alabama",
    "Georgia",
    "North Carolina",
    "Virginia",
    "Kentucky",
  ],
  Mississippi: ["Arkansas", "Louisiana", "Tennessee", "Alabama"],
  Michigan: ["Wisconsin", "Indiana"],
  Indiana: ["Michigan", "Illinois", "Kentucky", "Ohio"],
  Alabama: ["Tennessee", "Mississippi", "Georgia", "Florida"],
  Ohio: ["Michigan", "Indiana", "Kentucky", "West Virginia", "Pennsylvania"],
  Georgia: [
    "Tennessee",
    "North Carolina",
    "South Carolina",
    "Florida",
    "Alabama",
  ],
  Florida: ["Alabama", "Georgia"],
  "New York": [
    "Pennsylvania",
    "New Jersey",
    "Massachusetts",
    "New Hampshire",
    "Connecticut",
  ],
  Pennsylvania: ["New York", "Ohio", "West Virginia", "Delaware", "New Jersey"],
  "West Virginia": ["Ohio", "Pennsylvania", "Maryland", "Virginia", "Kentucky"],
  Virginia: [
    "West Virginia",
    "Maryland",
    "North Carolina",
    "Tennessee",
    "Kentucky",
  ],
  "North Carolina": ["Virginia", "Tennessee", "South Carolina", "Georgia"],
  "South Carolina": ["North Carolina", "Georgia"],
  Vermont: ["New York", "New Hampshire", "Rhode Island"],
  Massachusetts: [
    "Vermont",
    "New York",
    "New Hampshire",
    "Rhode Island",
    "Connecticut",
  ],
  "Rhode Island": ["Massachusetts", "Connecticut"],
  Connecticut: ["Massachusetts", "Rhode Island", "New York"],
  "New Jersey": ["New York", "Pennsylvania", "Delaware"],
  Delaware: ["New Jersey", "Pennsylvania", "Maryland"],
  Maryland: ["Pennsylvania", "West Virginia", "Virginia", "Delaware"],
  "New Hampshire": ["Vermont", "Maine", "Rhode Island"],
  Maine: ["Vermont"],
  Alaska: [],
  Hawaii: [],
};

const path = bfs({
  start: "New Jersey",
  dest: "California",
  getNeighbors: (node) => {
    return graph[node];
  },
});

console.log(path);
```
