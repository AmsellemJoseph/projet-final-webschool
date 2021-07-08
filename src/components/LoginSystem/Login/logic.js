const axios = require('axios');
var md5 = require('md5');

class LoginLogic {

    server = "";
    mail = "";
    password = "";

    constructor(server, mail, password) {
        this.server = server;
        let mailG = ""
        if (mail.includes("gmail")) {
            mailG = mail.replace(/['.']/g, "").replace('gmailcom', "gmail.com")
        } else {
            mailG = mail
        }
        this.mail = mailG;
        this.password = password;
    }
    mailExists = async () => {
        let mailLower = ""
        if (this.mail.includes("gmail")) {
            mailLower = this.mail.replace(/['.']/g, "").replace('gmailcom', "gmail.com")
        } else {
            mailLower = this.mail
        }
        const verifMail = await axios.post(`${this.server}/verifMail`, { params: { mailLower } })
        return verifMail;
    }

    connection = async () => {
        let mail = "";
        if (this.mail.includes("gmail")) {
            mail = this.mail.replace(/['.']/g, "").replace('gmailcom', "gmail.com")
        } else {
            mail = this.mail
        }
        const user = {
            mail: this.mail.toLowerCase(),
            password: md5(this.password),
            // password: this.password,
        }
        const connecting = await axios.post(`${this.server}/connection`, { params: { user } })
        return connecting;
    }
    verifPending = async () => {
        const mail = this.mail.toLocaleLowerCase();
        const pending = await axios.post(`${this.server}/verifpending`, { params: { mail } })
        return pending;

    }
    recupInfo = async () => {
        const mail = this.mail.toLocaleLowerCase();
        const info = await axios.post(`${this.server}/getuser`, { params: { mail } })
        return info;
    }
    majConnection = async () => {
        const mail = this.mail.toLocaleLowerCase();
        const maj = await axios.put(`${this.server}/majconnection`, { params: { mail } })
        return maj
    }

}

module.exports = LoginLogic