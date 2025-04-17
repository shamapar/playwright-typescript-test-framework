import { Page } from '@playwright/test';
import { menuTypes } from '../testData/menus';

class MenuPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    get pageTitle() {
        return this.page.getByRole('heading', { level: 6 }).first()
    }

    get pageTitleSecondry() {
        return this.page.getByRole('heading', { level: 6 }).last()
    }

    async navigateToMenu(menuName: menuTypes) {
        await this.page.getByRole('link', { name: menuName }).click();
    }
}

export default MenuPage;