import {test} from '@playwright/test';
import LoginPage from "../pages/LoginPage";
import { decrypt } from "../utils/CryptojsUtil.ts";
import logger from "../utils/LoggerUtil";
import ContactPage from '../pages/ContactPage';
import cdata from "../testdata/contacts.json";
import { convertCsvFileToJsonFile } from '../utils/CSVToJSONUtil.ts';

for (const contactData of cdata) { 
test.skip(`Data driven Framework - Contact Creation Test for ${contactData.firstName} ${contactData.lastName}`, async ({ page }) => {
    logger.info(`Test for Contact Creation is started for ${contactData.firstName} ${contactData.lastName}...`);
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(decrypt(process.env.userid));
    await loginPage.fillPassword(decrypt(process.env.password));
    const homePage = await loginPage.clickLoginButton();
    await homePage.expectServiceTitleToBeVisible();

    const contactsPage = await homePage.navigateToContactTab();
    await contactsPage.createNewContact(contactData.firstName, contactData.lastName);
    await contactsPage.expectContactLabelContainsFirstNameAndLastName(contactData.firstName, contactData.lastName);

    logger.info("Test for Contact Creation is completed");
});

}

test("simple DD test", async ({ page }) => {
    logger.info("Test for Contact Creation is started...");

    const fname = "Shiva";
    const lname = "Rudra";

    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(decrypt(process.env.userid));
    await loginPage.fillPassword(decrypt(process.env.password));

    const homePage = await loginPage.clickLoginButton();
    await homePage.expectServiceTitleToBeVisible();

    const contactsPage = await homePage.navigateToContactTab();
    await contactsPage.createNewContact(fname, lname);
    await contactsPage.expectContactLabelContainsFirstNameAndLastName(fname, lname);

    logger.info("Test for Contact Creation is completed");
});

// test.skip("csv to json", async () => {
//     convertCsvFileToJsonFile("data.csv", "datademo.json");
// });


// Convert CSV file to JSON file
test("csv to json", async () => {
    convertCsvFileToJsonFile("data.csv", "datademo.json");
});