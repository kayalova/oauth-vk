import { Context } from "koa"
import { VkServiceOptions } from "../interfaces"
import { VkService } from "../services/VkService"
import * as dotenv from "dotenv"
import * as path from "path"

dotenv.config({
    path: path.join(__dirname, "..", "..", ".env")
})

const serviceOptions: VkServiceOptions = {
    id: process.env.VK_API_ID!,
    secret: process.env.VK_API_SECRET!,
    redirectUri: process.env.REDIRECT_URI!
}

const vk = new VkService(serviceOptions)

export const login = (ctx: Context) => {
    return ctx.render("login")
}

export const mainPage = async (ctx: Context) => {
    console.log(ctx.query)

    // const a = await vk.initUser()
    // makeRequest()
    // if not authorized redirect on '/'
    // return ctx.render("main")
}

// auth server vk
export const auth = (ctx: Context) => {
    ctx.redirect("https://oauth.vk.com/authorize?" +
        `client_id=${serviceOptions.id}&` +
        "display=popup&" +
        `redirect_uri=${serviceOptions.redirectUri}&` +
        "scope=friends&" +
        "response_type=code&" +
        "v=5.68")

    // vk.initUser
    // return ctx.redirect("/")
}
