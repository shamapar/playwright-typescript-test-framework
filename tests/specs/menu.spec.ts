import { credential } from '../testData/credential';
import { test, expect } from '../fixture/custom';


test.beforeEach('logging into Application', async ({ loginpage }) => {
    await loginpage.loginIntoApllication(credential.username, credential.password);
    await expect(loginpage.dashboardTitle).toHaveText("Dashboard");
})

test('should navigate to Menu by name: PIM', async ({ menupage }) => {
    await menupage.navigateToMenu("PIM");
    await expect(menupage.pageTitle).toHaveText("PIM");
})

test('should navigate to Menu by name: Admin', async ({ menupage }) => {
    await menupage.navigateToMenu("Admin");
    await expect(menupage.pageTitle).toHaveText("Admin");
    await expect(menupage.pageTitleSecondry).toHaveText("User Management");
})
