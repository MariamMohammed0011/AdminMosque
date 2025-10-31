import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  notifySuccess,
  notifyError,
  notifyInfo,
} from "../utils/toastNotifications.jsx";
export default function CreateTeacher() {
  const mosqueId = localStorage.getItem("mosque_id");
  const [formData, setFormData] = useState({
    // email: "",
    // password: "",
    first_name: "",
    last_name: "",
    mosque_id: mosqueId,
    birth_date: "",
    is_save_quran: true,
    phone: "",
    // father_phone: "",
    address: "",
    certificates: "",
    experiences: "",
    memorized_parts: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("/api/auth/register/teacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
         notifySuccess("تم إنشاء المعلم بنجاح!");
         console.log("📌 بيانات الطالب المرسلة:", formData);
      console.log("📌 استجابة السيرفر:", result);
       
      } else {
        console.error(result);
         notifyError(" فشل في الإرسال:");
      
      }
    } catch (error) {
      console.error(error);
       notifyError(" حدث خطأ في الاتصال بالخادم");
     
    }
  };

  const حلقات = [
    "حلقة عم",
    "حلقة تبارك",
    "حلقة قد سمع",
    "حلقة سير",
    "حلقة الاجازات",
    "حلقة تجويد",
    "حلقة فقه",
    "حلقة آداب",
    "ggg",
    "wwwwwwww",
    "lllllll",
  ];

  return (
    <div className="min-h-screen bg-[#FBFAF8] flex items-start justify-center font-[Zain] p-4">
  <div className="relative w-full max-w-[1200px] bg-[#FBFAF8] rounded-[20px] shadow-lg px-4 sm:px-6 py-4">
<div
  className="w-10 h-10 bg-white rounded-lg flex justify-center items-center absolute top-4 left-4 shadow-md cursor-pointer sm:top-4 sm:left-4"
  onClick={() => navigate("/dashboard")}
>
  <img src="/arrow.png" alt="رجوع" className="w-5" />
</div>


     <div className="flex flex-col lg:flex-row justify-end items-stretch gap-4 lg:gap-6">

          {/* <div className="flex-1 max-w-[200px] mt-40 mr-20">
            <h3 className="text-[18px] font-ruqaa text-center mb-4 text-[#6E9479]  ">
              تخصيص حلقة للمعلم
            </h3>
            <div className="bg-white rounded-xl shadow-md p-2 h-[300px] overflow-y-auto rtl custom-scroll">
              {حلقات.map((label, index) => (
                <label
                  key={index}
                  className="flex justify-between items-center py-1 w-full flex-row-reverse font-ruqaa"
                >
                  <input
                    type="checkbox"
                    checked={["حلقة سير", "حلقة فقه"].includes(label)}
                    className="accent-[#97BAA4]"
                    readOnly
                  />
                  <span className="text-[#6E9479] font-medium text-sm">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div> */}

          <div className="flex-2 w-full lg:max-w-[600px] mt-4 lg:mt-0 ">
            <h2 className="text-right font-bold text-[30px] mt-6 mb-6 text-[#2A603F] ">
              إضافة معلم جديد
            </h2>
            <h3 className="text-right font-bold text-[25px] mb-5 mr-2  ">
              بيانات المعلم
            </h3>

            <div className="space-y-3 ">
             

           <input
  type="text"
  placeholder="الاسم"
  value={formData.first_name}
  onChange={(e) =>
    setFormData({ ...formData, first_name: e.target.value })
  }
  className="bg-white rounded-xl shadow-md border border-gray-200 focus:border-gray-400 w-full p-2 text-right text-gray-500"
/>
<input
  type="text"
  placeholder="الاسم الثاني"
  value={formData.last_name}
  onChange={(e) =>
    setFormData({ ...formData, last_name: e.target.value })
  }
  className="bg-white rounded-xl shadow-md border border-gray-200 focus:border-gray-400 w-full p-2 text-right text-gray-500"
/>
{/* 
              <input
                placeholder="البريد الإلكتروني"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              className="bg-white rounded-xl shadow-md border border-gray-200 focus:border-gray-400 w-full p-2 text-right text-gray-500"
/>
              <input
                placeholder="كلمة المرور"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              className="bg-white rounded-xl shadow-md border border-gray-200 focus:border-gray-400 w-full p-2 text-right text-gray-500"
/> */}

              <input
                type="text"
                placeholder="رقم الهاتف"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              className="bg-white rounded-xl shadow-md border border-gray-200 focus:border-gray-400 w-full p-2 text-right text-gray-500"
/>
              {/* <input
                type="text"
                placeholder="   رقم الهاتف الاب "
                value={formData.father_phone}
                onChange={(e) =>
                  setFormData({ ...formData, father_phone: e.target.value })
                }
              className="bg-white rounded-xl shadow-md border border-gray-200 focus:border-gray-400 w-full p-2 text-right text-gray-500"
/> */}
              <input
                type="text"
                placeholder="العنوان"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              className="bg-white rounded-xl shadow-md border border-gray-200 focus:border-gray-400 w-full p-2 text-right text-gray-500"
/>
              <input
                type="date"
                placeholder="المواليد"
                value={formData.birth_date}
                onChange={(e) =>
                  setFormData({ ...formData, birth_date: e.target.value })
                }
              className="bg-white rounded-xl shadow-md border border-gray-200 focus:border-gray-400 w-full p-2 text-right text-gray-500"
/>
              <input
                type="text"
                placeholder="الشهادات"
                value={formData.certificates}
                onChange={(e) =>
                  setFormData({ ...formData, certificates: e.target.value })
                }
              className="bg-white rounded-xl shadow-md border border-gray-200 focus:border-gray-400 w-full p-2 text-right text-gray-500"
/>
              <input
                type="text"
                placeholder="الدورات الشرعية"
                value={formData.experiences}
                onChange={(e) =>
                  setFormData({ ...formData, experiences: e.target.value })
                }
              className="bg-white rounded-xl shadow-md border border-gray-200 focus:border-gray-400 w-full p-2 text-right text-gray-500"
/>
              <input
                type="text"
                placeholder="عدد الأجزاء المحفوظة"
                value={formData.memorized_parts}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    memorized_parts: e.target.value,
                  })
                }
              className="bg-white rounded-xl shadow-md border border-gray-200 focus:border-gray-400 w-full p-2 text-right text-gray-500"
/>
            </div>
          </div>
        </div>

       <div className="text-center mt-8">
  <button
    onClick={handleSubmit}
    className="w-[160px] h-[45px] bg-[#CDE8D8] rounded-lg text-black font-bold text-base hover:bg-[#B3DAC6] mx-auto"
  >
    إنشاء
  </button>
</div>


        <div className="absolute bottom-0 left-2 w-[200px] hidden md:block">
  <img src="/satl.png" alt="plant" className="w-full" />
</div>

<div className="absolute -top-[150px] -right-[100px] w-[400px] h-[300px] rounded-full bg-[#D6EAD9] blur-[200px] z-0"></div>

       
      </div>
    </div>
  );
}
