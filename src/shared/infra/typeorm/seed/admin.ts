import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";

import createConnection from "../index";


create().then(() => console.log("User admin created!"))



async function create() {
  const connection = createConnection("localhost");

  const id = uuidV4();
  const password = await hash("admin", 8);


  (await connection).query(
    `INSERT INTO USERS(id,name,email,password,"isAdmin",created_at,driver_license)
      values('${id}','admin','admin@rentx.com.br', '${password}',true,'now()', 'XXXX-XXX')`
  )
}


create().then(() => console.log("User admin created!"))
