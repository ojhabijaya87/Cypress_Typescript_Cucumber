// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import "cypress-real-events/support";
import addContext from "mochawesome/addContext";
import "@shelex/cypress-allure-plugin";
import 'cypress-mochawesome-reporter/register';


require("cypress-xpath");
const titleToFileName = (title) => title.replace(/[:\/]/g, "");
// Alternatively you can use CommonJS syntax:
// require('./commands')


Cypress.on("test:after:run", (test, runnable) =>
{
    if (test.state === "failed")
    {
        let parent = runnable.parent;
        let filename = "";
        while (parent && parent.title)
        {
            filename = `${titleToFileName(parent.title)} -- ${filename}`;
            parent = parent.parent;
        }
        filename += `${titleToFileName(test.title)} (failed).png`;
        addContext({ test }, `../screenshots/${Cypress.spec.name}/${filename}`);
        addContext({ test }, `../videos/${Cypress.spec.name}.mp4`);
    }
});

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
