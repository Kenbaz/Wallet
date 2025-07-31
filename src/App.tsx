{/* eslint-disable @typescript-eslint/no-explicit-any */}

import "./App.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, MoreHorizontal } from "lucide-react";
import ScotiaBankCard from "./ScotiaBankCard";
import WiseCard from "./WiseCard";
import { ScotiaBankRecentActivity } from "./ScotiaBankRecentActivity";
import { WiseCardRecentActivity } from "./WiseCardRecentActivity";

function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [cardOrder, setCardOrder] = useState<"scotia-top" | "wise-top">(
    "scotia-top"
  );
  const [isDragging, setIsDragging] = useState<string | null>(null);

  // Auto-show details after cards expand
  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => {
        setShowDetails(true);
      }, 100); // Wait for expansion animation to complete
      return () => clearTimeout(timer);
    } else {
      setShowDetails(false);
    }
  }, [isExpanded]);

  const handleCardClick = () => {
    if (!isDragging) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleDragStart = (cardId: string) => {
    setIsDragging(cardId);
  };

  const handleDragEnd = (cardId: string, info: any) => {
    setIsDragging(null);

    // Check if dragged upward far enough to trigger reorder (30px threshold)
    const dragDistance = info.offset.y;

    // Only reorder if dragged UPWARD (negative Y) beyond threshold
    if (dragDistance < -30) {
      // If dragging the bottom card up, reorder
      if (
        (cardId === "wise" && cardOrder === "scotia-top") ||
        (cardId === "scotia" && cardOrder === "wise-top")
      ) {
        setCardOrder(cardOrder === "scotia-top" ? "wise-top" : "scotia-top");
      }
    }
  };

  // Calculate positions and widths based on card order
  const getCardPositions = () => {
    if (cardOrder === "scotia-top") {
      return {
        scotia: {
          collapsed: { x: 8, y: "15%", z: 3, width: "calc(100% - 1rem)" },
          expanded: { x: 0, y: "-60%", width: "85vw" },
        },
        wise: {
          collapsed: { x: 16, y: "-10%", z: 2, width: "calc(100% - 2rem)" },
          expanded: { x: "calc(80vw + 2.3rem)", y: "-60%", width: "85vw" },
        },
      };
    } else {
      return {
        scotia: {
          collapsed: { x: 16, y: "-10%", z: 2, width: "calc(100% - 2rem)" },
          expanded: { x: "calc(80vw + 2.3rem)", y: "-60%", width: "85vw" },
        },
        wise: {
          collapsed: { x: 8, y: "15%", z: 3, width: "calc(100% - 1rem)" },
          expanded: { x: 0, y: "-60%", width: "85vw" },
        },
      };
    }
  };

  const positions = getCardPositions();

  return (
    <div className="flex flex-col relative items-center min-h-screen px-0 py-8 overflow-hidden">
      <div className="flex items-center justify-between w-full mb-[20%]">
        <h1 className="font-semibold text-3xl">Wallet</h1>
        <div className="flex items-center space-x-2">
          <span className="bg-[#F5F5F5] rounded-full p-[10px]">
            <Plus />
          </span>
          <span className="bg-[#F5F5F5] rounded-full p-[10px]">
            <MoreHorizontal />
          </span>
        </div>
      </div>
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
          className="absolute bg-transparent"
          style={{
            zIndex: isExpanded
              ? positions.scotia.collapsed.z
              : positions.scotia.collapsed.z,
          }}
          animate={
            isExpanded
              ? {
                  x: positions.scotia.expanded.x,
                  y: positions.scotia.expanded.y,
                  width: positions.scotia.expanded.width,
                }
              : {
                  x: positions.scotia.collapsed.x,
                  y: positions.scotia.collapsed.y,
                  width: positions.scotia.collapsed.width,
                }
          }
          drag={!isExpanded ? "y" : false}
          dragConstraints={{ top: -30, bottom: 5 }}
          dragElastic={0.2}
          onDragStart={() => handleDragStart("scotia")}
          onDragEnd={(_, info) => handleDragEnd("scotia", info)}
          whileDrag={{
            scale: 1.05,
            rotate: isDragging === "scotia" ? 2 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            width: { duration: 0.1 },
          }}
        >
          <div className="relative bg-transparent">
            {/* Drag indicator for ScotiaBank card */}
            {!isExpanded && isDragging === "scotia" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10"
              >
                {/* <div className="w-8 h-1 bg-white/60 rounded-full"></div> */}
              </motion.div>
            )}
            <ScotiaBankCard onClick={handleCardClick} isExpanded={isExpanded} />
          </div>
        </motion.div>

        {/* Wise Card */}
        <motion.div
          className="absolute bg-transparent"
          style={{
            zIndex: isExpanded
              ? positions.wise.collapsed.z
              : positions.wise.collapsed.z,
          }}
          animate={
            isExpanded
              ? {
                  x: positions.wise.expanded.x,
                  y: positions.wise.expanded.y,
                  width: positions.wise.expanded.width,
                }
              : {
                  x: positions.wise.collapsed.x,
                  y: positions.wise.collapsed.y,
                  width: positions.wise.collapsed.width,
                }
          }
          drag={!isExpanded ? "y" : false}
          dragConstraints={{ top: -30, bottom: 5 }}
          dragElastic={0.2}
          onDragStart={() => handleDragStart("wise")}
          onDragEnd={(_, info) => handleDragEnd("wise", info)}
          whileDrag={{
            scale: 1.05,
            rotate: isDragging === "wise" ? -2 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            width: { duration: 0.1 },
          }}
        >
          <div className="relative bg-transparent">
            {/* Drag indicator for Wise card */}
            {!isExpanded && isDragging === "wise" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10"
              >
                {/* <div className="w-8 h-1 bg-black/60 rounded-full"></div> */}
              </motion.div>
            )}
            <WiseCard onClick={handleCardClick} isExpanded={isExpanded} />
          </div>
        </motion.div>

        {/* Wallet Background */}
        <motion.div
          className="absolute top-0 left-0 w-full aspect-[4/3] rounded-xl overflow-hidden z-[1]"
          animate={{
            y: showDetails ? 700 : isExpanded ? 200 : 0,
            scale: showDetails ? 0.6 : isExpanded ? 0.9 : 1,
            opacity: showDetails ? 0 : 1,
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
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Wallet Frame - separate element with higher z-index */}
        <motion.div
          className="absolute top-0 left-0 w-full aspect-[4/3] z-[10] pointer-events-none"
          animate={{
            y: showDetails ? 700 : isExpanded ? 200 : 0,
            scale: showDetails ? 0.6 : isExpanded ? 0.9 : 1,
            opacity: showDetails ? 0 : 1,
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
            className="absolute bottom-0 left-0 w-full h-auto"
          />
        </motion.div>
      </div>

      {/* Recent Activity Section - Summary (only show when not in details) */}
      {!showDetails && (
        <motion.div
          className="w-full max-w-sm"
          animate={{
            y: isExpanded ? 200 : 0,
            opacity: showDetails ? 0 : 1,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: isExpanded ? 0 : 0.1,
          }}
        >
          <div className="mt-[90%] border rounded-[10px] border-gray-300 flex items-center justify-between w-full p-4">
            <strong>Recent activity</strong>
            <strong className="p-2 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
              5
            </strong>
          </div>
        </motion.div>
      )}

      {/* Detailed Recent Activity Components */}
      {showDetails && (
        <motion.div
          className="w-full max-w-sm mt-[50%]"
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: '-15%', opacity: 1 }}
          exit={{ y: 300, opacity: 0 }}
          transition={{
            duration: 0.2,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.2,
          }}
        >
          {cardOrder === "scotia-top" ? (
            <ScotiaBankRecentActivity />
          ) : (
            <WiseCardRecentActivity />
          )}
        </motion.div>
      )}
    </div>
  );
}

export default App;
