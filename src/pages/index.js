import { graphql, Link } from "gatsby"
import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const stieDescription = data.site.siteMetadata?.description || `Description`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle} description={stieDescription}>
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle} description={stieDescription}>
      <ol>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2 className="underline">
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                    <small className="font-light">{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
              <div className="mb-4">
                <Link to={post.fields.slug} itemProp="url">
                  <span itemProp="headline" className="font-extralight text-gray-4">read more...</span>
                </Link>
              </div>
              {post.frontmatter.tags?.map((tag) => {
                    return <Link to={`/tags/${tag}`} className="tag mr-2 border rounded-xl px-2 py-1 text-sm font-light hover:bg-slate-900 hover:text-white">{tag}</Link>
                  })}
              <hr className="my-4" />
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}


export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
    }
  }
`
