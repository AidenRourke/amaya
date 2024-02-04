import React, { useState } from "react";

import { TypeAnimation } from 'react-type-animation';
import { easings, useSpring, animated } from '@react-spring/web'

import './App.css';

const CURSOR_CLASS_NAME = 'custom-type-animation-cursor';

function App () {
  const [sheSaidYes, setSheSaidYes] = useState(false);

  const [typeStyles, typeApi] = useSpring(() => ({
    opacity: "100%",
  }))
  const [buttonsStyles, buttonsApi] = useSpring(() => ({
    marginTop: -1500,
    config: {
      duration: 1000,
      easing: easings.easeOutBounce,
    }
  }))
  const [noButtonStyles, noButtonApi] = useSpring(
    () => ({
      x: 0,
      rotateZ: 0
    })
  )

  const handleYesButtonClick = () => {
    setSheSaidYes(true);
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
        { marginTop: 0 }
      ]
    })
  })

  return (
    <div className="App">
      {sheSaidYes && (
        <>
          <div className="Layer">
            <img src={process.env.PUBLIC_URL + "/us.jpeg"} alt="image" />
          </div>
          <div className="Layer">
            <h1>Happy Valentines Day!</h1>
          </div>
        </>
      )}
      <div className="Layer">
        <animated.div style={{ margin: '0 20em', alignSelf: 'center', ...typeStyles }}>
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
            style={{ fontSize: '5em', fontWeight: 'bold' }}
            className={CURSOR_CLASS_NAME}
            cursor={false}
          />
        </animated.div>
      </div>
      {!sheSaidYes && (
        <div className="Layer">
          <animated.div style={{ display: "flex", gap: "3em", height: "100vh", alignItems: "center", margin: 'auto', ...buttonsStyles }}>
            <a onClick={handleYesButtonClick} className="button">Yes</a>
            <animated.a onClick={handleNoButtonClick} style={{ ...noButtonStyles }} className="button">No</animated.a>
          </animated.div>
        </div>
      )}
    </div >
  );
}

export default App;
