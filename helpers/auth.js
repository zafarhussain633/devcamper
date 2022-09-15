import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail"

const getCookiesExpireTime = () => {
  let expireLimit = process.env.JWT_TOKEN_EXPIRATION.replace("d", "");
  const expiresIn = new Date(Date.now() + expireLimit * 24 * 60 * 60 * 1000);
  return expiresIn  // THIS WILL RETURN miliseconds
}

const generateOtp = () => {
  let otp = Math.floor(Math.random()*9000+1000); // will gegrate 4 digit
  return otp.toString();
}

const sendEmail = async (option) => {
  try {
    let transporter = nodemailer.createTransport({
      service: process.env.NODEMAILER_SERVICE_PROVIDER,
      host: process.env.NODEMAILER_HOST,
      port: process.env.NODEMAILER_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.NODEMAILER_AUTH_USERNAME,
        pass: process.env.NODEMAILER_AUTH_password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail(option);

    console.log(info);

  } catch (err) {
    console.log(err);
  }
}


const sendMailUsingSendGrid = async (msg) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  try {
    let res = await sgMail.send(msg)
    console.log(res)    
  } catch (err) {
    console.error(err)
  }

}


export { getCookiesExpireTime, sendEmail ,sendMailUsingSendGrid,generateOtp}