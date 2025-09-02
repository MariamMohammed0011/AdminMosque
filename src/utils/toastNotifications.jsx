import { toast } from "sonner";
import { IoCloseOutline } from "react-icons/io5";
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
      className={`absolute top-0 right-0 ${colorClass} hover:${colorClass.replace("-700", "-900")} transition`}
    >
      <IoCloseOutline
        size={24}
        className={isSpinning ? "animate-spin" : ""}
      />
    </button>
  );
};

export const notifySuccess = (message = "تمت العملية بنجاح!") => {
  toast.custom((t) => (
    <div className="relative w-[300px] p-4 bg-green-100 border border-green-400 rounded shadow text-green-900">
      <div className="text-sm font-medium py-1">{message}</div>
      <div className="absolute bottom-0 left-0 h-1 bg-green-500 animate-toast-bar" />
      <CloseButton toastInstance={t} colorClass="text-green-700" />
    </div>
  ));
};

export const notifyError = (message = "حدث خطأ!") => {
  toast.custom((t) => (
    <div className="relative w-[300px] p-4 bg-red-100 border border-red-400 rounded shadow text-red-900">
      <div className="text-sm font-medium py-1">{message}</div>
      <div className="absolute bottom-0 left-0 h-1 bg-red-500 animate-toast-bar" />
      <CloseButton toastInstance={t} colorClass="text-red-700" />
    </div>
  ));
};

export const notifyInfo = (message = "معلومة!") => {
  toast.custom((t) => (
    <div className="relative w-[300px] p-4 bg-blue-100 border border-blue-400 rounded shadow text-blue-900">
      <div className="text-sm font-medium py-1">{message}</div>
      <div className="absolute bottom-0 left-0 h-1 bg-blue-500 animate-toast-bar" />
      <CloseButton toastInstance={t} colorClass="text-blue-700" />
    </div>
  ));
};
