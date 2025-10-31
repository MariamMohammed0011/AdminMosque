import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  notifySuccess,
  notifyError,
  notifyInfo,
} from "../utils/toastNotifications.jsx";
export default function CreateStudent() {
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
    father_phone: "",
    address: "",
    certificates: "",
    experiences: "",
    memorized_parts: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("/api/auth/register/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
console.log(token);
      const result = await response.json();
      if (response.ok) {
         notifySuccess("تم إنشاء الطالب بنجاح!");
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

  return (
    <div className="min-h-screen bg-[#FBFAF8] flex items-start justify-center font-[Zain] p-1   ">
      <div className="relative w-full max-w-[1100px] bg-[#FBFAF8] rounded-[20px] shadow-lg px-6 py-10 pb-[160px]">
        <div
          className="w-10 h-10 bg-white rounded-lg flex justify-center items-center absolute top-8 left-8 shadow-md cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <img src="/arrow.png" alt="رجوع" className="w-5" />
        </div>

        <h2 className="text-right font-bold text-[30px] mb-5">
          إضافة طالب جديد
        </h2>
        <h3 className="text-right font-bold text-[25px] mb-2">بيانات الطالب</h3>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="الاسم"
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
            className="bg-white rounded-xl shadow-md border border-gray-200 w-full p-2 text-right text-gray-500"
          />

          <input
            type="text"
            placeholder="الاسم الثاني"
            value={formData.last_name}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
            className="bg-white rounded-xl shadow-md border border-gray-200 w-full p-2 text-right text-gray-500"
          />

          {/* <input
            placeholder="البريد الإلكتروني"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="bg-white rounded-xl shadow-md border border-gray-200 w-full p-2 text-right text-gray-500"
          />

          <input
            placeholder="كلمة المرور"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="bg-white rounded-xl shadow-md border border-gray-200 w-full p-2 text-right text-gray-500"
          /> */}

          <input
            type="text"
            placeholder="رقم الهاتف"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="bg-white rounded-xl shadow-md border border-gray-200 w-full p-2 text-right text-gray-500"
          />

          <input
            type="text"
            placeholder="رقم هاتف الأب"
            value={formData.father_phone}
            onChange={(e) =>
              setFormData({ ...formData, father_phone: e.target.value })
            }
            className="bg-white rounded-xl shadow-md border border-gray-200 w-full p-2 text-right text-gray-500"
          />

          <input
            type="text"
            placeholder="العنوان"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="bg-white rounded-xl shadow-md border border-gray-200 w-full p-2 text-right text-gray-500"
          />

          <input
            type="date"
            placeholder="تاريخ الميلاد"
            value={formData.birth_date}
            onChange={(e) =>
              setFormData({ ...formData, birth_date: e.target.value })
            }
            className="bg-white rounded-xl shadow-md border border-gray-200 w-full p-2 text-right text-gray-500"
          />

          <input
            type="text"
            placeholder="الدراسة"
            value={formData.certificates}
            onChange={(e) =>
              setFormData({ ...formData, certificates: e.target.value })
            }
            className="bg-white rounded-xl shadow-md border border-gray-200 w-full p-2 text-right text-gray-500"
          />

          <input
            type="text"
            placeholder="العمل"
            value={formData.experiences}
            onChange={(e) =>
              setFormData({ ...formData, experiences: e.target.value })
            }
            className="bg-white rounded-xl shadow-md border border-gray-200 w-full p-2 text-right text-gray-500"
          />

          <input
            type="number"
            placeholder="عدد الأجزاء المحفوظة"
            value={formData.memorized_parts}
            onChange={(e) =>
              setFormData({ ...formData, memorized_parts: e.target.value })
            }
            className="bg-white rounded-xl shadow-md border border-gray-200 w-full p-2 text-right text-gray-500  "
          />
        </div>

      
       <div className="text-center mt-8">
  <button
    onClick={handleSubmit}
    className="w-[160px] h-[45px] bg-[#CDE8D8] rounded-lg text-black font-bold text-base hover:bg-[#B3DAC6] mx-auto"
  >
    إنشاء
  </button>
</div>

        <div className="absolute bottom-0 left-2 w-[200px] hidden md:block  ">
          <img src="/satl.png" alt="plant" className="w-full" />
        </div>
        
<div className="absolute -top-[150px] -right-[100px] w-[400px] h-[300px] rounded-full bg-[#D6EAD9] blur-[200px] z-0"></div>

      </div>
    </div>
  );
}
