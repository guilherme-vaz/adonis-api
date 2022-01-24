import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  // É possível mudar a forma de autenticação de email para username por exemplo, mas pra isso temos que definir no uids no arquivo auth.ts da pasta config.
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.string('name').notNullable()
      table.enu('role', ['normal', 'admin']).defaultTo('normal')
      table.string('remember_me_token').nullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
