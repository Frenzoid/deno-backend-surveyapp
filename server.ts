// server.ts: server gateway and app initializers.

import "https://deno.land/x/dotenv@v0.5.0/load.ts";
import {
  Application,
} from "./depts.ts";
import db from "./dbconnector.ts";
import router from "./router.ts";

await db.sync({ drop: true });

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
