const axios = require('axios');

class Registering {

    allUsers = "";
    username = "";
    pass1 = "";
    pass2 = "";
    first = "";
    last = "";
    mail = "";

    constructor(allUsers, username, pass1, pass2, first, last, mail) {
        this.allUsers = allUsers;
        this.username = username;
        this.pass1 = pass1;
        this.pass2 = pass2;
        this.first = first;
        this.last = last;
        this.mail = mail;
    }

    empty = () => {
        if (this.username == "" || this.pass1 == "" || this.pass2 == "" || this.first == "" || this.last == "" || this.mail == "") {
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
        console.log(pass.length);
        if (pass.length < 6) {
            return false
        }
        return true;
    }
    usernameExists = () => {
        const usernameLower = this.username.toLowerCase();
        const user = this.allUsers.some((user) => {
            return user.username == usernameLower
        });
        return user;
    }
    mailExists = () => {
        const mailLower = this.mail.toLowerCase();
        const email = this.allUsers.some((user) => {
            return user.mail == mailLower
        });
        return email;
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

    // sendNewUser = () => {

    //     return await axios.post("http://localhost:2108/", { params: { mail } })
    // }

}

export default Registering