import React from 'react'
import Header from './header'
import MainHome from './home'
import ScrollUpButton from './scrollButton'
import About from './about'

export default function Main() {
    return (
        <>
            <ScrollUpButton />
            <Header />
            <MainHome />
            <About />
        </>
    )
}
