import { Page } from '@playwright/test';
import { menuTypes } from '../testData/menus';

class MenuPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    get pageTitle() {
        return this.page.locator("//span[contains(@class,'topbar-header')]");
    }
    async navigateToMenu(menuName: menuTypes) {
        await this.page.locator(`//*[text()='${menuName}' and contains(@class,'main-menu')]`).click();
    }
}

export default MenuPage;