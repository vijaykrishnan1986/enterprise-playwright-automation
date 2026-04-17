import {Page,expect} from '@playwright/test';

export default class HomePage {
    private readonly serviceTitleLocator ='span[title="Service"]';
//Constructor to initialize the page object - This will be used to pass the page object from the test file to this class
    constructor(private page: Page) {
    }
// Method to verify that the service title is visible on the home page - This method will be called from the test file to verify that the service title is visible on the home page
    async expectServiceTitleToBeVisible() {
        // await expect(this.page.locator(this.serviceTitleLocator)).toBeVisible({timeout: 30000});
        await expect(this.page.locator(this.serviceTitleLocator)).toHaveText('Service',{timeout: 30000});
    }
}