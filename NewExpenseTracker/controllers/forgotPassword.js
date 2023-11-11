const Sib = require('sib-api-v3-sdk');
const User = require('../models/users');
const client = Sib.ApiClient.instance
const uuid = require('uuid');
require('dotenv').config();
const bcrypt = require('bcrypt');
const Forgotpassword = require('../models/forgotpassword');
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.SENGRID_API_KEY
const path = require('path');
const rootDir = require('../util/path')
const transEmailApi = new Sib.TransactionalEmailsApi()


exports.forgotpassword = async (req, res) => {
    try {
       
        const email  =  req.body.email;
        const sender = {
            email : 'shashwatmzpvns@gmail.com',
            name : 'Shashwat Mishra'
        };
        const receivers = [
            {
                email : req.body.email
            }
        ]
        console.log("Entering here " + email)
        const user = await User.findOne({where : {email }});
        if(user){
            const id = uuid.v4();
            user.createForgotpassword({ id , active: true })
                .catch(err => {
                    console.log("In error block ")
                    throw new Error(err)
                })

            console.log("Coming here forgot password >>>> ")    
            //  const msg = {
            //     sender: 'shashwatmzpvns@gmail.com', // Change to your verified sender
            //     to: receivers, // Change to your recipient                           
            //     subject: 'Sending with SendinBlue is Fun',
            //     textContent: `and easy to do anywhere, even with Node.js`,
            //     // html: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
            // }

            try{
            transEmailApi
            .sendTransacEmail({
                sender, 
                to: receivers,                            
                subject: 'Sending with SendinBlue is Fun',
                textContent: "and easy to do anywhere, even with Node.js",
                htmlContent : `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`
            })
            }

            catch(error) {
                console.log("Thats Error ???>>>>>>" + error)
                throw new Error(error);
            }
    }
}
     catch(err){
        console.error(err)
        return res.json({ message: err, sucess: false });
    }

}

exports.resetpassword = (req, res) => {
    const id =  req.params.id;
    Forgotpassword.findOne({ where : { id }}).then(forgotpasswordrequest => {
        if(forgotpasswordrequest){
            forgotpasswordrequest.update({ active: false});
            res.status(200).send(`<html>
            <script>
                function formsubmitted(e){
                    e.preventDefault();
                    console.log('called')
                }
            </script>

            <form action="/password/updatepassword/${id}" method="get">
                <label for="newpassword">Enter New password</label>
                <input name="newpassword" type="password" required></input>
                <button>Reset password</button>
            </form>
        </html>`)
            //res.sendFile(path.join(rootDir,'public/Registration/forgotPass.html'))
            res.end()
        }
    })
}

exports.updatepassword = (req, res) => {

    try {
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        Forgotpassword.findOne({ where : { id: resetpasswordid }}).then(resetpasswordrequest => {
            User.findOne({where: { id : resetpasswordrequest.userId}}).then(user => {
                // console.log('userDetails', user)
                if(user) {
                    //encrypt the password

                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrypt.hash(newpassword, salt, function(err, hash) {
                            // Store hash in your password DB.
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            user.update({ password: hash }).then(() => {
                                res.status(201).json({message: 'Successfuly update the new password'})
                            })
                        });
                    });
            } else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
            })
        })
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }

}


// module.exports = {
//     forgotpassword,
//     updatepassword,
//     resetpassword
// }