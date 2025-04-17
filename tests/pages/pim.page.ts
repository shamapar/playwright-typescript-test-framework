import { Page } from '@playwright/test'
import { ApplicationLabels, PIMMenuOptions } from '../testData/menus';
import { IEmployeeInformationStructure } from '../interface/employee';


class PimPage {
    page: Page
    constructor(page: Page) {
        this.page = page;
    }

    async navigatingPIMMenusByName(menuName: PIMMenuOptions) {
        await this.page.getByRole('link', { name: menuName }).click();
    }

    get employeeMenuTitle() {
        return this.page.getByRole("heading", { name: 'Add Employee' })
    }

    getInputLocatorByLabel(label: ApplicationLabels) {
        return this.page.locator(`//label[text()="${label}"]/..//following-sibling::div/input`);
    }

    get notificationStatus() {
        return this.page.getByText('Successfully Saved')
    }

    async addEmployee(employeeInformation: IEmployeeInformationStructure) {
        await this.page.getByPlaceholder('First Name').fill(employeeInformation.firstname);
        await this.page.getByPlaceholder('Last Name').fill(employeeInformation.lastname);
        await this.getInputLocatorByLabel('Employee Id').fill(employeeInformation.employeeId);
        await this.page.locator("//input[@type='checkbox']//..//span").click();
        await this.getInputLocatorByLabel('Username').fill(employeeInformation.username);

        if (employeeInformation.userStatus === 'Disabled') {
            await this.page.getByRole("radio", { name: 'Disabled' }).locator('//following-sibling::span').click();
        }
        await this.getInputLocatorByLabel('Password').fill(employeeInformation.password);
        await this.getInputLocatorByLabel('Confirm Password').fill(employeeInformation.password);
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async getallRowsCount() {
        const allRows = this.page.getByRole('table').getByRole('row').last()
        const tableBody = this.page.locator('//div[@data-v-5a621acd]//span');
        await tableBody.waitFor({ state: 'visible' });
        return await allRows.count();
    }

    async searchForExistingEmployee(id: string,) {
        await this.navigatingPIMMenusByName('Employee List');
        await this.getInputLocatorByLabel('Employee Id').fill(id);
        await this.page.getByRole('button', { name: ' Search ' }).click();
        await this.page.waitForLoadState();
    }

    async getEmployeeData() {
        let employee = {
            id: '',
            firstName: '',
            lastName: ''
        }

        const allRows = await this.page.getByRole('table').getByRole('row').last().getByRole('cell').all();

        for (let i = 1; i <= allRows.length - 1; i++) {
            const columnText = await allRows[i].innerText();
            if (i == 1) employee.id = columnText;
            if (i == 2) employee.firstName = columnText;
            if (i == 3) employee.lastName = columnText;
        }

        return employee.id;
    }
}

export default PimPage;