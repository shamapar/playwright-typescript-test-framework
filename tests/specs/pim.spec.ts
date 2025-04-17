import { credential } from "../testData/credential";
import { employeeData } from "../testData/employeeInformation";
import { test, expect } from "../fixture/custom";

test.beforeEach('logging into Application', async ({ loginpage }) => {
    await loginpage.loginIntoApllication(credential.username, credential.password);
    await expect(loginpage.dashboardTitle).toHaveText("Dashboard");
})

test('Adding and Searching of Employee to PIM page', async ({ menupage, pimpage }) => {

    await menupage.navigateToMenu("PIM");
    await expect(menupage.pageTitle).toHaveText("PIM");

    await pimpage.navigatingPIMMenusByName("Add Employee");
    await expect(pimpage.employeeMenuTitle).toHaveText("Add Employee");

    await pimpage.addEmployee(employeeData);
    await expect(pimpage.notificationStatus).toHaveText("Successfully Saved");

    await pimpage.searchForExistingEmployee(employeeData.employeeId);
    expect(await pimpage.getallRowsCount()).toEqual(1);

    const foundEmployee = await pimpage.getEmployeeData();
    expect(foundEmployee).toEqual(employeeData.employeeId);
})
