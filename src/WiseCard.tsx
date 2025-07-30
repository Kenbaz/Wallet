import { PlusCircle, Landmark, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

interface WiseCardProps {
  onClick: () => void;
  isExpanded: boolean;
}

export default function WiseCard({ onClick, isExpanded }: WiseCardProps) {
  return (
    <div className="flex flex-col gap-y-10">
      <motion.div
        className="w-full rounded-2xl gradient-green text-[#010101] shadow-lg cursor-pointer select-none"
        onClick={onClick}
        whileHover={{ scale: isExpanded ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex flex-col p-4 sm:p-5 space-y-8 sm:space-y-6">
          <div className="flex justify-between items-start">
            <h3 className="text-lg sm:text-xl font-bold">Wise</h3>
            <div className="text-right">
              <p className="text-lg sm:text-xl font-bold">
                $3768.<sub className="text-sm">70</sub>
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

// export const WiseCardRecentActivity = () => {
//   return (
//     <div className="border-gray-200 border w-full h-auto space-y-10 rounded-[20px] p-[4.5%] pb-[8%]">
//       <h1 className="font-semibold text-lg">Recent activity</h1>
//       <div className="flex justify-between mt-4">
//         <div className="flex items-center space-x-4">
//           <div className="aspect-square rounded-full overflow-hidden w-[40px] h-[40px]">
//             <img
//               src="/images/e0aba6805eb5822e4b74ea23aef84a4191dd6e9b.png"
//               alt="image asset"
//               className="object-cover w-full"
//             />
//           </div>
//           <div className="flex flex-col">
//             <strong>Gillette</strong>
//             <small className="text-[#9A9A9A] text-xs">
//               06 july 2025 <span>12:55pm</span>
//             </small>
//           </div>
//         </div>

//         <p className="font-semibold text-gray-900 text-base">$473.85</p>
//       </div>
//       <div className="flex justify-between mt-4">
//         <div className="flex items-center space-x-4">
//           <div className="aspect-square rounded-full overflow-hidden w-[40px] h-[40px]">
//             <img
//               src="/images/5002e74dd1138967d63b737438f8513d7ba0057a.png"
//               alt="image asset"
//               className="object-cover w-full"
//             />
//           </div>
//           <div className="flex flex-col">
//             <strong>Louis Vuitton</strong>
//             <small className="text-[#9A9A9A] text-xs">
//               05 july 2025 <span>18:45pm</span>
//             </small>
//           </div>
//         </div>

//         <p className="font-semibold text-gray-900 text-base">$779.58</p>
//       </div>

//       <div className="flex justify-between mt-4">
//         <div className="flex items-center space-x-4">
//           <div className="aspect-square rounded-full overflow-hidden w-[40px] h-[40px]">
//             <img
//               src="/images/c9efbd1a5bd3075f1747e40b451bd8d53f1d242f.png"
//               alt="image asset"
//               className="object-cover w-full"
//             />
//           </div>
//           <div className="flex flex-col">
//             <strong>Johnson & Johnson</strong>
//             <small className="text-[#9A9A9A] text-xs">
//               04 july 2025 <span>15:42pm</span>
//             </small>
//           </div>
//         </div>

//         <p className="font-semibold text-green-600 text-base">$601.13</p>
//       </div>

//       <div className="flex justify-between mt-4">
//         <div className="flex items-center space-x-4">
//           <div className="aspect-square rounded-full overflow-hidden w-[40px] h-[40px]">
//             <img
//               src="/images/4c63e7fa9c09f20b21481860bdfd0d50d03c7a29.png"
//               alt="image asset"
//               className="object-cover w-full"
//             />
//           </div>
//           <div className="flex flex-col">
//             <strong>eBay</strong>
//             <small className="text-[#9A9A9A] text-xs">
//               03 july 2025 <span>19:08pm</span>
//             </small>
//           </div>
//         </div>

//         <p className="font-semibold text-gray-900 text-base">$105.55</p>
//       </div>

//       <div className="flex justify-between mt-4">
//         <div className="flex items-center space-x-4">
//           <div className="aspect-square rounded-full overflow-hidden w-[40px] h-[40px]">
//             <img
//               src="/images/53e448e3d2136bb1ab30937b7167fac5e4049cf3.png"
//               alt="image asset"
//               className="object-cover w-full"
//             />
//           </div>
//           <div className="flex flex-col">
//             <strong>Theresa Webb</strong>
//             <small className="text-[#9A9A9A] text-xs">
//               02 july 2025 <span>16:55pm</span>
//             </small>
//           </div>
//         </div>

//         <p className="font-semibold text-gray-900 text-base">$490.91</p>
//       </div>

//       <div className="flex justify-between mt-4">
//         <div className="flex items-center space-x-4">
//           <div className="aspect-square rounded-full overflow-hidden w-[40px] h-[40px]">
//             <img
//               src="/images/a53e258b92b4dddbe723d6c25948b94a6736396d.png"
//               alt="image asset"
//               className="object-cover w-full"
//             />
//           </div>
//           <div className="flex flex-col">
//             <strong>Gillette</strong>
//             <small className="text-[#9A9A9A] text-xs">
//               01 july 2025 <span>13:25pm</span>
//             </small>
//           </div>
//         </div>

//         <p className="font-semibold text-gray-900 text-base">$106.58</p>
//       </div>
//     </div>
//   );
// };
