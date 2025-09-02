import { useState } from "react";
import { Search } from "lucide-react";
export default function SummerChallenge() {
 
  const fakeStudents = ["عليا", "هدى", "سارة", "مريم", "أمل", "نور"];


  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    quranTask: "",
    quranLevel: "",
    hadithLevel: "",
    sahabaLevel: "",
    jaziraLevel: "",
    salatLevel: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("تم التسجيل:", formData);
    alert("✅ تم التسجيل بنجاح!");
  };

  return (
    <div className="flex flex-col gap-6 bg-[#FBFAF8] ">
       
     
      <div className="flex flex-row justify-around mb-6  px-2 py-2">
<div className="flex flex-col text-center "> 


  <img src="/challenge.png" alt="challenge" className="w-64 " />


  

  <h1 className="text-3xl text-shadow text-gray-800 font-[500] font-zain -mt-5  ">
    تحدي صيف
  </h1>
  <p className="text-gray-600 font-[700] text-shadow text-2xl ">
    2025
  </p>
</div>





<div className="flex flex-col gap-5 w-[50%]  relative">
  <div className="relative">
    <input
      type="text"
      value={formData.name}
      onChange={(e) => handleChange("name", e.target.value)}
      className="
        w-full
        bg-white text-[#939292] rounded-2xl
        text-right font-zain
        px-6 py-1 pr-10
        focus:outline-none focus:ring-1 focus:ring-gray-200
        shadow-[3px_3px_3px_rgba(0,0,0,0.3)]
      "
    />
    <Search
      className="absolute right-3 top-1 text-[#939292]"
      size={19}
    />
  </div>

  <div className="border p-2 h-40  text-sm bg-white text-right rounded-2xl custom-scroll overflow-y-auto">
    {fakeStudents
      .filter((s) =>
        s.toLowerCase().includes(formData.name.toLowerCase())
      )
      .map((student, idx) => (
        <div
          key={idx}
          className={`p-1 rounded-md cursor-pointer hover:bg-green-100 text-[#999999] font-[500] font-zain ${
            formData.name === student ? "bg-green-200 font-[500]" : ""
          }`}
          onClick={() => handleChange("name", student)}
        >
          {student}
        </div>
      ))}
  </div>
</div>


      </div>

     
      <div className="   grid grid-cols-3 gap-6  px-20"  dir="rtl">
       
       

      
          <div className="text-right  flex flex-col items-start  font-zain">
            <h2 className="font-bold text-gray-800 mb-2 ">الصف</h2>
            {[
              "الصف الثالث - الرابع - الخامس",
              "الصف السادس - السابع",
              "الصف الثامن - التاسع - العاشر",
              "الصف الحادي عشر وما فوق",
            ].map((grade, idx) => (
              <label key={idx} className="flex items-center gap-2 mb-1 font-[300] ">
                <input
                  type="checkbox"
                  checked={formData.grade === grade}
                  onChange={() => handleChange("grade", grade)}
                />
                <span>{grade}</span>
              </label>
            ))}
          </div>

          {/* مهمة القرآن */}
           <div className="font-zain">
            <h2 className="font-bold text-gray-800 mb-2">مهمة القرآن</h2>
            {[
              "   طالبة تلقين",
           "طالبة  اجازة حفظ جديد",
           "طالبة اجازة  سبر خمس اجزاء",
           "طالبة سبر اوقاف",

            ].map((task, idx) => (
              <label key={idx} className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={formData.quranTask === task}
                  onChange={() => handleChange("quranTask", task)}
                />
                <span>{task}</span>
              </label>
            ))}
          </div>

        
          <div className="font-zain">
            <h2 className="font-bold text-gray-800 mb-2">
              مستوى مهمة القرآن (إجباري)
            </h2>
            {["مستوى أول", "مستوى ثاني", "مستوى ثالث"].map((lvl, idx) => (
              <label key={idx} className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={formData.quranLevel === lvl}
                  onChange={() => handleChange("quranLevel", lvl)}
                />
                <span>{lvl}</span>
              </label>
            ))}
          </div> 

       
          <div className="font-zain">
            <h2 className="font-bold text-gray-800 mb-2">
              مهمة الحديث الشريف (اختياري)
            </h2>
            {["مستوى أول", "مستوى ثاني", "مستوى ثالث"].map((lvl, idx) => (
              <label key={idx} className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={formData.hadithLevel === lvl}
                  onChange={() => handleChange("hadithLevel", lvl)}
                />
                <span>{lvl}</span>
              </label>
            ))}
          </div> 

          {/* مهمة الشخصيات */}
          <div className="font-zain">
            <h2 className="font-bold text-gray-800 mb-2">
              مهمة الشخصيات (الصحابة) (اختياري)
            </h2>
            {["مستوى أول", "مستوى ثاني", "مستوى ثالث"].map((lvl, idx) => (
              <label key={idx} className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={formData.sahabaLevel === lvl}
                  onChange={() => handleChange("sahabaLevel", lvl)}
                />
                <span>{lvl}</span>
              </label>
            ))}
          </div> 

       
           <div className="font-zain">
            <h2 className="font-bold text-gray-800 mb-2">مهمة الجزرية</h2>
            {["مستوى أول", "مستوى ثاني"].map((lvl, idx) => (
              <label key={idx} className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={formData.jaziraLevel === lvl}
                  onChange={() => handleChange("jaziraLevel", lvl)}
                />
                <span>{lvl}</span>
              </label>
            ))}
          </div> 

        
         <div className="font-zain">
            <h2 className="font-bold text-gray-800 mb-2">
              صلاة على النبي (اختياري)
            </h2>
            {["مستوى أول", "مستوى ثاني", "مستوى ثالث"].map((lvl, idx) => (
              <label key={idx} className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={formData.salatLevel === lvl}
                  onChange={() => handleChange("salatLevel", lvl)}
                />
                <span>{lvl}</span>
              </label>
            ))}
          </div> 
       
      </div>

   
      <button
        onClick={handleSubmit}
        className="mt-6 w-[120px] py-2 mx-auto text-center bg-[#AFD1BC] text-black font-bold  rounded-2xl shadow-lg hover:bg-green-700"
      >
        تسجيل
      </button>
    </div>
  );
}
