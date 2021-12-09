const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const dotenv = require("dotenv");

const MailSender = async ({
  senderAddress,
  recieverAddress,
  subject,
  mailText,
  mailHtml,
}) => {
  dotenv.config();

  const ClientId = process.env.CLIENT_ID;
  const ClientSecret = process.env.CLIENT_SECRET;
  const RedirectUrl = process.env.REDIRECT_URL;
  const RefreshToken = process.env.REFRESH_TOKEN;

  const oAth2Client = new google.auth.OAuth2(
    ClientId,
    ClientSecret,
    RedirectUrl
  );
  oAth2Client.setCredentials({ refresh_token: RefreshToken });
  const sendMail = async () => {
    try {
      const accessToken = await oAth2Client.getAccessToken();
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "mj.khodadadi.96.test@gmail.com",
          clientId: ClientId,
          clientSecret: ClientSecret,
          refreshToken: RefreshToken,
          accessToken: accessToken,
        },
      });

      const mailOptions = {
        from: senderAddress,
        to: recieverAddress,
        subject: subject,
        text: mailText,
        html: mailHtml,
      };
      const results = await transport.sendMail(mailOptions);
      return results;
    } catch (err) {
      return err;
    }
  };
  await sendMail();
  return "email sent ...";
};

module.exports = MailSender;
