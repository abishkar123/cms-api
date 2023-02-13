import nodemailer from 'nodemailer'


// configure and send email 
const sendEmail = async (emailBody)=>{
    try{
        //config
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP,
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

      
    //send email
    const info = await transporter.sendMail(emailBody);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};

// make email template and data ready
export const newAccountEmailVerificationEmail = (link, obj) => {
  const emailBody = {
    from: `"Coding Shop", <${obj.email}>`,
    to: process.env.EMAIL_USER,
    subject: "Verify your email",
    text: "Plase follow the link to verify your account " + link,
    html: `
        <p>
            Hi ${obj.fName}
        </p>
        <br />
        
        <p>
          Please follow the link below to verify your new account
        </p>
        <br >
<p>
                Hi 
              <br> Please verify your email address.
              
                <a href= ${link} > ${link} </a>
    </p>
    <br >
    <p>
    Regards, 
    <br>
   Abishkar Rai team
</p>
        `,
  };

  sendEmail(emailBody);
};
// email verified notification
export const emailVerifiedNotification = ({ fName, email }) => {
  const emailBody = {
    from: `"Coding Shop", <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Account verified",
    text: "Your account has been verified. You may login now",
    html: `
        <p>
            Hi ${fName}
        </p>
        <br />
        
        <p>
        Your account has been verified. You may login now
        </p>
        <br >
<p>
 <a href= "${process.env.FRONTEND_ROOT_URL}" style="background:green; color: white; padding:1rem 2.5px"> Login </a>
    </p>
    <br >
    <p>
    Regards, 
    <br>
   Coding Shop customer care team
</p>
        `,
  };

  sendEmail(emailBody);
};