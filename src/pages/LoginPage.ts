import {Page} from '@playwright/test';

import HomePage from "./HomePage";
import logger from "../utils/LoggerUtil";



//Create Class for Login Page - This class will contain all the methods related to login page
export default class LoginPage {
    // Selectors for the login page elements
    private readonly usernameinputSelector = "#username";
    private readonly passwordinputSelector = "#password";
    private readonly loginButtonSelector = "#Login";

    //Constructor to initialize the page object - This will be used to pass the page object from the test file to this class
    // The constructor takes a Page object as a parameter and assigns it to the private page property of the class. 
    // This allows us to use the page object in all the methods of the class to interact with the web elements on the login page.
    constructor(private page: Page) {
 }

    // Method to perform login action - This method will be called from the test file to perform login action
    async navigateToLoginPage() {
        await this.page.goto("/");
        logger.info("Navigated to login page");
    }

    // Method to fill username and password - This method will be called from the test file to fill username and password
    async fillUsername(username: string) {
        await this.page.fill(this.usernameinputSelector, username);
        logger.info("Filled username: " + username);
    }
    // Method to fill password - This method will be called from the test file to fill password
    async fillPassword(password: string) {
        await this.page.fill(this.passwordinputSelector, password);
        logger.info("Filled password: " + password);
    }
    // Method to click on login button - This method will be called from the test file to click on login button
    async clickLoginButton() {
        await this.page.click(this.loginButtonSelector).catch((error) => {
            logger.error("Error clicking login button:", error);
            throw error; // Rethrow the error after logging it
        }).then(() => logger.info("Clicked on login button"));


        // After clicking the login button, we can return an instance of the HomePage class to allow chaining of methods in the test file
        const homePage = new HomePage(this.page);
        return homePage;
    }
}