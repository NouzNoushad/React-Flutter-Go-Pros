import React from 'react'
import Header from './header'
import MainHome from './home'
import ScrollUpButton from './scrollButton'
import About from './about'
import Services from './services'

export default function Main() {
    return (
        <>
            <ScrollUpButton />
            <Header />
            <MainHome />
            <About />
            <Services />
        </>
    )
}
