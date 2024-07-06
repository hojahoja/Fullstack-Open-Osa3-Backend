const express = require("express");
const app = express();

let persons = {
  persons: [
    {
      name: "Jordan Rudess",
      number: "+1-617-5681235",
      id: "0",
    },
    {
      name: "Robert Fripp",
      number: "+44-020-2133453",
      id: "1",
    },
    {
      name: "Keith Emerson",
      number: "+44-020-1236542",
      id: "2",
    },
    {
      name: "Neil Peart",
      number: "+1-310-2145831",
      id: "3",
    },
    {
      name: "Tosin Abasi",
      number: "+1-802-5324008",
      id: "4",
    },
    {
      id: "e36f",
      name: "Heikki Silvennoinen",
      number: "050-101012",
    },
    {
      id: "38ec",
      name: "Allan Holdsworth",
      number: "+1-442-4321243",
    },
  ],
};

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

const PORT = 3001;
app.listen(PORT);
