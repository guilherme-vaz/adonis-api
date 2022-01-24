import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class CreateUsersSeeder extends BaseSeeder {
  // public static developmentOnly = true --> Serve para rodar a seed somente em ambiente de desenvolvimento

  public async run() {
    // Write your database queries inside the run method

    // Criando muitos usuários
    await User.createMany([
      {
        name: 'Yung da Silva',
        email: 'admin@cataline.io',
        password: 'secret',
        role: 'admin'
      },
      {
        name: 'João da Silva Santos',
        email: 'normal@cataline.io',
        password: 'secret',
        role: 'normal'
      }
    ])

    // Criando um usuário
    // await User.create({
    //   email: 'gui@cataline.io',
    //   password: 'secret'
    // })
  }
}
