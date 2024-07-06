const express = require("express");
const morgan = require("morgan");
const app = express();

morgan.token("body", (req, res) => (req.method === "POST" ? JSON.stringify(req.body) : undefined));

app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

let persons = [
  {
    id: "1",
    name: "Jordan Rudess",
    number: "+1-617-5681235",
  },
  {
    id: "2",
    name: "Robert Fripp",
    number: "+44-020-2133453",
  },
  {
    id: "3",
    name: "Keith Emerson",
    number: "+44-020-1236542",
  },
  {
    id: "4",
    name: "Neil Peart",
    number: "+1-310-2145831",
  },
  {
    id: "5",
    name: "Tosin Abasi",
    number: "+1-802-5324008",
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

const generateId = () => (new Date().getTime() * Math.random()).toString().replace(".", "");

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

  res.send(`<p>The phonebook has ${persons.length} entries</p><p>${dateString}</p>`);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Missing name or number" });
  } else if (persons.some((p) => p.name === body.name)) {
    return res.status(400).json({ error: "Name already in the book" });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  res.json(persons);
});

const PORT = 3001;
app.listen(PORT);
