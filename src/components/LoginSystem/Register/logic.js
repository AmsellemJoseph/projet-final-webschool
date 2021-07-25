
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
        let mailG = ""
        if (mail.includes("gmail")) {
            mailG = mail.replace(/['.']/g, "").replace('gmailcom', "gmail.com")
        } else {
            mailG = mail
        }
        this.mail = mailG;
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
        let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
        if (!strongPassword.test(this.pass1)) {
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
        let mailLower = this.mail
        // if (this.mail.includes("gmail")) {
        //     mailLower = this.mail.replace(/['.']/g, "").replace('gmailcom', "gmail.com")
        // } else {
        //     mailLower = this.mail
        // }
        const regex = new RegExp(/^([\w-]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i);

        var valid = regex.test(mailLower)
        if (!valid) {
            return false;
        }
        return true;

    }
    createUser = async () => {
        let mailLower = this.mail;
        // if(this.mail.includes("gmail")){
        //     mailLower = this.mail.replace(/['.']/g,"").replace('gmailcom',"gmail.com")
        // }else{
        //     mailLower = this.mail
        // }
        const newUser = {
            username: this.username,
            password: md5(this.pass1),
            // password: this.pass1,
            firstname: this.first,
            lastname: this.last,
            mail: mailLower,
            confirmed: false,
            credit: 100,
            admin: false,
            token: md5(Date.now()),
            profilPic: 'default.jpg',
            created: Date.now(),
            lastConnection: Date.now(),
            nbrConnection: 0,
            nbrClick: 0,
            nbrRace: 0,
        }
        const create = await axios.post(`${this.server}/createuser`, { params: { newUser } })
        return create;
    }
    sendMail = async () => {
        let mail = this.mail
        // if (this.mail.includes("gmail")) {
        //     mail = this.mail.replace(/['.']/g, "").replace('gmailcom', "gmail.com")
        // } else {
        //     mail = this.mail
        // }
        const mailSending = await axios.post(`${this.server}/mailing`, { params: { mail } })
        return mailSending;
    }

    // sendNewUser = () => {

    //     return await axios.post("http://localhost:2108/", { params: { mail } })
    // }

}

export default Registering