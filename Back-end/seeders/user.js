import { faker } from "@faker-js/faker";
import { User } from "../models/user.js";
import logger from "../utils/logger.js";


const createUser = async (numUsers) => {
  try {
    const usersPromise = [];

    for (let i = 0; i < numUsers; i++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        bio: faker.lorem.sentence(10),
        password: "password",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });
      usersPromise.push(tempUser);
    }

    await Promise.all(usersPromise);

    logger.info("Users created successfully");
    process.exit(0); // ✅ exit(0) means success
  } catch (error) {
    logger.error("Error creating users:", error);
    process.exit(1);
  }
};

export { createUser };
