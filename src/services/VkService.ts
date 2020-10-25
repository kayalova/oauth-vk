import { VkServiceOptions } from "../interfaces"
import { makeRequest } from "../utils"

export class VkService {
    public vkAppID: string;
    public redirectUri: string;
    public appSecret: string;
    constructor(options: VkServiceOptions) {
        this.vkAppID = options.id
        this.redirectUri = options.redirectUri
        this.appSecret = options.secret
    }

    async initUser() {
        const options = {
            url: "https://oauth.vk.com/authorize",
            qs: {
                client_id: this.vkAppID,
                display: "popup",
                redirect_uri: this.redirectUri,
                scope: "friends",
                response_type: "code",
                v: "5.68"
            }
        }

        const a = await makeRequest(options.url, options.qs)
        return a
    }

    getUserToken(code: any) {
        const options = {
            url: "https://oauth.vk.com/access_token",
            qs: {
                // client_id: this.app_id,
                // client_secret: this.app_secret,
                // redirect_uri: this.redirect_uri,
                // code: client_code,
                // scope: "offline"
            }
        }
    }

    getFriends(userID: string, accessToken: string, count: number) {
        const options = {
            url: "https://api.vk.com/method/friends.get",
            qs: {
                user_id: userID,
                order: "random",
                count: count,
                // fields: params.join(','),
                access_token: accessToken
            }
        }
    }
}
