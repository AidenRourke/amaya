import React from "react";

import { TypeAnimation } from 'react-type-animation';
import { easings, useSpring, animated } from '@react-spring/web'

import './App.css';

const CURSOR_CLASS_NAME = 'custom-type-animation-cursor';

function App () {
  const [typeStyles, typeApi] = useSpring(() => ({
    opacity: "100%",
  }))
  const [buttonStyles, buttonsApi] = useSpring(() => ({
    y: -1000,
    config: {
      duration: 1000,
      easing: easings.easeOutBounce,
    }
  }))

  const handleTypeComplete = (() => {
    typeApi.start({
      to: [
        { opacity: "0%" }
      ]
    })
    buttonsApi.start({
      to: [
        { y: 0 },
      ]
    })
  })

  return (
    <div className="App">
      <div className="Layer">
        <animated.div style={{ alignSelf: 'center', ...typeStyles }}>
          <TypeAnimation
            sequence={[
              'Hey Amaya!',
              1000,
              'Will you be my Driver?',
              500,
              'Will you be my Sous Chef?',
              500,
              'Will you be my Friend?',
              500,
              'Will you be my Roommate?',
              500,
              'Will you be my Partner?',
              1000,
              'Will you be my Valentine?',
              (el) => el.classList.remove(CURSOR_CLASS_NAME),
              500,
              handleTypeComplete
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '4em', fontWeight: 'bold' }}
            className={CURSOR_CLASS_NAME}
            cursor={false}
          />
        </animated.div>
      </div>
      <div className="Layer">
        <animated.div style={{ display: "flex", gap: "3em", margin: 'auto', ...buttonStyles }}>
          <a className="button">Yes</a>
          <a className="button">No</a>
        </animated.div>
      </div>
    </div >
  );
}

export default App;
