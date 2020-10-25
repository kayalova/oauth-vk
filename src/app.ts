import * as Koa from "koa"
import * as render from "koa-ejs"
import bodyParser from "koa-bodyparser-ts"
// import * as cors from "koa2-cors"
import * as cors from "@koa/cors"
// import * as serve from "koa-static"
import * as logger from "koa-logger"
import * as dotenv from "dotenv"
import * as path from "path"
import router from "./routes"

dotenv.config({
    path: path.join(__dirname, "..", ".env")
})

const app: Koa = new Koa()

app.use(logger())
app.use(bodyParser())

render(app, {
    root: path.join(__dirname, "views"),
    layout: "template",
    viewExt: "html"

})

// app.use(cors({
//     origin: function () { return "*" },
//     allowMethods: ["GET", "POST", "DELETE"],
//     allowHeaders: ["Content-Type", "Authorization", "Accept"]
// }))

// app.use(cors())
app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*")
    ctx.set("Access-Control-Allow-Methods", "DELETE")
    ctx.set("Access-Control-Allow-Methods", "GET")
    ctx.set("Access-Control-Allow-Methods", "POST")
    ctx.set("Access-Control-Allow-Headers", "X-Requested-With,Content-Type")
    // ctx.response.header("Access-Control-Allow-Origin", "*")
    // ctx.response.header("Access-Control-Allow-Methods", "DELETE")
    // ctx.response.header("Access-Control-Allow-Methods", "GET")
    // ctx.response.header("Access-Control-Allow-Methods", "POST")
    // ctx.response.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type")

    next()
})

// app.use(serve(path.join(__dirname, "public")))
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(process.env.APP_PORT, () =>
    console.log(`Server run on port ${process.env.APP_PORT}`)
)
