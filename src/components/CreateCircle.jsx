import { useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
export default function CreateCircle() {
  const [circleData, setCircleData] = useState({
    name: "",
    type: "", // نوع الحلقة واحد فقط
    students: [], // اختيار طلاب متعدد
  });

  const studentsList = [
    "ياسمين حكش",
    "ثواب القلم",
    "نور جنفلادي",
    "بثينة منور",
    "سميرة يقدونس",
    "لانا أبو قاسم",
    "سارة نزيك",
    "زهرة كوكش",
     "لانا أبو قاسم",
    "سارة نزيك",
    "زهرة كوكش",
     "لانا أبو قاسم",
    "سارة نزيك",
    "زهرة كوكش",
     "لانا أبو قاسم",
    "سارة نزيك",
    "زهرة كوكش",
  ];

  const circleTypes = ["درس", "تسميع", "حديث", "تلقين"];

  // toggle للطلاب (checkbox متعدد)
  const toggleStudent = (student) => {
    setCircleData((prev) => {
      const exists = prev.students.includes(student);
      const updated = exists
        ? prev.students.filter((s) => s !== student)
        : [...prev.students, student];
      return { ...prev, students: updated };
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://api.devscape.online/api/circles/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(circleData),
        }
      );
      const result = await response.json();
      if (response.ok) {
        alert("تم إنشاء الحلقة بنجاح!");
      } else {
        alert("فشل في الإرسال: " + result.message);
      }
    } catch (error) {
      alert("حدث خطأ في الاتصال بالخادم");
    }
  };

  return (
    <div className="min-h-screen bg-[#EBF0EA] flex items-start justify-center font-[Zain] p-6 relative">
    <div className="relative w-full max-w-[1100px] bg-[#F3F7F3] rounded-2xl shadow-md px-8 py-6
+ h-[600px]
">
   {/* زر الرجوع */}
        <div className="w-10 h-10 bg-white rounded-lg flex justify-center items-center absolute top-8 left-8 shadow-md cursor-pointer">
          <img src="/arrow.png" alt="رجوع" className="w-5" />
        </div>

        <div className="flex flex-col lg:flex-row-reverse justify-start gap-10">
          {/* نموذج بيانات الحلقة */}
        
<div className="flex-1 max-w-[450px] mt-4">
  <h2 className="text-right font-bold text-[30px] mb-5 text-[#2A3B1F]">
    إنشاء حلقة جديدة
  </h2>

  <h3 className="text-right font-bold text-[25px] mb-2 text-[#2A3B1F]">
    نوع الحلقة
  </h3>
  <div className="flex flex-col space-y-3 mb-6 text-right rtl items-end">
    {circleTypes.map((type) => (
      <label
        key={type}
        className="flex items-center gap-3 cursor-pointer text-[#6E9479] font-medium"
      >
        {type}
        <input
          type="radio"
          name="circleType"
          value={type}
          checked={circleData.type === type}
          onChange={() => setCircleData({ ...circleData, type })}
          className="accent-[#97BAA4] w-4 h-4"
        />
      </label>
    ))}
  </div>

  {/* تغليف input مع الأيقونة */}
  <div className="relative">
    <input
      type="text"
      placeholder="اسم الحلقة"
      value={circleData.name}
      onChange={(e) => setCircleData({ ...circleData, name: e.target.value })}
      className="bg-white rounded-xl shadow-md border border-gray-300 focus:border-[#97BAA4] w-full p-3 pr-10 text-right text-gray-600 placeholder-gray-400"
    />
    <MdOutlineDateRange
      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 pointer-events-none"
      size={24}
    />
  </div>
</div>

          {/* قائمة الطلاب */}
          <div className="flex-1 max-w-[300px] mt-4  ">
            <h3 className="text-[25px] font-bold text-right mb-3 text-[#2A3B1F]">
              تعيين طلاب للحلقة
            </h3>
          <div className="bg-white rounded-xl shadow-md p-4 h-[300px] overflow-y-auto rtl custom-scroll border border-gray-200">
  {studentsList.map((student) => (
    <label
      key={student}
      className="flex justify-between items-center py-1 w-full flex-row-reverse cursor-pointer"
    >
      {/* نضع الكلام قبل الشيك */}
      <span className="text-[#6E9479] font-medium text-sm">
        {student}
      </span>
      <input
        type="checkbox"
        checked={circleData.students.includes(student)}
        onChange={() => toggleStudent(student)}
        className="accent-[#97BAA4] w-5 h-5 rounded-md " // rounded-full عشان يكون دائري
      />
    </label>
  ))}
</div>

          </div>
        </div>

        {/* زر الإنشاء */}
        <div className=" mt-20 ">
          <button
            onClick={handleSubmit}
            className="translate-x-[550px] w-[160px] h-[45px] bg-[#A5C6A1] rounded-lg text-black font-bold text-base hover:bg-[#97BAA4] transition-colors"
          >
            إنشاء
          </button>
        </div>

        {/* صورة الزرع */}
        <div className="absolute bottom-4 left-4 w-[180px] hidden md:block">
          <img src="/satl.png" alt="plant" className="w-full" />
        </div>

        {/* دائرة خلفية */}
        <div className="absolute -top-[150px] -right-[120px] w-[400px] h-[400px] rounded-full bg-[#D6EAD9] blur-[200px] z-0"></div>
      </div>
    </div>
  );
}
