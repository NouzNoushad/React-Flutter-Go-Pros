import Banner from "./banner";
import Blog from "./blog";
import FactCounter from "./fact_counter";
import Features from "./features";
import Header from "./header";
import Home from "./home";
import Service from "./service";
import Steps from "./steps";
import Team from "./team";
import Testimonials from "./testimonials";

export default function Main() {
    return (
        <div>
            <Header />
            <Home />
            <Features />
            {/* TODO: About */}
            <FactCounter />
            <Service />
            {/* TODO: Categories */}
            <Steps />
            <Blog />
            <Banner />
            <Team />
            <Testimonials />
        </div>
    )
}
