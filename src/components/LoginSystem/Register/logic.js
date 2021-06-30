const axios = require('axios');
var md5 = require('md5');

class Registering {

    server = "";
    username = "";
    pass1 = "";
    pass2 = "";
    first = "";
    last = "";
    mail = "";

    constructor(server, username, pass1, pass2, first, last, mail) {
        this.server = server;
        this.username = username;
        this.pass1 = pass1;
        this.pass2 = pass2;
        this.first = first;
        this.last = last;
        this.mail = mail;
    }

    empty = () => {
        if (!this.username || !this.pass1 || !this.pass2 || !this.first || !this.last || !this.mail) {
            return false;
        }
        return true;
    }
    pass = () => {
        if (this.pass1 !== this.pass2) {
            return false
        }
        return true
    }
    verifPass = () => {
        const pass = this.pass1.toString()
        if (pass.length < 6) {
            return false
        }
        return true;
    }
    usernameExists = async () => {
        const usernameLower = this.username.toLowerCase();
        const verifUsername = await axios.post(`${this.server}/verifUsername`, { params: { usernameLower } })
        return verifUsername;
    }
    mailExists = async () => {
        const mailLower = this.mail.toLowerCase();
        const verifMail = await axios.post(`${this.server}/verifMail`, { params: { mailLower } })
        return verifMail;
    }
    verifRegexUsername = () => {
        const regex = /[a-z0-9]/;
        const usernameLower = this.username.toLowerCase();

        for (let i = 0; i < usernameLower.length; i++) {
            if (regex.exec(usernameLower[i]) == null) {
                return false;
            }
        }
        return true
    }
    verifRegexFirst = () => {
        const regex = /[a-z]/;
        const firstLower = this.first.toLowerCase().replaceAll("-", "");

        for (let i = 0; i < firstLower.length; i++) {
            if (regex.exec(firstLower[i]) == null) {
                return false;
            }
        }
        return true
    }
    verifRegexLast = () => {
        const regex = /[a-z]/;
        const lastLower = this.last.toLowerCase().replaceAll("-", "");


        for (let i = 0; i < lastLower.length; i++) {
            if (regex.exec(lastLower[i]) == null) {
                return false;
            }
        }
        return true
    }
    verifRegexMail = () => {
        const regex = /[a-z0-9]/;
        const mailLower = this.mail.toLowerCase().replace("@", "").replaceAll(".", "").replaceAll("-", "").replaceAll("_", "");

        for (let i = 0; i < mailLower.length; i++) {
            if (regex.exec(mailLower[i]) == null) {
                return false;
            }
        }
        return true;
    }
    createUser = async () => {
        const newUser = {
            username: this.username,
            password: md5(this.pass1),
            // password: this.pass1,
            firstname: this.first,
            lastname: this.last,
            mail: this.mail,
            confirmed: false,
            credit: 100,
            admin: false,
        }
        const create = await axios.post(`${this.server}/createuser`, { params: { newUser } })
        return create;
    }
    sendMail = async () => {
        const mail = this.mail;
        const mailSending = await axios.post(`${this.server}/mailing`, { params: { mail } })
        return mailSending;
    }

    // sendNewUser = () => {

    //     return await axios.post("http://localhost:2108/", { params: { mail } })
    // }

}

export default Registering