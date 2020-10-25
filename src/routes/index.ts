import * as Router from "koa-router"
import * as controllers from "../controllers"

const router = new Router()

router.get("/", controllers.mainPage)
router.get("/login", controllers.login)
router.get("/auth", controllers.auth)

export default router
