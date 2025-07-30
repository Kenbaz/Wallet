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

// export const ScotiaBankRecentActivity = () => {
//   return (
//     <div className="border-gray-200 border w-full h-auto space-y-10 rounded-[20px] p-[4.5%] pb-[8%]">
//       <h1 className="font-semibold text-lg">Recent activity</h1>
//       <div className="flex justify-between mt-4">
//         <div className="flex items-center space-x-4">
//           <div className="aspect-square rounded-full overflow-hidden border w-[40px] h-[40px]">
//             <img
//               src="/images/508f2df98a445591ab9938aec7f85e2b0e16670a.png"
//               alt="image asset"
//               className="object-cover w-full"
//             />
//           </div>
//           <div className="flex flex-col">
//             <strong>Kathryn Murphy</strong>
//             <small className="text-[#9A9A9A] text-xs">
//               06 july 2025 <span>12:55pm</span>
//             </small>
//           </div>
//         </div>

//         <p className="font-semibold text-gray-900 text-base">$928.41</p>
//       </div>
//       <div className="flex justify-between mt-4">
//         <div className="flex items-center space-x-4">
//           <div className="aspect-square rounded-full overflow-hidden border w-[40px] h-[40px]">
//             <img
//               src="/images/5b50081a19db3be27cc21d562ade821948092922.png"
//               alt="image asset"
//               className="object-cover w-full"
//             />
//           </div>
//           <div className="flex flex-col">
//             <strong>Albert Flores</strong>
//             <small className="text-[#9A9A9A] text-xs">
//               05 july 2025 <span>18:45pm</span>
//             </small>
//           </div>
//         </div>

//         <p className="font-semibold text-gray-900 text-base">$767.50</p>
//       </div>

//       <div className="flex justify-between mt-4">
//         <div className="flex items-center space-x-4">
//           <div className="aspect-square rounded-full overflow-hidden border w-[40px] h-[40px]">
//             <img
//               src="/images/7f1fd31608688f2aebab7e88626f33e66740d315.png"
//               alt="image asset"
//               className="object-cover w-full"
//             />
//           </div>
//           <div className="flex flex-col">
//             <strong>Marvin Mckinney</strong>
//             <small className="text-[#9A9A9A] text-xs">
//               04 july 2025 <span>15:42pm</span>
//             </small>
//           </div>
//         </div>

//         <p className="font-semibold text-green-600 text-base">$169.43</p>
//       </div>

//       <div className="flex justify-between mt-4">
//         <div className="flex items-center space-x-4">
//           <div className="aspect-square rounded-full overflow-hidden border w-[40px] h-[40px]">
//             <img
//               src="/images/19943db378c6efabfd2b5c3213f326585fcbbc07.png"
//               alt="image asset"
//               className="object-cover w-full"
//             />
//           </div>
//           <div className="flex flex-col">
//             <strong>Eleanor Pena</strong>
//             <small className="text-[#9A9A9A] text-xs">
//               03 july 2025 <span>19:08pm</span>
//             </small>
//           </div>
//         </div>

//         <p className="font-semibold text-gray-900 text-base">$601.13</p>
//       </div>

//       <div className="flex justify-between mt-4">
//         <div className="flex items-center space-x-4">
//           <div className="aspect-square rounded-full overflow-hidden border w-[40px] h-[40px]">
//             <img
//               src="/images/ecc5cdf9233dc5f057d2135f456b983bd03e702d.png"
//               alt="image asset"
//               className="object-cover w-full"
//             />
//           </div>
//           <div className="flex flex-col">
//             <strong>Brooklyn Simmons</strong>
//             <small className="text-[#9A9A9A] text-xs">
//               02 july 2025 <span>16:55pm</span>
//             </small>
//           </div>
//         </div>

//         <p className="font-semibold text-gray-900 text-base">$275.43</p>
//       </div>

//       <div className="flex justify-between mt-4">
//         <div className="flex items-center space-x-4">
//           <div className="aspect-square rounded-full overflow-hidden border w-[40px] h-[40px]">
//             <img
//               src="/images/05025383c5a2f836067300d59075431a68157ca9.png"
//               alt="image asset"
//               className="object-cover w-full"
//             />
//           </div>
//           <div className="flex flex-col">
//             <strong>Darlene Robertson</strong>
//             <small className="text-[#9A9A9A] text-xs">
//               01 july 2025 <span>13:25pm</span>
//             </small>
//           </div>
//         </div>

//         <p className="font-semibold text-gray-900 text-base">$475.22</p>
//       </div>
//     </div>
//   );
// }
