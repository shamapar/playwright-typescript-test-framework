import { credential } from "../testData/credential";
import { employee } from "../testData/employeeInformation";
import { test, expect } from "../fixture/custom";

test.beforeEach('logging into Application', async ({ loginpage }) => {
    await loginpage.loginIntoApllication(credential.username, credential.password);
    await expect(loginpage.dashboardTitle).toHaveText("Dashboard");
})

test('Adding and Searching of Employee to PIM page', async ({ menupage, pimpage }) => {

    await menupage.navigateToMenu("PIM");
    await expect(menupage.pageTitle).toHaveText("PIM");

    await pimpage.navigatingPIMMenuByName("Add Employee");
    await expect(pimpage.employeeMenuTitle).toContainText("Add Employee");

    const employeeId = employee.empId;
    await pimpage.addEmployee(employee.firstName, employee.lastname, employeeId, employee.username, employee.password);
    await expect(pimpage.notificationStatus).toHaveText("Successfully Saved");

    await pimpage.searchForExistingEmployee(employeeId);
    expect(await pimpage.getallRowsCount()).toEqual(1);

    const foundEmployee = await pimpage.getEmployeeData();
    expect(foundEmployee).toEqual(employeeId);
})
