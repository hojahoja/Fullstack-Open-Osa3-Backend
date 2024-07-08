const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("No Password, no fun!");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://hojahoja:${password}@fullstackopen0.vyhgoab.mongodb.net/puhelinluettelo?retryWrites=true&w=majority&appName=FullstackOpen0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", noteSchema);

const createPerson = (name, number) => {
  if (name && number) {
    const person = new Person({ name, number });
    person.save().then((result) => {
      console.log(`added ${person.name} number ${person.number} to phonebook`);
      mongoose.connection.close();
    });
  } else {
    console.log("Make sure you entered both name and number");
  }
};

const listPeople = () => {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
};

if (process.argv.length == 3) {
  listPeople();
} else if (process.argv.length == 5) {
  createPerson(process.argv[3], process.argv[4]);
} else {
  console.log("Incorrect Argument");
  mongoose.connection.close();
}
