// server: server gateway and app initializers.
import {
  Application,
} from "./depts";
import db from "./database/dbconnector";
import router from "./router";
import { SubmitRelations } from "./database/relations";

try {
  await db.sync({ drop: true });
  if (db.getConnector()._connected) {
    console.log("Database synced successfully, creating relations!");
    SubmitRelations();
  }
} catch (e) {
  console.error(e);
}

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on ${secure ? "https" : "http"}://${hostname ||
      "localhost"}:${port}`,
  );
});

await app.listen({ port: 8000 });
await db.close();
