import { credential } from '../testData/credential';
import { test, expect } from '../fixture/custom';

test('logging into Application', async ({ loginpage }) => {
    await loginpage.loginIntoApllication(credential.username, credential.password);
    await expect(loginpage.dashboardTitle).toHaveText("Dashboard");
})

test('login without password', async ({ loginpage }) => {
    await loginpage.loginIntoApllication(credential.username, "");
    await expect(loginpage.requiredErrorLocator("password")).toHaveText('Required');
})

test('login without username', async ({ loginpage }) => {
    await loginpage.loginIntoApllication("", credential.password);
    await expect(loginpage.requiredErrorLocator("username")).toHaveText('Required');
})

test('login without username and password', async ({ loginpage }) => {
    await loginpage.loginIntoApllication("", "");
    await expect(loginpage.requiredErrorLocator("username")).toHaveText("Required");
    await expect(loginpage.requiredErrorLocator("password")).toHaveText("Required");
})

test('logging with incorrect username', async ({ loginpage }) => {
    await loginpage.loginIntoApllication("employee", credential.password);
    await expect(loginpage.invalidCredentialError).toHaveText("Invalid credentials");
})

test('logging with incorrect password', async ({ loginpage }) => {
    await loginpage.loginIntoApllication(credential.username, "as456");
    await expect(loginpage.invalidCredentialError).toHaveText("Invalid credentials");
})

test('logging with incorrect username and password', async ({ loginpage }) => {
    await loginpage.loginIntoApllication("sha34", "as456");
    await expect(loginpage.invalidCredentialError).toHaveText("Invalid credentials");
})

