const manager = require("./lib/manager");
const engineer = require("./lib/engineer");
const intern = require("./lib/intern");
const inquirer = require("inquirer");
const path = require("path");
const fs =require("fs");
const output = path.resolve(__dirname, "output", "team.html");
const render = require("./lib/htmlRender");

let emp = [];
let empID = [];

function validateID(input) {
    if (isNaN(input)){
        return "Please enter a four digit Employee ID number.";
    }
    for (i = 0; i < empID.length; i++) {
        if (input === empID[i]) {
            return "ID number is in use."
        }
    }
    return true;
}


const templateStart = () => {
    inquirer.prompt([
      //takes in name 
      {
        type: "input",
        message: "What is your manager's name?",
        name: "name"
      },

      {
        type: "number",
        message: "What is your manager's ID number?",
        name: "id",

        validate: validateId
      },

      {
        type: "input",
        message: "What is your manager's email address?",
        name: "email"
      },

      {
        type: "number",
        message: "What is your manager's office phone number?",
        name: "officeNumber"
      },
      {
        type: "list",
        message: "Which type of team member would you like to add now?",
        choices: ["Engineer", "Intern", "I don't want to add any more team members, thanks!"],
        name: "action"
      }
    ]).then((prompt) => {
  
      const newManager = new Manager(prompt.name, prompt.id, prompt.email, prompt.officeNumber);
  
      emps.push(newManager);
      empId.push(prompt.id);
  
      switch (prompt.action) {
        case "Engineer":
          engineerStart();
          break;
        case "Intern":
          internStart();
          break;
        default:
          // render();
          fs.writeFile(output, render(emps), function (err) {
            if (err) {
              throw err;
            }
          });
          console.log("Your html has been rendered! Head over to the Output folder!");
          break;
      }
    });
  };

  const secondPrompt = () => {
    inquirer.prompt([

      {
        type: "list",
        message: "Which type of team member would you like to add now?",
        choices: ["Engineer", "Intern", "I don't want to add any more team members, thanks!"],
        name: "action"
      }
    ]).then((prompt) => {
      switch (prompt.action) {
        case "Engineer":
          engineerStart();
          break;
        case "Intern":
          internStart();
          break;
        default:
          // render();
          fs.writeFile(outputPath, render(employees), function (err) {
            if (err) {
              throw err;
            }
          });
          console.log("Your html has been rendered! Head over to the Output folder!");
          break;
      }
    });
  };
  


const engineerStart = () => {
    inquirer.prompt([
      {
        type: "input",
        message: "What is your engineer's name?",
        name: "name"
      },
      {
        type: "number",
        message: "What is your engineer's ID number?",
        name: "id",
        validate: validateId
      },
      {
        type: "input",
        message: "What is your engineer's email address?",
        name: "email"
      },
      {
        type: "input",
        message: "What is your engineer's GitHub user name?",
        name: "github"
      }
    ]).then((prompt) => {

      const newEngineer = new Engineer(prompt.name, prompt.id, prompt.email, prompt.github);
  
  
      employees.push(newEngineer);
      employeeId.push(prompt.id);
  
    
      secondPrompt();
    });
  };
  
  

  const internStart = () => {
    inquirer.prompt([
      {
        type: "input",
        message: "What is your intern's name?",
        name: "name"
      },
      {
        type: "number",
        message: "What is your interns's ID number?",
        name: "id",
        validate: validateId
      },
      {
        type: "input",
        message: "What is your interns's email address?",
        name: "email"
      },
      {
        type: "input",
        message: "Where is your intern attending school?",
        name: "school"
      }
    ]).then((prompt) => {
      const newIntern = new Intern(prompt.name, prompt.id, prompt.email, prompt.school);
  
      employees.push(newIntern);
      employeeId.push(prompt.id);
  
      secondPrompt();
    });
  };
  
  
 
  

  

  

  
  templateStart();