"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
(0, utils_1.loadEnv)(process.env.NODE_ENV || "development", process.cwd());
module.exports = (0, utils_1.defineConfig)({
    projectConfig: {
        databaseUrl: process.env.DATABASE_URL,
        http: {
            storeCors: process.env.STORE_CORS,
            adminCors: process.env.ADMIN_CORS,
            // @ts-expect-error: vendorCors is not a valid config
            vendorCors: process.env.VENDOR_CORS,
            authCors: process.env.AUTH_CORS,
            jwtSecret: process.env.JWT_SECRET || "supersecret",
            cookieSecret: process.env.COOKIE_SECRET || "supersecret",
        },
    },
    admin: {
        disable: true,
    },
    plugins: [
        {
            resolve: "@mercurjs/b2c-core",
            options: {},
        },
        {
            resolve: "@mercurjs/commission",
            options: {},
        },
        /*
        {
          resolve: '@mercurjs/algolia',
          options: {
            apiKey: process.env.ALGOLIA_API_KEY,
            appId: process.env.ALGOLIA_APP_ID
          }
        },
    */
        {
            resolve: "@mercurjs/reviews",
            options: {},
        },
        {
            resolve: "@mercurjs/requests",
            options: {},
        },
        /*
        {
          resolve: '@mercurjs/resend',
          options: {}
        }
    */
    ],
    modules: [
        {
            resolve: "@medusajs/medusa/payment",
            options: {
                providers: [
                    {
                        resolve: "@mercurjs/payment-stripe-connect/providers/stripe-connect",
                        id: "stripe-connect",
                        options: {
                            apiKey: process.env.STRIPE_SECRET_API_KEY,
                        },
                    },
                ],
            },
        },
        {
            resolve: "@medusajs/medusa/notification",
            options: {
                providers: [
                    /*
                    {
                      resolve: "@mercurjs/resend/providers/resend",
                      id: "resend",
                      options: {
                        channels: ["email"],
                        api_key: process.env.RESEND_API_KEY,
                        from: process.env.RESEND_FROM_EMAIL,
                      },
                    },
          */
                    {
                        resolve: "@medusajs/medusa/notification-local",
                        id: "local",
                        options: {
                            channels: ["feed", "seller_feed"],
                        },
                    },
                ],
            },
        },
    ],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkdXNhLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21lZHVzYS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBa0U7QUFFbEUsSUFBQSxlQUFPLEVBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBRTlELE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBQSxvQkFBWSxFQUFDO0lBQzVCLGFBQWEsRUFBRTtRQUNiLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVk7UUFDckMsSUFBSSxFQUFFO1lBQ0osU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVztZQUNsQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFXO1lBQ2xDLHFEQUFxRDtZQUNyRCxVQUFVLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFZO1lBQ3BDLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVU7WUFDaEMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLGFBQWE7WUFDbEQsWUFBWSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLGFBQWE7U0FDekQ7S0FDRjtJQUNELEtBQUssRUFBRTtRQUNMLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxPQUFPLEVBQUU7UUFDUDtZQUNFLE9BQU8sRUFBRSxvQkFBb0I7WUFDN0IsT0FBTyxFQUFFLEVBQUU7U0FDWjtRQUNEO1lBQ0UsT0FBTyxFQUFFLHNCQUFzQjtZQUMvQixPQUFPLEVBQUUsRUFBRTtTQUNaO1FBQ0Q7Ozs7Ozs7O01BUUY7UUFDRTtZQUNFLE9BQU8sRUFBRSxtQkFBbUI7WUFDNUIsT0FBTyxFQUFFLEVBQUU7U0FDWjtRQUNEO1lBQ0UsT0FBTyxFQUFFLG9CQUFvQjtZQUM3QixPQUFPLEVBQUUsRUFBRTtTQUNaO1FBQ0Q7Ozs7O01BS0Y7S0FDQztJQUNELE9BQU8sRUFBRTtRQUNQO1lBQ0UsT0FBTyxFQUFFLDBCQUEwQjtZQUNuQyxPQUFPLEVBQUU7Z0JBQ1AsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFDTCwyREFBMkQ7d0JBQzdELEVBQUUsRUFBRSxnQkFBZ0I7d0JBQ3BCLE9BQU8sRUFBRTs0QkFDUCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUI7eUJBQzFDO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtRQUNEO1lBQ0UsT0FBTyxFQUFFLCtCQUErQjtZQUN4QyxPQUFPLEVBQUU7Z0JBQ1AsU0FBUyxFQUFFO29CQUNUOzs7Ozs7Ozs7O1lBVVI7b0JBQ1E7d0JBQ0UsT0FBTyxFQUFFLHFDQUFxQzt3QkFDOUMsRUFBRSxFQUFFLE9BQU87d0JBQ1gsT0FBTyxFQUFFOzRCQUNQLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUM7eUJBQ2xDO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtLQUNGO0NBQ0YsQ0FBQyxDQUFDIn0=