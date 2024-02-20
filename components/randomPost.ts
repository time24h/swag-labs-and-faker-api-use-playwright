import { faker } from "@faker-js/faker";
import { isCompleted } from "./randomCompleted";

export const dataDummy = {
  id: faker.number.int({ min: 1, max: 30 }),
  title: `${faker.lorem.sentence(4)}`,
  dueDate: "2023-11-29T06:18:21.190Z",
  completed: isCompleted,
};
