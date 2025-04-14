import { test as base } from '@playwright/test'
import MenuPage from '../pages/menu.page';
import LoginPage from '../pages/login.page';
import PimPage from '../pages/pim.page';

type MyFixtures = {
    menupage: MenuPage;
    loginpage: LoginPage;
    pimpage: PimPage;

};

export const test = base.extend<MyFixtures>({
    menupage: async ({ page }, use) => {
        await use(new MenuPage(page))
    },
    loginpage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    pimpage: async ({ page }, use) => {
        await use(new PimPage(page))
    },
})

export { expect } from '@playwright/test'