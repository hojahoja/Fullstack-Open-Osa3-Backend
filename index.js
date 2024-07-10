require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const Person = require("./models/person");

morgan.token("body", (req, res) => (req.method === "POST" ? JSON.stringify(req.body) : undefined));

app.use(express.static("dist"));
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

/*
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
*/

//const generateId = () => (new Date().getTime() * Math.random()).toString().replace(".", "");

app.get("/api/persons", (req, res) => {
  Person.find({}).then((foundPeople) => {
    res.json(foundPeople);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => (person ? res.json(person) : res.status(404).end()))
    .catch((error) => next(error));
});

app.get("/api/info", (req, res) => {
  const date = new Date();
  const dateString = `${date.toDateString()} ${date.toTimeString()}`;

  Person.find({}).then((foundPeople) =>
    res.send(`<p>The phonebook has ${foundPeople.length} entries</p><p>${dateString}</p>`)
  );
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Missing name or number" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((error) => next(error));
});

const unknownEndpoint = (req, res) => res.status(404).send({ error: "unkown endpoint" });

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
