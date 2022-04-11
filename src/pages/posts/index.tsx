import { GetStaticProps } from 'next'
import Head from 'next/head'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import { getPrismicClient } from '../../services/prismic'
import styles from './styles.module.scss'

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
  }

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>

                <main className={styles.container}>
                    <div className={styles.posts}>
                        <a href="">
                            <time>07 de abril de 2022</time>
                            <strong>Creating a repo with Next.js</strong>
                            <p>paragraph test of this post.</p>
                        </a>
                        <a href="">
                            <time>07 de abril de 2022</time>
                            <strong>Creating a repo with Next.js</strong>
                            <p>paragraph test of this post.</p>
                        </a>
                        <a href="">
                            <time>07 de abril de 2022</time>
                            <strong>Creating a repo with Next.js</strong>
                            <p>paragraph test of this post.</p>
                        </a>
                    </div>
                </main>
            </Head>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'publication')
    ], { fetch: ['publication.title', 'publication.content'],
        pageSize: 100
})

    console.log(JSON.stringify(response.results, null, 2))


    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title[0]),
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '', 

        }
    })
    return {
        props: {}
    }

}
