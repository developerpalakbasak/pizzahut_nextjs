import Image from "next/image";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { ImBin } from "react-icons/im";

const AdminEditProductsItem = ({ item, deletePizza }) => {
  const [showPopup, setShowPopup] = useState(false);
  // const popupRef = useRef(null);
  const handleDelete = () => {
    setShowPopup((prev) => !prev);
  };

  const confirmDelete = () => {
    deletePizza(item._id);
    setShowPopup(false);
  };

  return (
    <>
      {/* Main product row */}
      
        <div className="relative z-0 flex gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <Image src={item.image} height={60} width={60} alt={item.title} />
            <p className="font-semibold">{item.title}</p>
            <p className=""> BDT: {item.price}</p>
          </div>
          <div className="flex gap-12">
            {/* <span><FaRegEdit size={28} /></span> */}
            <span onClick={handleDelete} className="cursor-pointer">
              <ImBin color="red" size={28} />
            </span>
          </div>
        </div>
      

      {/* Custom Popup - moved outside main row */}
      {showPopup && (
        <div className="bg-white px-3 py-2 rounded-lg shadow-lg flex items-center justify-between">
          <p className="text-[1rem] font-semibold">Confirm delete</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setShowPopup(false)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminEditProductsItem;
