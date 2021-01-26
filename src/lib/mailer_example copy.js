const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "user_mailtrap",
      pass: "password_mailtrap"
    }
})

// 1 - PUT YOUR DATA ACCESS TO THE MAILTRAP
// 2 - RENAME THE FILE "mailer_example.js" FOR "mailer.js"