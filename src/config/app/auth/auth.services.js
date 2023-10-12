require("dotenv").config()
class authService{
    registerEmailMessage(name, token){
        return   `
        <b>Dear ${name}</b><br/>
        <p>Your Account has been created. Please copy or click the link below to activate the account</p>
        <a href="${process.env.FRONTEND_URL}/activate${token}">
            ${process.env.FRONTEND_URL}/activate${token}
        </a><br/>
        <p>
            <b>Regards</b>
        </p>
        <p>
            <b>System Admin</b>
        </p>
        <p>
            <em><small>Please do not reply to this email</small></em>
        </p>
      `
    }
}

const authSvc = new authService()

module.exports= authSvc