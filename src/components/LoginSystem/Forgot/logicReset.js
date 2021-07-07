const axios = require('axios');
const md5 = require('md5')

class ResetPassword {
    server = "";
    mail = "";
    pass1 = "";
    pass2 = "";

    constructor(server, mail, pass1, pass2) {
        this.server = server;
        this.pass1 = pass1;
        this.pass2 = pass2;
        this.mail = mail;
    }

    verifPass = () => {
        if (!this.pass1 || !this.pass2 || this.pass1 != this.pass2) {
            return false;
        }
        return true;
    }
    verifPassStrong = () => {
        let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
        if (!strongPassword.test(this.pass1)) {
            return false
        }
        return true;
    }
    resetingPassword = async () => {
        const mail = this.mail;
        const pass = md5(this.pass1)
        const res = await axios.put(`${this.server}/newpassword`,{ params: { mail,pass }})
        if(!res){
            return false
        }
        return true;
    }

}

module.exports = ResetPassword