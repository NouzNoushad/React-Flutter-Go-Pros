import FactCounter from "./fact_counter";
import Features from "./features";
import Header from "./header";
import Home from "./home";
import Service from "./service";

export default function Main() {
    return (
        <div>
            <Header />
            <Home />
            <Features />
            {/* TODO: About */}
            <FactCounter />
            <Service />
        </div>
    )
}
