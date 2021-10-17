import { Link } from '../entities/Link'
import { Resolver, Query, Ctx, Arg, Int, Mutation } from 'type-graphql'
import { MyContext } from 'src/types'

@Resolver()
export class LinkResolver {
  @Query(() => [Link])
  links(@Ctx() { em }: MyContext): Promise<Link[]> {
    return em.find(Link, {})
  }

  @Query(() => Link, { nullable: true })
  link(
    @Arg('identifier', () => Int) id: number,
    @Ctx() { em }: MyContext,
  ): Promise<Link | null> {
    return em.findOne(Link, { id })
  }

  @Mutation(() => Link)
  async createLink(
    @Arg('title') title: string,
    @Ctx() { em }: MyContext,
  ): Promise<Link> {
    const link = em.create(Link, { title })
    await em.persistAndFlush(link)
    return link
  }

  
  @Mutation(() => Link, { nullable: true })
  async updateLink(
    @Arg('id') id: number,
    @Arg('title', () => String, { nullable: true }) title: string,
    @Ctx() { em }: MyContext,
  ): Promise<Link | null> {
    const link = await em.findOne(Link, { id })

    if (!link) {
      return null
    }

    if (title) {
      link.title = title
      await em.persistAndFlush(link)
    }

    return link
  }

  @Mutation(() => Boolean)
  async deleteLink(
    @Arg('id') id: number,
    @Ctx() { em }: MyContext,
  ): Promise<boolean> {
    await em.nativeDelete(Link, { id })
    return true
  }
}
