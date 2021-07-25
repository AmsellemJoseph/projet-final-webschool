const axios = require('axios');

class ForgotLogic {

    server = "";
    mail = "";

    constructor(server, mail) {
        this.server = server;
        let mailG = ""
        if (mail.includes("gmail")) {
            mailG = mail.replace(/['.']/g, "").replace('gmailcom', "gmail.com")
        } else {
            mailG = mail
        }
        this.mail = mailG;
    }

    mailExists = async () => {
        const mailLower = this.mail.toLowerCase();
        const verifMail = await axios.post(`${this.server}/verifMail`, { params: { mailLower } })
        return verifMail;
    }

    mailSendingReset = async () => {
        const mailLower = this.mail.toLocaleLowerCase();

        const verifMail = await axios.post(`${this.server}/sendmailreset`, { params: { mailLower } })
        return verifMail;
    }

}



module.exports = ForgotLogic