const axios = require('axios');
var md5 = require('md5');

class LoginLogic {

    server = "";
    mail = "";
    password = "";

    constructor(server, mail, password) {
        this.server = server;
        this.mail = mail;
        this.password = password;
    }

    mailExists = async () => {
        const mailLower = this.mail.toLowerCase();
        const verifMail = await axios.post(`${this.server}/verifMail`, { params: { mailLower } })
        return verifMail;
    }

    connection = async () => {
        const user = {
            mail: this.mail.toLowerCase(),
            password:md5(this.password),
            // password: this.password,
        }
        const connecting = await axios.post(`${this.server}/connection`, { params: { user } })
        return connecting;
    }
}

module.exports = LoginLogic