import { useState } from "react";
import { PiChalkboardTeacher } from "react-icons/pi";
import { PiStudentFill } from "react-icons/pi";
import { BiLoaderCircle } from "react-icons/bi";
import { BiBarChart } from "react-icons/bi";
import { GiJeweledChalice } from "react-icons/gi";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Teachers from "./teachers/Teachers";
import Students from "./students/Students";
import Circles from "./circles/Circles";
import Challenges from "./challenges/Challenges";
import Statistics from "./statistics/Statistics";
import { Menu } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("teachers");
 const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/loginAdmin");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "teachers":
        return (
          <div>
            {" "}
            <Teachers />
          </div>
        );
      case "students":
        return (
          <div>
            <Students />
          </div>
        );
      case "circles":
        return (
          <div>
            <Circles />
          </div>
        );
      case "results":
        return (
          <div>
            <Statistics />
          </div>
        );
      case "challenges":
        return (
          <div>
            <Challenges />
          </div>
        );
      default:
        return (
          <div>
            {" "}
            <Teachers />
          </div>
        );
    }
  };

  return (
    <div className="shadow-2xl min-h-screen flex-row-reverse flex font-ruqaa bg-[#FBFAF8]">
     {/* زر فتح القائمة في الشاشات الصغيرة فقط */}
{/* زر فتح القائمة في الشاشات الصغيرة فقط */}
<button
  className="md:hidden fixed top-4 right-4 z-50 bg-[#2A603F] text-white p-2 rounded-lg shadow-lg"
  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
>
  <Menu size={24} />
</button>

{/* خلفية شفافة عند فتح القائمة على الموبايل */}
{isSidebarOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
    onClick={() => setIsSidebarOpen(false)}
  ></div>
)}

{/* القائمة الجانبية */}
<aside
  className={`shadow-2xl rounded-2xl overflow-hidden w-64 min-h-screen bg-[#EBF3EC] flex flex-col text-[#2A603F]
  fixed md:static top-0 right-0 z-50 transform transition-transform duration-300
  ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0`}
>
  <div>
    <img
      src="../../public/mgras.png"
      alt=""
      className="translate-y-[-60px] object-cover xl:rounded-tr-2xl xl:rounded-br-2xl mb-5"
    />
  </div>

  <nav className="flex flex-col gap-6 text-xl text-right pr-8 font-ruqaa absolute top-60 right-0 z-10">
    <button
      onClick={() => setActiveSection("teachers")}
      className="flex items-center gap-3 justify-end"
    >
      <span>معلمين</span> <PiChalkboardTeacher size={23} />
    </button>
    <button
      onClick={() => setActiveSection("students")}
      className="flex items-center gap-3 justify-end"
    >
      <span>الطلاب</span> <PiStudentFill size={23} />
    </button>
    <button
      onClick={() => setActiveSection("circles")}
      className="flex items-center gap-3 justify-end"
    >
      <span>الحلقات</span> <BiLoaderCircle size={23} />
    </button>
    <button
      onClick={() => setActiveSection("results")}
      className="flex items-center gap-3 justify-end"
    >
      <span>محصلات الطلبة</span> <BiBarChart size={23} />
    </button>
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 justify-end"
    >
      <span>تسجيل خروج</span> <IoMdLogOut size={23} />
    </button>
  </nav>
</aside>

{/* خلفية شفافة عند فتح القائمة على الموبايل */}
{isSidebarOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
    onClick={() => setIsSidebarOpen(false)}
  ></div>
)}

     
      <main className="shadow-2xl flex-1 p-6 flex flex-col gap-6 w-full ">
        {renderContent()}
      </main>
    </div>
  );
}
