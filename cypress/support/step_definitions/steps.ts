// <reference types="Cypress" />
import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import { create } from "../page_objects/create.pages";
import { home } from "../page_objects/home.pages";
import { login } from "../page_objects/login.page";
import CreateIds from "../web_elements/create.ids";

var userName: string | number | RegExp


Given(/^User visit the application$/, () => {
	login.visit();
});



Given(/^User login to the application with "([^"]*)" and "([^"]*)"$/, (args1, args2) => {
	login.signIn(args1, args2);
});


When(/^User hover to "([^"]*)"$/, (args1) => {
	login.hoverOnElement(args1);
});

When(/^User click on "([^"]*)"$/, (args1) => {
	home.selectMenu(args1);
});


When(/^User create contact$/, () => {
	home.clickCreate();
	userName = create.createContact();
});

Then(/^Validate user is created$/, () => {
	create.savedUserName.contains(userName);
});


When(/^User select "([^"]*)"$/, (args1) => {
	home.selectTheme(args1);
});


Then(/^Selected theme is "([^"]*)"$/, (args1) => {
	home.themes.find('option:selected').should('have.text', args1);
});


Then(/^Fail test$/, () => {
	var random = Math.random().toString(36).substring(2);

	create.savedUserName.contains(random);
});


