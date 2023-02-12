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

// make email template and data ready
export const emailverifiedotification = ({fName, email}) => {
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
              
                <a href= ${process.env.FRONTEND_ROOT_URL} /login> > ${link} </a>
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
