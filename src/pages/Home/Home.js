import React, { useState, useRef } from 'react'
import Header from '../../components/layout/Header'
import Hero from './Hero'
import About from './About'
import Services from './Services'
import Discover from './Discover'
import Footer from '../../components/layout/Footer'

const Home = () => {

    const [click, setClick] = useState('')


    return (
        <div className='Home'>
            <Header click={click} setClick={setClick} cart={[]} />
            <Hero click={click} setClick={setClick} />
            <About click={click} setClick={setClick} />
            <Services click={click} setClick={setClick} />
            <Discover click={click} setClick={setClick} />
            <Footer click={click} setClick={setClick} />
        </div>
    )
}

export default Home