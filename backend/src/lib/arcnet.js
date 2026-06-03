import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import "dotenv/config";

export const aj = arcjet({
    // Get your site key from https://app.arcjet.com and set it as an environment
    // variable rather than hard coding.
    key: process.env.ARCJET_KEY,
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE", 
            ],
        }),
       
        slidingWindow({
            mode:"LIVE",
            max:100,
            interval:60
        })
    ],
});