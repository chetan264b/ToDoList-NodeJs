const yargs = require("yargs");
const notes = require("./notes.js");

yargs.version("1.0.0");
console.log("To Do List");
yargs.command({
  command: "add",
  describe: "Add a New Note",
  builder: {
    title: {
      describe: "Title of the Note",
      demandOption: true,
      type: "string",
    },
    description: {
      describe: "Description of the Note",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.addNote(argv);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove a Existing Note",
  builder: {
    title: {
      describe: "Title of the Note",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    if (notes.removeNotes(argv)) {
      console.log("SuccessFully Removed the Note with Title -", argv.title);
    } else {
      console.log("No Such Note found to Delete");
    }
  },
});

yargs.command({
  command: "list",
  describe: "Print existing Note/Notes",
  builder: {
    title: {
      describe: "Title of the Note",
      type: "string",
    },
  },
  handler: function (argv) {
    console.log(notes.listNotes(argv));
  },
});

yargs.parse();
