import { faker } from '@faker-js/faker'
import { IEmployeeInformationStructure } from '../interface/employee';

const first_name = faker.person.fullName();

export const employeeData: IEmployeeInformationStructure = {
    firstname: first_name,
    lastname: faker.person.lastName(),
    employeeId: faker.number.int({ max: 999999999 }).toString(),
    username: faker.internet.username({ firstName: first_name }),
    password: faker.internet.password({ length: 20, memorable: true, prefix: 'A1a@' }),
    userStatus: "Disabled"
}


