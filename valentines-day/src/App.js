import React from "react";

import { TypeAnimation } from 'react-type-animation';
import { easings, useSpring, animated } from '@react-spring/web'

import './App.css';

const CURSOR_CLASS_NAME = 'custom-type-animation-cursor';

const App = () => {
  const [typeSpring, typeApi] = useSpring(() => ({
    opacity: "100%",
  }))
  const [buttonsSpring, buttonsApi] = useSpring(() => ({
    y: -1500,
    config: {
      duration: 1000,
      easing: easings.easeOutBounce,
    }
  }))
  const [noButtonSpring, noButtonApi] = useSpring(
    () => ({
      x: 0,
      rotateZ: 0
    })
  )
  const [imageSpring, imageApi] = useSpring(() => ({
    opacity: "0%"
  }))

  const handleYesButtonClick = () => {
    imageApi.start({
      to: [
        { opacity: "100%" }
      ]
    })
  }

  const handleNoButtonClick = () => {
    noButtonApi.start({
      to: [
        { x: 500, rotateZ: 360 },
        { x: 0, rotateZ: 0 },
      ],
    })
  }

  const handleTypeComplete = (() => {
    typeApi.start({
      to: [
        { opacity: "0%" }
      ]
    })
    buttonsApi.start({
      to: [
        { y: 0 }
      ]
    })
  })

  return (
    <div className="App">
      <div className="Layer">
        <animated.div style={{ ...imageSpring }}>
          <img src={process.env.PUBLIC_URL + "/us.jpeg"} alt="image" />
          <p>Happy Valentines Day!</p>
        </animated.div>
      </div>
      <div className="Layer">
        <animated.div style={{ margin: '0 15vw', alignSelf: 'center', ...typeSpring }}>
          <TypeAnimation
            sequence={[
              'Hey Amaya!',
              1000,
              'Will you be my valentine?',
              (el) => el.classList.remove(CURSOR_CLASS_NAME),
              1000,
              handleTypeComplete
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '5em' }}
            className={CURSOR_CLASS_NAME}
            cursor={false}
          />
        </animated.div>
      </div>
      <div className="Layer">
        <animated.div style={{ display: "flex", gap: "3em", height: "100vh", alignItems: "center", margin: 'auto', ...buttonsSpring }}>
          <a onClick={handleYesButtonClick} className="button">Yes</a>
          <animated.a onClick={handleNoButtonClick} style={{ ...noButtonSpring }} className="button">No</animated.a>
        </animated.div>
      </div>
    </div >
  );
}

export default App;
