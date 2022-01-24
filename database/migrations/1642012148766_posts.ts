import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Posts extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // Colunas da tabela Posts
      table.increments('id')
      table.string('title').notNullable().unique()
      table.text('content', 'longtext').notNullable()
      // O unsigned diz pro adonis que essa propriedade integer não vai ter limite númerico.
      table
        .integer('author_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  // Nesse método ele destrói a tabela
  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
