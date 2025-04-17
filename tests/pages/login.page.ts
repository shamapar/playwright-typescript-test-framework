import { Page } from '@playwright/test'

class LoginPage {

    page: Page

    constructor(abcd: Page) {
        this.page = abcd;
    }
    get userName() {
        return this.page.getByPlaceholder("Username");
    }

    get password() {
        return this.page.getByPlaceholder("Password")
    }

    get loginButton() {
        return this.page.getByRole("button", { name: "Login" });
    }
    get dashboardTitle() {
        return this.page.getByRole('heading', { level: 6 })
    }

    requiredErrorLocator(name: string) {
        return this.page.getByPlaceholder(name).locator("//..//following-sibling::span[contains(@class,'error')]");
    }

    get invalidCredentialError() {
        return this.page.getByRole("alert")
    }

    async loginIntoApllication(username: string, password: string) {
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();

    }

}
export default LoginPage;