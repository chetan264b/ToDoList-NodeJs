const fs = require("fs");

function addNote(argv) {
  console.log("Adding a new note");
  const notes = getNotes();

  notes.push({
    title: argv.title,
    description: argv.description,
  });

  saveNotes(notes);
}

function saveNotes(newNotesArray) {
  fs.writeFileSync("notes.json", JSON.stringify(newNotesArray));
}

function getNotes() {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    return JSON.parse(dataBuffer.toString());
  } catch (e) {
    return [];
  }
}

function listNotes(argv) {
  const notes = getNotes();
  if (!argv.title) {
    let notesStr = ``;
    notes.forEach((e) => {
      notesStr += `\nTitle : ${e.title} \nDescriptor : ${e.description}\n`;
    });

    return notesStr;
  } else {
    let title = argv.title;
    let note = notes.filter((n) => n.title === title);
    if (note.length === 0) {
      return "No Such Note is Present in the App";
    } else {
      return `Title : ${note[0].title} \nDescriptor : ${note[0].description}`;
    }
  }
}

function removeNotes(argv) {
  const notes = getNotes();
  const newNotesArray = notes.filter((e) => e.title !== argv.title);

  if (newNotesArray.length !== notes.length) {
    saveNotes(newNotesArray);
    return true;
  }
  return false;
}

module.exports = {
  addNote: addNote,
  listNotes: listNotes,
  removeNotes: removeNotes,
};
