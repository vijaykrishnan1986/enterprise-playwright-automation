import {Page,expect} from '@playwright/test';
import logger from "../utils/LoggerUtil";
import ContactPage from './ContactPage';
import { time } from 'node:console';

export default class HomePage {
    private readonly serviceTitleLocator ='span[title="Service"]';
    private readonly contactsLinkLocator = 'Contacts';
//Constructor to initialize the page object - This will be used to pass the page object from the test file to this class
    constructor(private page: Page) {
    }
// Method to verify that the service title is visible on the home page - This method will be called from the test file to verify that the service title is visible on the home page
    async expectServiceTitleToBeVisible() {
        // await expect(this.page.locator(this.serviceTitleLocator)).toBeVisible({timeout: 30000});
        await expect(this.page.locator(this.serviceTitleLocator)).toHaveText('Service',{
            timeout: 30000,
        }).catch((error) => {
            logger.error(`Service title is not visible on the home page: ${error}`);
            throw error;
        }).then(() => logger.info('Service title is visible on the home page'));

    }

async navigateToContactTab() {
        await expect(this.page.getByRole('link', { name: this.contactsLinkLocator })).toBeVisible({ timeout: 20000 });
        logger.info("Contacts Tab is visible");
        await this.page.getByRole('link', { name: this.contactsLinkLocator}).click({timeout: 20000}).catch((error) => {
            logger.error(`Error clicking Contacts Tab: ${error}`);
            throw error; // rethrow the error if needed
        }).then(() => logger.info("Contacts Tab is clicked"));

        // logger.info("Contacts Tab is clicked");
        return new ContactPage(this.page);
    }

}