import React from 'react'
import Header from './header'
import MainHome from './home'
import ScrollUpButton from './scrollButton'

export default function Main() {
    return (
        <>
            <ScrollUpButton />
            <Header />
            <MainHome />
        </>
    )
}
