const axios = require('axios');

class ChangeProfilPicture {

    user = JSON.parse(localStorage.getItem('user'));
    server = "http://localhost:2108/registration";
    picture = "";

    constructor(picture) {
        this.picture = picture;
    }

    verifType = () => {
        console.log(this.picture)
        if (this.picture.type == "image/png" || this.picture.type == "image/jpeg" || this.picture.type == "image/gif") {
            return true;
        } else {
            return false;
        }
    }

    verifSize = () => {
        if (this.picture.size > 5000000) {
            return false
        } else {
            return true
        }
    }
    changeImage = async () => {
        const data = new FormData();
        data.append('file', this.picture)
        const sending = await axios.post('http://localhost:2108/registration/img', data, {
        })
        if (!sending) {
            return false
        } else {
            return sending
        }
    }
    sendDB = async (sending) => {
        const newNameImg = await sending.data.nameImg;
        const mail = this.user
        const newName = await axios.put(`${this.server}/newnameimg`, { params: { mail, newNameImg } })
        return newName
    }



}

module.exports = ChangeProfilPicture