import { PlusCircle, Landmark, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

interface ScotiaBankCardProps {
  onClick: () => void;
  isExpanded: boolean;
}

export default function ScotiaBankCard({
  onClick,
  isExpanded,
}: ScotiaBankCardProps) {
  return (
    <div className="flex flex-col gap-y-10">
      <motion.div
        className="w-full rounded-2xl gradient-custom text-[#FFFFFF] shadow-lg cursor-pointer select-none"
        onClick={onClick}
        whileHover={{ scale: isExpanded ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex flex-col p-4 sm:p-5 space-y-8 sm:space-y-6">
          <div className="flex justify-between items-start">
            <h3 className="text-lg sm:text-xl font-bold">ScotiaBank</h3>
            <div className="text-right">
              <p className="text-lg sm:text-xl font-bold">
                $5000.<sub className="text-sm">89</sub>
              </p>
              <small className="text-xs opacity-70">Balance</small>
            </div>
          </div>

          <div className="flex justify-start">
            <span className="flex items-center space-x-2 text-sm">
              <Landmark size={16} />
              <span>04-89-07</span>
              <span>20938742</span>
            </span>
          </div>

          <div className="flex justify-between items-center">
            <button
              className="flex items-center space-x-2 text-xs sm:text-sm hover:opacity-80 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <PlusCircle size={16} />
              <span>Add Money</span>
            </button>
            <button
              className="flex items-center space-x-2 text-xs sm:text-sm hover:opacity-80 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <CreditCard size={16} />
              <span>Card</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
