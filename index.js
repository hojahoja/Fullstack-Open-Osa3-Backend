const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    name: "Jordan Rudess",
    number: "+1-617-5681235",
    id: "1",
  },
  {
    name: "Robert Fripp",
    number: "+44-020-2133453",
    id: "2",
  },
  {
    name: "Keith Emerson",
    number: "+44-020-1236542",
    id: "3",
  },
  {
    name: "Neil Peart",
    number: "+1-310-2145831",
    id: "4",
  },
  {
    name: "Tosin Abasi",
    number: "+1-802-5324008",
    id: "5",
  },
  {
    id: "6",
    name: "Heikki Silvennoinen",
    number: "050-101012",
  },
  {
    id: "7",
    name: "Allan Holdsworth",
    number: "+1-442-4321243",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === id);

  person ? res.json(person) : res.status(404).end();
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
