import React from 'react'
import { FacebookIcon, InstagramIcon, LinkedInIcon, XTwitterIcon } from '../Components/Icons'

export default function Footer() {
    return (
        <footer className='relative bg-[#FFFBF2]'>
            <div className="absolute left-0 top-[-1px] z-10 w-full h-[15px] bg-[url('/public/images/overlay-top.png')]"></div>
            <div className="bg-[url('/public/images/bg.jpg')] bg-cover bg-center relative after:absolute after:inset-0 after:bg-primary/90 text-white">
                <div className="container-lg py-[5rem] h-full relative z-10 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                    <div className="space-y-4">
                        <h4 className='text-2xl uppercase tracking-widest'>Get In Touch</h4>
                        <ul className='space-y-3'>
                            <li>123 Street, New York, USA</li>
                            <li>+012 345 67890</li>
                            <li>info@example.com</li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className='text-2xl uppercase tracking-widest'>Follow Us</h4>
                        <p>Amet elitr vero magna sed ipsum sit kasd sea elitr lorem rebum</p>
                        <ul className='flex flex-row items-center gap-2'>
                            <li className='h-10 w-10 border border-white flex items-center justify-center'>
                                <XTwitterIcon className='size-5' />
                            </li>
                            <li className='h-10 w-10 border border-white flex items-center justify-center'>
                                <FacebookIcon className='size-5' />
                            </li>
                            <li className='h-10 w-10 border border-white flex items-center justify-center'>
                                <LinkedInIcon className='size-5' />
                            </li>
                            <li className='h-10 w-10 border border-white flex items-center justify-center'>
                                <InstagramIcon className='size-5' />
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className='text-2xl uppercase tracking-widest'>Open Hours</h4>
                        <ul className='space-y-3'>
                            <li>
                                <h6 className='uppercase text-lg'>Monday - Friday</h6>
                                <p className='text-[17px]'>8.00 AM - 8.00 PM</p>
                            </li>
                            <li>
                                <h6 className='uppercase text-lg'>Saturday - Sunday</h6>
                                <p className='text-[17px]'>2.00 PM - 8.00 PM</p>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className='text-2xl uppercase tracking-widest'>Newsletter</h4>
                        <p>Amet elitr vero magna sed ipsum sit kasd sea elitr lorem rebum</p>
                        <form action="" className='h-12 w-full mx-auto bg-white flex flex-row items-center text-black overflow-hidden'>
                            <input type="text" className='flex-1 lg:max-w-[180px] px-2 focus:ring-0 focus:outline-none' placeholder='Your Email' />
                            <button className='lg:flex-1 w-[100px] bg-secondary font-semibold h-full px-4'>Sign up</button>
                        </form>
                    </div>
                </div>
                <div className="relative z-10 text-white flex flex-col items-center justify-center py-5 border-t border-t-white/10 space-y-2">
                    <p >Copyright &copy; <a href="#domain" className='text-secondary font-semibold'>Domain</a>. All Rights Reserved.</p>
                    <p >Designed by <a href="https://htmlcodex.com" className='text-secondary font-semibold'>HTML</a> Distributed by <a href="https://themewagon.com" target="_blank" rel="noreferrer" className='text-secondary'>Noboman</a></p>
                </div>
            </div>
        </footer>
    )
}