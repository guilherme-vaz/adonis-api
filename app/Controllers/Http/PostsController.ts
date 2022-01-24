import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import { StoreValidator, UpdateValidator } from 'App/Validators/Post'
// import Database from '@ioc:Adonis/Lucid/Database'

export default class PostsController {
  // Responsável por listar dados
  public async index({}: HttpContextContract) {
    const posts = await Post.query().orderBy('id').preload('author')

    return posts
  }

  // Responsável por criar um objeto no BD
  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const user = await auth.authenticate()
    const post = await Post.create({ authorId: user.id, ...data })

    await post.preload('author')

    return post
  }

  // Responsável por exibir um objeto específico
  public async show({ params }: HttpContextContract) {
    // const post = await Database.rawQuery(`select * from posts where id = ${params.id}`)
    const post = await Post.findOrFail(params.id)
    return post
  }

  // Responsável por atualizar um objeto no BD
  public async update({ request, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const data = await request.validate(UpdateValidator)

    // Atualizando e salvando
    post.merge(data)
    await post.save()
    await post.preload('author')

    return post
  }

  // Responsável por deletar um objeto no BD
  public async destroy({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    // Deletando o post
    await post.delete()
  }
}
