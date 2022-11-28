import { config } from 'dotenv'

config()

export const mongourl = process.env.MONGO_URL
export const secret = process.env.SECRET
export const port = process.env.PORT
export const appname = 'Fitme'
export const apiURL = process.env.BASE_API_URL
export const serverURL = process.env.BASE_SERVER_URL
export const clientURL = process.env.BASE_CLIENT_URL
// export const stripe_pub = process.env.STRIPE_PUB
// export const stripe_priv = process.env.STRIPE_PRIV

// export const smsusername = process.env.SMSUSERNAME
// export const smskey = process.env.SMSKEY

// export const twaccsid = process.env.TW_ACC_SID
// export const twacctoken = process.env.TW_ACC_TOKEN
// export const twnumber = process.env.TW_NUMBER

// export const vonage_key = process.env.VONAGE_API_KEY
// export const vonage_secret = process.env.VONAGE_SECRET

// export const api_key_free = process.env.APILAYERAPIKEY
// export const vonage_key = process.env