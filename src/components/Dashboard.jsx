import React, { useEffect, useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const handleCreateTeacher = () => {
    navigate("/createTeacher");
  };

  const handleCreateCircle = () => {
    navigate("/createCircle");
  };

  const handleCreateStudent = () => {
    navigate("/createStudent");
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center font-ruqaa text-[#2A603F] bg-[#FBFAF8]">
        جاري تحميل البيانات...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FBFAF8] font-ruqaa text-[#2A603F]">
      
      <aside className="w-64 bg-[#EBF3EC] shadow-2xl rounded-2xl flex flex-col text-[#2A603F]">
        <div className="p-6 border-b border-[#2A603F]/20 flex justify-center">
          <img
            src="/mgras.png"
            alt="مغراس"
            className="w-32 object-contain"
          />
        </div>

        <nav className="flex flex-col gap-6 mt-8 px-6 text-xl text-right">
          <button
            onClick={handleCreateTeacher}
            className="flex items-center gap-3 justify-end hover:text-[#245138]"
          >
            <IoMdAddCircleOutline size={24} />
            <span>إنشاء أستاذ</span>
          </button>

          <button
            onClick={handleCreateStudent}
            className="flex items-center gap-3 justify-end hover:text-[#245138]"
          >
            <IoMdAddCircleOutline size={24} />
            <span>إنشاء طالب</span>
          </button>
           <button
            onClick={handleCreateCircle}
            className="flex items-center gap-3 justify-end hover:text-[#245138]"
          >
            <IoMdAddCircleOutline size={24} />
            <span>إنشاء حلقة</span>
          </button>


          <button
            onClick={handleLogout}
            className="flex items-center gap-3 justify-end hover:text-red-600"
          >
            <IoMdLogOut size={24} />
            <span>تسجيل خروج</span>
          </button>
        </nav>
      </aside>

      
      <main className="flex-1 p-6 flex flex-col gap-6 overflow-auto">
        <h1 className="text-3xl font-bold text-right border-b border-[#2A603F]/30 pb-3 mb-6">
         اداره االمسجد
        </h1>

        <section className="bg-[#D6E6DB] rounded-xl shadow-lg p-6 max-w-5xl mx-auto text-right">
          <h2 className="text-2xl font-semibold border-b border-[#2A603F] pb-2 mb-4">
            بيانات المستخدم
          </h2>

          <table className="min-w-full border border-gray-300 rounded-lg shadow-md text-sm">
            <tbody>
              <TableRow label="الاسم الأول" value={userData.first_name} isOdd={true} />
              <TableRow label="اسم العائلة" value={userData.last_name} />
              <TableRow label="الهاتف" value={userData.phone} isOdd={true} />
              <TableRow label="هاتف الأب" value={userData.father_phone} />
              <TableRow
                label="تاريخ الميلاد"
                value={new Date(userData.birth_date).toLocaleDateString("ar-EG")}
                isOdd={true}
              />
              <TableRow label="البريد الإلكتروني" value={userData.email} />
              <TableRow label="العنوان" value={userData.address} isOdd={true} />
              <TableRow label="الشهادات" value={userData.certificates} />
              <TableRow label="الخبرات" value={userData.experiences} isOdd={true} />
              <TableRow label="عدد الأجزاء المحفوظة" value={userData.memorized_parts} />
              <TableRow label="دور المستخدم" value={getRoleName(userData.role_id)} isOdd={true} />
              <TableRow label="هل حفظ القرآن؟" value={userData.is_save_quran ? "نعم" : "لا"} />
              <TableRow label="كود المستخدم" value={userData.code_user} isOdd={true} />
              <TableRow label="تاريخ الإنشاء" value={formatDate(userData.created_at)} />
              <TableRow label="آخر تحديث" value={formatDate(userData.updated_at)} isOdd={true} />
              <TableRow label="التوكن" value={userData.token ? "مخزن" : "غير موجود"} />
              <TableRow label="معرف الجامع" value={userData.mosque_id} isOdd={true} />
              <TableRow label="معرف المستخدم" value={userData.id} />
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

function TableRow({ label, value, isOdd }) {
  return (
    <tr
      className={`border-b border-gray-300 ${
        isOdd ? "bg-white" : "bg-gray-50"
      } hover:bg-green-100 transition-colors duration-200`}
    >
      <td className="px-6 py-3 font-semibold text-right w-48 text-gray-800">
        {label}
      </td>
      <td className="px-6 py-3 max-w-xs break-words text-gray-700">{value || "-"}</td>
    </tr>
  );
}

function getRoleName(role_id) {
  switch (role_id) {
    case 1:
      return "مدير";
    case 2:
      return "إمام";
    case 3:
      return "طالب";
    default:
      return "غير معروف";
  }
}

function formatDate(dateString) {
  if (!dateString) return "-";
  const d = new Date(dateString);
  return d.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}











