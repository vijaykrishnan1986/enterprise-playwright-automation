import {test} from '@playwright/test';

import LoginPage from "../pages/LoginPage";

// Test to verify that the user is able to login to the sales force application and the service title is visible on the home page after login
// This test will navigate to the login page, fill in the username and password, click the login button and verify that the service title is visible on the home page after login
// The test will use the LoginPage class to interact with the login page and the HomePage class to interact with the home page after login
// The test will use the expect function to verify that the service title is visible on the home page after login
test("Login Sales force application", async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername("vijaykrishnan27.d18c44e8b1ac@agentforce.com");
    await loginPage.fillPassword("password27");
    const homepage = await loginPage.clickLoginButton();
    await homepage.expectServiceTitleToBeVisible();
});

