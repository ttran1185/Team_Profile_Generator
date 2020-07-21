const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const output = path.resolve(__dirname, "output", "team.html");
const render = require("./lib/htmlRenderer");

let emp = [];
let empID = [];


function validateId(input) {
  if (isNaN(input)) {
    return "Please enter a four digit employee ID number!";
  }
  for (i = 0; i < empID.length; i++) {
    if (input === empID[i]) {
      return "That ID number is already in use!"
    }
  }
  return true;
}




console.log("Build your team.");

const templateStart = () => {
  inquirer.prompt([

    {
      type: "input",
      message: "What is the manager's name?",
      name: "Name"
    },
 
    {
      type: "number",
      message: "What is the manager's ID number?",
      name: "ID",

      validate: validateId
    },

    {
      type: "input",
      message: "What is the manager's email address?",
      name: "Email"
    },

    {
      type: "number",
      message: "What is the Mgr's office phone number?",
      name: "officeNumber"
    },
    {
      type: "list",
      message: "Please add the next teammember...",
      choices: ["Engineer", "Intern", "None at the moment"],
      name: "Options"
    }
  ]).then((prompt) => {

    const newMgr = new Manager(prompt.Name, prompt.ID, prompt.Email, prompt.officeNumber);

    emp.push(newMgr);
    empID.push(prompt.ID);

    switch (prompt.Options) {
      case "Engineer":
        engineerStart();
        break;
      case "Intern":
        internStart();
        break;
      default:
        // render();
        fs.writeFile(output, render(emp), function (err) {
          if (err) {
            throw err;
          }
        });
        console.log("The rendered HTML file is located in the output folder.");
        break;
    }
  });
};


const engineerStart = () => {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the engineer's name?",
      name: "Name"
    },
    {
      type: "number",
      message: "What is the engineer's ID number?",
      name: "ID",
      validate: validateId
    },
    {
      type: "input",
      message: "What is the engineer's email address?",
      name: "Email"
    },
    {
      type: "input",
      message: "What is the engineer's GitHub user name?",
      name: "GitHub"
    }
  ]).then((prompt) => {
    //create new engineer
    const newEngineer = new Engineer(prompt.Name, prompt.ID, prompt.Email, prompt.GitHub);

    //push it to an array of emp
    emp.push(newEngineer);
    empID.push(prompt.id);

    //start over again with secondPrompt()
    secondPrompt();
  });
};



const internStart = () => {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the intern's name?",
      name: "Name"
    },
    {
      type: "number",
      message: "What is the interns's ID number?",
      name: "ID",
      validate: validateId
    },
    {
      type: "input",
      message: "What is the interns's email address?",
      name: "Email"
    },
    {
      type: "input",
      message: "Where is the intern attending school?",
      name: "School"
    }
  ]).then((prompt) => {
    const newIntern = new Intern(prompt.Name, prompt.ID, prompt.Email, prompt.School);

    emp.push(newIntern);
    empID.push(prompt.id);

    secondPrompt();
  });
};


const secondPrompt = () => {
  inquirer.prompt([

    {
      type: "list",
      message: "Please add the next teammember...",
      choices: ["Engineer", "Intern", "None at the moment"],
      name: "Options"
    }
  ]).then((prompt) => {
    switch (prompt.Options) {
      case "Engineer":
        engineerStart();
        break;
      case "Intern":
        internStart();
        break;
      default:
        // render();
        fs.writeFile(output, render(emp), function (err) {
          if (err) {
            throw err;
          }
        });
        console.log("The rendered HTML file is located in the output folder.");
        break;
    }
  });
};


templateStart();