// Purpose: Send email to user for verification
//import nodemailer to send emails
const nodemailer = require("nodemailer");
//import googleapis to get the OAuth2 class
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";
//import the environment variables
const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

//create a new OAuth2 client
//the client will be used to get the access token
//the access token will be used to send emails
const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH,
  oauth_link
);

//this function will send an email to the user
exports.sendVerificationEmail = (email, name, url) => {
  //set the access token
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  //get the access token
  const accessToken = auth.getAccessToken();
  //create a new stmp transporter
  //a transporter is an object that will send the email
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  //set the mail options
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Facebook email verification",
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998"><img src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png" alt="" style="width:30px"><span>Action Required: Please Activate your Facebook account</span></div><div style="padding:1rem 0;border-bottom:1px solid #e5e5e5;border-top:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Hi ${name},</span><div style="padding:20px 0"><span style="padding:1.5rem 0">Thanks for signing up for Facebook! You're just one step away from activating your account.</span></div><div style="padding:20px 0"><span style="padding:1.5rem 0">To activate your account, follow the link below:</span><div><a href=${url} style="display:inline-block;padding:10px 15px;margin-top:10px;margin-bottom:20px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600">Confirm your account</a></div><div><span style="padding:20px 0;margin:1.5rem 0;color:#898f9c">If you didn't sign up for a Facebook account, please let us know.</span></div></div></div>`,
  };
  //send the email using the stmp transporter
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
