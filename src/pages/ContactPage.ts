import { Page, expect } from "@playwright/test";
import logger from "../utils/LoggerUtil";
import { time } from "console";
import { TIMEOUT } from "dns";

export default class ContactPage {
  private readonly contactsLink = "Contacts";
  private readonly newButtonLocator = "New";
  private readonly firstNameTextFieldLocator = "First Name";
  private readonly lastNameTextFieldLocator = "Last Name";
  private readonly saveButtonLocator = "Save";
  private readonly contactFullNameLabelLocator = "sfa-output-name-with-hierarchy-icon-wrapper";

  constructor(private page: Page) {}

  async createNewContact(fname: string, lname: string) {
    await this.page.getByRole('button', { name: this.newButtonLocator }).click({ timeout: 20000});
    logger.info("New button is clicked");
   
     await expect(this.page.locator(this.firstNameTextFieldLocator)).toHaveText('First Name',{
            timeout: 30000,
        }).catch((error) => {
            logger.error(`First Name is not visible on the home page: ${error}`);
            throw error;
        }).then(() => logger.info('First Name is visible on the home page'));

    await this.page.getByPlaceholder(this.firstNameTextFieldLocator).click({ timeout: 30000 }).catch((error) => {
        logger.error(`Error clicking on First Name text field: ${error}`);
        throw error; // rethrow the error if needed
    }).then(() => logger.info("First Name text field is clicked"));

    await this.page.getByPlaceholder(this.firstNameTextFieldLocator).fill(fname,{timeout: 30000}).catch((error) => {
        logger.error(`Error filling First Name text field: ${error}`);
        throw error; // rethrow the error if needed
    }).then(() => logger.info(`First name is filled as ${fname}`)); 

    // logger.info(`First name is filled as ${fname}`);
    
    await this.page.getByPlaceholder(this.firstNameTextFieldLocator).press('Tab');
    await this.page.getByPlaceholder(this.lastNameTextFieldLocator).fill(lname, {timeout: 30000}).catch((error) => {
        logger.error(`Error filling Last Name text field: ${error}`);
        throw error; // rethrow the error if needed
    }).then(() => logger.info(`Last name is filled as ${lname}`));  
    // logger.info(`Last name is filled as ${lname}`);

    await this.page.getByRole('button', { name: this.saveButtonLocator, exact: true })
      .click()
      .catch((error) => {
        logger.error(`Error clicking Save button: ${error}`);
        throw error; // rethrow the error if needed
      })
      .then(() => logger.info("Save Button is clicked"));
  }

    async expectContactLabelContainsFirstNameAndLastName(fname: string, lname: string) {
        await expect(this.page.locator(this.contactFullNameLabelLocator))
            .toContainText(`${fname} ${lname}`);
        logger.info(`New contact created and ${fname} ${lname} is visible`);

        await this.page.getByRole('link', { name: this.contactsLink }).click();
        }

}
