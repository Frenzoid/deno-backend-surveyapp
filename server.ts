import { Application, Router, RouterContext } from "https://deno.land/x/oak@v5.3.1/mod.ts";

const app = new Application();
const router = new Router();

router.get("/", (ctx: RouterContext) => {
    ctx.response.body = "Hello World";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({hostname, port, secure}) => {
    console.log(`Listening on ${secure ? 'https' : 'http'}://${hostname || 'localhost'}:${port}`);
});

await app.listen({port: 8000});
