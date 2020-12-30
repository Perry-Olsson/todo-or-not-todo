import { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import bcrypt from "bcryptjs";

import { User } from "../entities/User";
import { users } from "../testResources";

const main = async () => {
  const orm = await MikroORM.init();
  await orm.getSchemaGenerator().updateSchema();
  await addUsers(orm);
  orm.close();
};

export const addUsers = async (
  orm: MikroORM<IDatabaseDriver<Connection>>
): Promise<void> => {
  const em = orm.em;
  for (const userInput of users) {
    const hashedPassword = await bcrypt.hash(userInput.password, 2);
    const user = em.create(User, { ...userInput, password: hashedPassword });
    await em.persistAndFlush(user);
  }
};

main();
