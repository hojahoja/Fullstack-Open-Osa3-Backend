require("dotenv").config();
const mongoose = require("mongoose");

//if (process.argv.length < 3) {
//  console.log("No Password, no fun!");
//  process.exit(1);
//}
//
//const password = process.argv[2];

//Changed to use env variable instead of typing password in the terminal.
//The Functionality required in exercize 3.12 is still accessible in commit: "3.12: tietokanta komentoriviltä"
const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const createPerson = (name, number) => {
  if (name && number) {
    const person = new Person({ name, number });
    person.save().then(() => {
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

if (process.argv.length === 2) {
  listPeople();
} else if (process.argv.length === 4) {
  createPerson(process.argv[3], process.argv[4]);
} else {
  console.log("Incorrect Argument");
  mongoose.connection.close();
}
