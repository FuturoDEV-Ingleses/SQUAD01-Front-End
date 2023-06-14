import "./Container.css"
import { Navbar } from "../../index"

export default function Container({ children, title }) {
    return (
        <div className="Container">
            <Navbar />

            <header>
                <h1 className="title">{title}</h1>
            </header>

            <main>{children}</main>
        </div>
    )
}