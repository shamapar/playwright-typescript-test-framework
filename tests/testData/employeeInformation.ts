import { faker, Sex } from '@faker-js/faker'

const first_name = faker.person.fullName({ sex: 'male' });

export const employee = {
    firstName: first_name,
    middleName: faker.person.middleName('male'),
    lastname: faker.person.lastName('male'),
    empId: faker.number.int({ max: 999999999 }).toString(),
    username: faker.internet.username({ firstName: first_name }),
    password: faker.internet.password({ length: 20, memorable: true, prefix: 'A1a@' }),
    userStatus: "Disabled"

}


