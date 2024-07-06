const express = require("express");
const app = express();

app.use(express.json());

let persons = [
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
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/info", (req, res) => {
  const date = new Date();
  const dateString = `${date.toDateString()} ${date.toTimeString()}`;

  res.send(
    `<p>The phonebook has ${persons.length} entries</p><p>${dateString}</p>`
  );
});

const PORT = 3001;
app.listen(PORT);
