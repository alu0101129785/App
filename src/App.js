import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./index.css"; // Asegúrate de que este archivo CSS exista

export default function App() {
  const [showGreeting, setShowGreeting] = useState(false);
  const [pressCount, setPressCount] = useState(0);
  const [buttonPosition, setButtonPosition] = useState({ top: 100});

  // Obtener el tamaño de la pantalla
  const { innerWidth: width, innerHeight: height } = window;

  const handleButtonPress = () => {
    if (pressCount < 26) {
      const buttonWidth = 250;
      const buttonHeight = 60;

      setButtonPosition({
        top: Math.random() * (height - buttonHeight),
      });

      setPressCount(pressCount + 1);
    } else {
      setShowGreeting(true);
    }
  };

  const goBack = () => {
    setShowGreeting(false);
    setPressCount(0);
  };

  const counterColor = `rgb(${Math.min(255, pressCount * 10)}, 0, 0)`;

  const getButtonText = () => {
    if (pressCount >= 18) {
      return "Ya casi me has quitado todo el envoltorio 😏";
    } else if (pressCount >= 9) {
      return "Parece que me quieres abrir... ​🤭​";
    } else {
      return "Tienes un paquete 📦";
    }
  };

  return (
    <div className="container">
      {/* Botón que cambia de posición */}
      {!showGreeting && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", duration: 0.7 }}
          style={{ position: "absolute", top: buttonPosition.top
           }}
        >
          <button onClick={handleButtonPress} className="buttonTouchable">
            <span className="buttonText">{getButtonText()}</span>
          </button>
        </motion.div>
      )}

      {/* Contador de clics */}
      {!showGreeting && (
        <span className="counterText" style={{ color: counterColor }}>
          {pressCount}
        </span>
      )}

      <AnimatePresence>
        {/* Animación de saludo */}
        {showGreeting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="card"
          >
            {/* Imagen de la carpeta public */}
            <img src={`${process.env.PUBLIC_URL}/mar.jpg`} alt="Imagen de cumpleaños" className="image" />
            <span className="text">Para la cachorrita con la sonrisa más bonita del mundo.</span>
            <span className="text2">Feliz Cumpleaños</span>
            <span className="text2">Marsssiiitaaaaa 🎂👩‍✈️☁️</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón para volver a la pantalla inicial */}
      {showGreeting && (
        <button onClick={goBack} className="backButton">
          <span className="backButtonText">Volver</span>
        </button>
      )}
    </div>
  );
}
