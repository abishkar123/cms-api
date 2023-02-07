import nodemailer from 'nodemailer'


// configure and send email 
const sendEmail = async (emailBody)=>{
    try{
        //config
        const transporter = nodemailer.createTransport({
            host: process.env.STMP,
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        // send email 

const  info = await transporter.sendMail(emailBody);

console.log("Message sent: %s", info.messageId);
console.log("preview Url: %s", nodemailer.getTestMessageUrl(info));
    }catch(error){
    console.log(error)
   }
}

// make email template and data ready

export const newAccountEmailVerificationEmail= (link, obj)=>{
    const emailBody={
        from: `"coding shop", <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: "Verify the your email",
        text:`"please follow the link verify your account"+l{link}`,
        html:`
        
<p>
Hi${obj.fmame}
</p>
<p>
please follow the link to verify your new account
</p>
<br>
<p>
hi <a href=${link}>${link}   </a></p>
<br>
<p>
coding hope </p>
        
        
        `,
    };
    sendEmail(emailBody)
}

