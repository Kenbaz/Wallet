{
  /* eslint-disable @typescript-eslint/no-explicit-any */
}

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
  const [expandedCardInView, setExpandedCardInView] = useState<
    "scotia" | "wise"
  >("scotia");
  const [swipeOffset, setSwipeOffset] = useState(0);

  // Auto-show details after cards expand
  useEffect(() => {
    if (isExpanded) {
      // Set initial card in view based on which card is on top (higher z-index)
      setExpandedCardInView(cardOrder === "scotia-top" ? "scotia" : "wise");
      const timer = setTimeout(() => {
        setShowDetails(true);
      }, 100); // Wait for expansion animation to complete
      return () => clearTimeout(timer);
    } else {
      setShowDetails(false);
      setSwipeOffset(0); // Reset swipe offset when collapsing
    }
  }, [isExpanded, cardOrder]);

  const handleCardClick = () => {
    if (!isDragging && Math.abs(swipeOffset) < 10) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleDragStart = (cardId: string) => {
    setIsDragging(cardId);
  };

  const handleDragEnd = (cardId: string, info: any) => {
    setIsDragging(null);

    // Only handle vertical drag reordering when collapsed
    if (!isExpanded) {
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
    }
  };

  const handleSwipeDrag = (info: any) => {
    if (isExpanded) {
      const dragX = info.offset.x;
      // Convert drag distance to viewport units for smooth movement
      // Limit the drag to prevent over-scrolling beyond the cards
      const maxDrag = window.innerWidth; // Max drag distance
      const limitedOffset = Math.max(-maxDrag, Math.min(maxDrag, dragX));
      setSwipeOffset(limitedOffset);
    }
  };

  const handleSwipeDragEnd = (info: any) => {
    if (isExpanded) {
      const dragX = info.offset.x;
      const velocity = info.velocity.x;

      // Threshold for switching cards (50px drag or sufficient velocity)
      const shouldSwitch = Math.abs(dragX) > 50 || Math.abs(velocity) > 500;

      if (shouldSwitch) {
        // Determine swipe direction and switch cards
        let newCardInView = expandedCardInView;

        if (dragX > 0 && expandedCardInView === "wise") {
          // Swiping right, show scotia
          newCardInView = "scotia";
        } else if (dragX < 0 && expandedCardInView === "scotia") {
          // Swiping left, show wise
          newCardInView = "wise";
        }

        // Only animate if we're actually switching cards
        if (newCardInView !== expandedCardInView) {
          // Switch cards and reset offset immediately for smooth animation
          setExpandedCardInView(newCardInView);
        }
      } else if (Math.abs(dragX) < 10 && Math.abs(velocity) < 100) {
        // This was likely a tap, not a swipe - collapse the cards
        setIsExpanded(false);
      }

      // Always reset swipe offset immediately for smooth animation
      setSwipeOffset(0);
    }
  };

  // Calculate positions and widths based on card order and expanded card in view
  const getCardPositions = () => {
    // Simple logic: cards are always 90vw apart
    // When Scotia is in view: Scotia=0, Wise=90vw
    // When Wise is in view: Scotia=-90vw, Wise=0

    // const cardSpacing = 90; // Distance between cards in vw
    let scotiaX = 0;
    let wiseX = 89;

    if (isExpanded) {
      if (expandedCardInView === "wise") {
        // Shift both cards left so Wise is in view
        scotiaX = -81.5;
        wiseX = 7;
      }
      // If expandedCardInView === "scotia", keep default positions
    }

    // Same positioning logic regardless of card order
    return {
      scotia: {
        collapsed:
          cardOrder === "scotia-top"
            ? { x: 8, y: "15%", z: 3, width: "calc(100% - 1rem)" }
            : { x: 16, y: "-10%", z: 2, width: "calc(100% - 2rem)" },
        expanded: { x: `${scotiaX}vw`, y: "-60%", width: "85vw" },
      },
      wise: {
        collapsed:
          cardOrder === "scotia-top"
            ? { x: 16, y: "-10%", z: 2, width: "calc(100% - 2rem)" }
            : { x: 8, y: "15%", z: 3, width: "calc(100% - 1rem)" },
        expanded: { x: `${wiseX}vw`, y: "-60%", width: "85vw" },
      },
    };
  };

  const positions = getCardPositions();

  return (
    <div className="flex flex-col relative items-center min-h-screen px-0 py-8 overflow-hidden md:hidden">
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
          className="fixed top-0 left-0 w-full h-full z-5 pointer-events-auto"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDrag={(_, info) => handleSwipeDrag(info)}
          onDragEnd={(_, info) => handleSwipeDragEnd(info)}
          style={{ cursor: "grab" }}
          whileDrag={{ cursor: "grabbing" }}
        >
          {/* Invisible swipe area */}
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
                  x: `calc(${positions.scotia.expanded.x} + ${swipeOffset}px)`,
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
          dragConstraints={!isExpanded ? { top: -30, bottom: 5 } : undefined}
          dragElastic={!isExpanded ? 0.2 : 0}
          onDragStart={() => !isExpanded && handleDragStart("scotia")}
          onDragEnd={(_, info) => !isExpanded && handleDragEnd("scotia", info)}
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
            <ScotiaBankCard
              onClick={isExpanded ? () => {} : handleCardClick}
              isExpanded={isExpanded}
            />
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
                  x: `calc(${positions.wise.expanded.x} + ${swipeOffset}px)`,
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
          dragConstraints={!isExpanded ? { top: -30, bottom: 5 } : undefined}
          dragElastic={!isExpanded ? 0.2 : 0}
          onDragStart={() => !isExpanded && handleDragStart("wise")}
          onDragEnd={(_, info) => !isExpanded && handleDragEnd("wise", info)}
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
            <WiseCard
              onClick={isExpanded ? () => {} : handleCardClick}
              isExpanded={isExpanded}
            />
          </div>
        </motion.div>

        {/* Wallet Background */}
        <motion.div
          className="absolute top-0 left-0 w-full z-[1]"
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
          {/* Wallet Background Image */}
          <div className="w-full aspect-[4/3] rounded-xl overflow-hidden">
            <img
              src="/images/Rectangle 3.png"
              alt="wallet background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Recent Activity Section - positioned below wallet */}
          {!showDetails && (
            <div className="w-full mt-[40px] px-0">
              <div className="border rounded-[10px] border-gray-300 flex items-center justify-between w-full p-4 bg-white">
                <strong>Recent activity</strong>
                <strong className="p-2 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
                  5
                </strong>
              </div>
            </div>
          )}
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
      {/* {!showDetails && (
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
      )} */}

      {/* Detailed Recent Activity Components */}
      {showDetails && (
        <div className="w-full max-w-sm mt-[30%] relative">
          {/* Scotia Activity */}
          <motion.div
            className="absolute inset-0"
            initial={{ y: 300, opacity: 0 }}
            animate={{
              y: "-15%",
              opacity: expandedCardInView === "scotia" ? 1 : 0,
              pointerEvents: expandedCardInView === "scotia" ? "auto" : "none",
            }}
            transition={{
              y: { duration: 0.2, ease: [0.16, 1, 0.3, 1], delay: 0 },
              opacity: { duration: 0.3, ease: "easeInOut" },
            }}
          >
            <ScotiaBankRecentActivity />
          </motion.div>

          {/* Wise Activity */}
          <motion.div
            className="absolute inset-0"
            initial={{ y: 300, opacity: 0 }}
            animate={{
              y: "-15%",
              opacity: expandedCardInView === "wise" ? 1 : 0,
              pointerEvents: expandedCardInView === "wise" ? "auto" : "none",
            }}
            transition={{
              y: { duration: 0.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
              opacity: { duration: 0.3, ease: "easeInOut" },
            }}
          >
            <WiseCardRecentActivity />
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default App;
