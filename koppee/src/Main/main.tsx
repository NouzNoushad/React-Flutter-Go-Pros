import React from 'react'
import Header from './header'
import MainHome from './home'
import ScrollUpButton from './scrollButton'
import About from './about'
import Services from './services'
import Offer from './offer'
import Menu from './menu'
import Reservation from './reservation'
import Testimonial from './testimonial'

export default function Main() {
    return (
        <>
            <ScrollUpButton />
            <Header />
            <MainHome />
            <About />
            <Services />
            <Offer />
            <Menu />
            <Reservation />
            <Testimonial />
        </>
    )
}
