import {  useContext, useEffect, useState } from 'react';
import Signin from './Signin'
import Signup from './Signup';
import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import {  useNavigate } from 'react-router-dom';
import {Cart} from '../Context/context'

const Home=()=>{

    const {dispatch}=useContext(Cart);

    const navigate=useNavigate();
    const [toggle,setToggle]=useState(0);
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    useEffect(()=>{
        if(localStorage.getItem('auth')){
            navigate('/home');
        }else{
            dispatch({type:'EmptyCart'})
        }   
    },[])

    return (
        <>
        <Particles className='particle'
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "white",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 6,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }}
        >
            </Particles>
            <div className="flex home">
                <div className='topHome flex'>
                    <button onClick={()=>setToggle(0)}>SignIn</button>
                    <button onClick={()=>setToggle(1)}>SignUp</button>
                </div>
                {toggle?<Signup></Signup>:<Signin></Signin>}
            </div>
        </>
    )
}

export default Home;