import * as React from "react"
import Nav from "./nav"

const Layout = ({ location, title, children, description, navItems }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="p-6" data-is-root-path={isRootPath}>
      <Nav title={title} description={description} navItems={navItems} />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
