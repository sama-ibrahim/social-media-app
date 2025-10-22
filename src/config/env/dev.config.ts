import {config} from "dotenv"
config()

export const devConfig={
    PORT :process.env.PORT,
DB_URL :process.env.DB_URL,

//cloud

   API_KEY  :process.env.API_KEY,
   API_SECRET :process.env.API_SECRET,
   CLOUD_NAME :process.env.CLOUD_NAME,
   JWT_SECRET :process.env.JWT_SECRET,

//email
    EMAIL_USER :process.env.EMAIL_USER,
    EMAIL_PASS :process.env.EMAIL_PASS


 
}