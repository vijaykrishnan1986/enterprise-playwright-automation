import {test} from '@playwright/test';
import LoginPage from "../pages/LoginPage";
import { decrypt, encrypt } from "../utils/CryptojsUtil.ts";
import { encryptEnvFile } from '../utils/EncrpytEnvFile.ts';


// Test to verify that the user is able to login to the sales force application and the service title is visible on the home page after login
// This test will navigate to the login page, fill in the username and password, click the login button and verify that the service title is visible on the home page after login
// The test will use the LoginPage class to interact with the login page and the HomePage class to interact with the home page after login
// The test will use the expect function to verify that the service title is visible on the home page after login
test("Login Sales force application", async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    // await loginPage.fillUsername("vijaykrishnan27.d18c44e8b1ac@agentforce.com");
    // await loginPage.fillPassword("password27");

    //! Using environment variables to store sensitive information like username and password is a best practice in test automation. This way, you can keep your credentials secure and avoid hardcoding them in your test scripts. In this example, we are using process.env.userid and process.env.password to access the username and password stored in environment variables. Make sure to set these environment variables before running the test.
    // ! - The exclamation mark after process.env.userid and process.env.password is a TypeScript non-null assertion operator. It tells the TypeScript compiler that you are sure that these environment variables will be defined at runtime, even though they might be undefined at compile time. This is necessary because TypeScript cannot guarantee that these environment variables will always be set, but you as the developer know that they will be provided when the test runs.
    // await loginPage.fillUsername(process.env.userid!);
    // await loginPage.fillPassword(process.env.password!);

    await loginPage.fillUsername(decrypt(process.env.userid!));
    await loginPage.fillPassword(decrypt(process.env.password!));
    const homepage = await loginPage.clickLoginButton();
    await homepage.expectServiceTitleToBeVisible();
});

test.skip("Sample Env test", async ({page}) => {
    console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
    console.log("Username from env: ", process.env.userid);
    console.log("Password from env: ", process.env.password);
});

test.skip("Encrypt and Decrypt test", async ({page}) => {
    // const originalText = "Hello, World!";
    // const encryptedText = encrypt(originalText);
    // console.log('SALT:', process.env.SALT);
    // console.log('Encrypted Text:', encryptedText);
    // const decryptedText = decrypt(encryptedText);
    // console.log('Decrypted Text:', decryptedText);
    console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
    encryptEnvFile();
})
