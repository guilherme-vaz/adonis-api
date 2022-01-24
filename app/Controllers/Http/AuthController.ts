import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthValidator from 'App/Validators/AuthValidator'

export default class AuthController {
  // Criação de autenticação - LOGIN
  public async store({ request, auth }: HttpContextContract) {
    // Precisamos receber do front-end as credencias de login (email e senha por exemplo)
    const { email, password } = request.all().validate(AuthValidator)
    const token = await auth.attempt(email, password, {
      expiresIn: '30 days'
    })

    return token
  }

  // Destruição de autenticação - LOGOUT
  public async destroy({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
