import { expect, Page } from '@playwright/test'
import { employee } from '../testData/employeeInformation';
import { getLocatorByLabel, LocatorByName, selectingPIMMenuByName, status } from '../testData/menus';


class PimPage {
    page: Page
    constructor(page: Page) {
        this.page = page;
    }

    navigatingPIMMenuByName(menuName: selectingPIMMenuByName) {
        return this.page.locator(`//ul[@data-v-5327b38a]//li//*[text()='${menuName}']`).click();
    }
    get employeeMenuTitle() {
        return this.page.locator("//h6[text()='Add Employee']")
    }

    getLocatorByLabel(label: getLocatorByLabel) {
        return this.page.locator(`//label[text()="${label}"]/..//following-sibling::div/input`);
    }

    getLocatorByName(name: LocatorByName) {
        return this.page.getByPlaceholder(name);
    }
    get notificationStatus() {
        return this.page.locator("//p[text()='Successfully Saved']");
    }

    async addEmployee(firstname: string, lastname: string, employeeId: string, username: string, password: string, userStatus?: 'Disabled') {
        await this.getLocatorByName('First Name').fill(firstname);
        await this.getLocatorByName('Last Name').fill(lastname);
        await this.getLocatorByLabel('Employee Id').fill(employeeId);
        await this.page.locator("//input[@type='checkbox']//..//span").click();
        await this.getLocatorByLabel('Username').fill(username);
        if (userStatus == 'Disabled') {
            this.page.locator("//input[@value='2']/following-sibling::span").click();
        }
        await this.getLocatorByLabel('Password').fill(password);
        await this.getLocatorByLabel('Confirm Password').fill(password);
        await this.page.getByRole('button', { name: 'Save' }).click();

    }

    async getallRowsCount() {
        const allRows = this.page.locator('//*[@class="oxd-table-card"]//div[@role="row"]')
        const tableBody = this.page.locator('//div[@data-v-5a621acd]//span');
        await tableBody.waitFor({ state: 'visible' });
        return await allRows.count();

    }

    async searchForExistingEmployee(id: string,) {
        await this.navigatingPIMMenuByName('Employee List');
        await this.getLocatorByLabel('Employee Id').fill(id);
        await this.page.getByRole('button', { name: ' Search ' }).click();
        await this.page.waitForLoadState();
    }

    async getEmployeeData() {
        let employee = {
            id: '',
            firstName: '',
            lastName: ''
        }

        const allRows = this.page.locator('//*[@class="oxd-table-card"]//div[@role="row"]')

        // const rowCount = await this.getallRowsCount();

        for (let i = 1; i <= await allRows.count(); i++) {

            const resultOfColumns = allRows.nth(i).locator('//*[@class="oxd-table-card"]//div[@role="cell"]');

            console.log(await resultOfColumns.count())
            for (let j = 1; j <= await resultOfColumns.count() - 1; j++) {

                const columnText = await resultOfColumns.nth(j).innerText();
                // if (columnText) {
                console.log(i, j, columnText);
                //     // return columnText;
                // }

            }
        }
        const empId = await this.page.locator('//*[@class="oxd-table-card"]//div[@role="cell"]').nth(1).textContent();
        return empId;
    }

}
export default PimPage;