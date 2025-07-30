import "./App.css";
import { useState } from "react";
import { motion } from "framer-motion";
import ScotiaBankCard from "./ScotiaBankCard";
import WiseCard from "./WiseCard";

function App() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col border relative items-center min-h-screen px-4 py-8 overflow-hidden">
      {/* Horizontal scroll container for expanded state */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full pointer-events-none z-20"
        >
          <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 pointer-events-auto">
            <div className="flex space-x-4 px-4 overflow-x-auto scrollbar-hide">
              <div className="min-w-[80vw] flex-shrink-0 opacity-0"></div>
              <div className="min-w-[80vw] flex-shrink-0 opacity-0"></div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="relative w-full max-w-sm mt-16 sm:mt-20">
        {/* ScotiaBank Card */}
        <motion.div
          className="absolute w-[calc(100%-1rem)]"
          style={{ zIndex: isExpanded ? 5 : 3 }}
          animate={
            isExpanded
              ? {
                  x: 0,
                  y: -20,
                  width: "80vw",
                }
              : {
                  x: 8,
                  y: "15%",
                  width: "calc(100% - 1rem)",
                }
          }
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            width: { duration: 0.6 },
          }}
        >
          <ScotiaBankCard onClick={handleCardClick} isExpanded={isExpanded} />
        </motion.div>

        {/* Wise Card */}
        <motion.div
          className="absolute w-[calc(100%-2rem)]"
          style={{ zIndex: isExpanded ? 4 : 2 }}
          animate={
            isExpanded
              ? {
                  x: "calc(80vw + 1rem)",
                  y: -20,
                  width: "80vw",
                }
              : {
                  x: 16,
                  y: "-10%",
                  width: "calc(100% - 2rem)",
                }
          }
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            width: { duration: 0.6 },
          }}
        >
          <WiseCard onClick={handleCardClick} isExpanded={isExpanded} />
        </motion.div>

        {/* Wallet Background */}
        <motion.div
          className="absolute top-0 left-0 w-full aspect-[4/3] rounded-xl overflow-hidden z-[1]"
          animate={{
            y: isExpanded ? '100%' : 0,
            scale: isExpanded ? 0.9 : 1,
            opacity: isExpanded ? 1 : 1,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: isExpanded ? 0 : 0.1,
          }}
        >
          <img
            src="/images/Rectangle 3.png"
            alt="wallet background"
            className="w-full h-full"
          />
        </motion.div>

        {/* Wallet Frame (always on top) */}
        <motion.div
          className={`absolute ${isExpanded ? "top-[10vh]" : "top-[11vh]"} aspect-[4/3] left-0 w-full z-[10] pointer-events-none`}
          animate={{
            y: isExpanded ? '100%' : 0,
            scale: isExpanded ? 0.9 : 1,
            opacity: isExpanded ? 1 : 1,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: isExpanded ? 0 : 0.1,
          }}
        >
          <img
            src="/images/Frame.png"
            alt="wallet frame"
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default App;
