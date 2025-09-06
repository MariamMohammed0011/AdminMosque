import { toast } from "sonner";
import { IoCloseOutline } from "react-icons/io5";
import { SiSimplelogin } from "react-icons/si";
import { useState } from "react";

const CloseButton = ({ toastInstance, colorClass }) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = () => {
    setIsSpinning(true);
    setTimeout(() => {
      toast.dismiss(toastInstance);
    }, 300);
  };

  return (
    <button
      onClick={handleClick}
      className={`absolute top-0 right-0 ${colorClass} hover:${colorClass.replace(
        "-700",
        "-900"
      )} transition`}
    >
      <IoCloseOutline size={24} className={isSpinning ? "animate-spin" : ""} />
    </button>
  );
};

export const notifySuccessWithIcon = (message = "تمت العملية بنجاح!") => {
  toast.custom((t) => (
    <div className="relative w-[300px] p-4 bg-green-100 border border-green-400 rounded shadow text-green-900 flex items-center gap-2">
      <SiSimplelogin size={20} className="text-green-600 flex-shrink-0" />
      <div className="text-sm font-medium py-1">{message}</div>
      <div className="absolute bottom-0 left-0 h-1 bg-green-500 animate-toast-bar" />
      <CloseButton toastInstance={t} colorClass="text-green-700" />
    </div>
  ));
};
