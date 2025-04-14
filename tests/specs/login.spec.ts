import { credential } from '../testData/credential';
import { test, expect } from '../fixture/custom';

test('logging into Application', async ({ loginpage }) => {
    await loginpage.loginIntoApllication(credential.username, credential.password);
    await expect(loginpage.dashboardTitle).toHaveText("Dashboard");
})

test('login without password', async ({ loginpage }) => {
    await loginpage.loginIntoApllication(credential.username, "");
    await expect(await loginpage.errorCheckOfCredentialByName("password")).toHaveText('Required');
})

test('login without username', async ({ loginpage }) => {
    await loginpage.loginIntoApllication("", credential.password);
    await expect(await loginpage.errorCheckOfCredentialByName("username")).toHaveText('Required');
})

test('login without username and password', async ({ loginpage }) => {
    await expect(await loginpage.errorCheckOfCredentialByName("username")).toHaveText("Required");
    await expect(await loginpage.errorCheckOfCredentialByName("password")).toHaveText("Required");
})

test('logging with incorrect username', async ({ loginpage }) => {
    await loginpage.loginIntoApllication("employee", credential.password);
    await expect(loginpage.invalidErrorCredentialLocator).toHaveText("Invalid credentials");
})

test('logging with incorrect password', async ({ loginpage }) => {
    await loginpage.loginIntoApllication(credential.username, "as456");
    await expect(loginpage.invalidErrorCredentialLocator).toHaveText("Invalid credentials");
})

test('logging with incorrect username and password', async ({ loginpage }) => {
    await loginpage.loginIntoApllication("sha34", "as456");
    await expect(loginpage.invalidErrorCredentialLocator).toHaveText("Invalid credentials");
})

