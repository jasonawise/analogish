import { Link } from "gatsby"
import * as React from "react"

function Nav({ title, description, navItems }) {
  return (
    <header>
      <nav className="flex justify-between">
        <div>
          <h1 className="">
            <Link to="/">{title}</Link>
          </h1>
          <p className="text-xs font-extralight italic">{description}</p>
        </div>
        <div>
          {navItems?.map((item, index) => {
            return (
              <Link
                to={item.link}
                key={index}
                activeStyle={{ color: "blue" }}
                className="mr-4 hover:underline hover:font-bold"
              >
                {item.name}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}

export default Nav
