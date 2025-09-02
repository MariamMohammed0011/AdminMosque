import { useEffect, useState } from "react";
import { Menu, Search, User, MoreVertical } from "lucide-react";
import { IoMdAdd } from "react-icons/io";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { LuFileText } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
export default function Teachers() {

  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMenuIndex, setShowMenuIndex] = useState(null);
  const [editModal, setEditModal] = useState(false);
    const navigate = useNavigate();
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
      const token = localStorage.getItem("token");
console.log("Token:", token);

    const res = await fetch("/api/mosque/AllStudentAndTeacher", {
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        });
        const data = await res.json();
        setTeachers(data.AllTeacher || []);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      }
    };

    fetchTeachers();
  }, []);


  const filteredTeachers = teachers.filter(
    (t) =>
      t.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.phone.includes(searchTerm)
  );


  return (
    <div className="flex flex-col justify-between items-center">
      <div className="w-full pb-2 mr-5">
        <h1 className="text-4xl font-light text-right font-zain mb-2">
          ... أهلا بعودتك آ .ليلى
        </h1>
        <h3 className="text-2xl text-right text-gray-400 font-zain font-[200] mb-2">
          كيف نساعدك اليوم ؟
        </h3>
      </div>

     
      <div className="w-full mb-4 mr-5 flex justify-between md:gap-4 flex-col md:flex-row">
        <button className="flex items-center gap-1 border px-3 py-1 rounded-lg shadow">
          <Menu size={18} />
          <span>تصنيف حسب</span>
        </button>

        <div className="relative flex w-[60%]">
          <input
            type="text"
            placeholder="بحث"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-full pl-10 font-ruqaa placeholder:text-xl pr-3 py-2 shadow focus:outline-[#AFD1BC] w-[600px]"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={19}
          />
        </div>
      </div>

     
        <div className="bg-[#D6E6DB] rounded-xl p-4 shadow flex-1 overflow-x-auto">
          <div className="flex justify-end    items-end mb-6 flex-col  text-right gap-1 font-ruqaa">
             <h3 className="flex text-xl font-bold text-[#2A603F] text-right ">
              المعلمين
            </h3>
            <button
              className="flex items-center gap-1 text-[#2A603F] "
              onClick={() => navigate('/createTeacher')}
            >
              <div className="w-5 h-5 bg-white rounded text-center flex justify-center shadow-lg">
                <IoMdAdd size={20} className="text-[#999999]" />
              </div>
              <span
                className="font-medium p-2 text-[#999999]"
                style={{ textShadow: "0px 4px 4px #00000040" }}
              >
                إضافة معلم
              </span>
            </button>
           
          </div>

          <div className="hidden md:grid grid-cols-7 bg-[#D6E6DB] text-[#2A603F] font-bold p-2 rounded-lg text-center">
           
           
             <span>الإجراءات</span>
            <span>الملف الشخصي</span>
             <span>رقم الهاتف</span>
            <span> العنوان</span>
             <span>البريد الالكتروني</span>
             <span>اسم المعلم </span>
           
            <span></span>
          </div>

          <div className="space-y-2 mt-2">
            {filteredTeachers.map((teacher) => (
              <div key={teacher.id}>
                <div className="hidden md:grid grid-cols-7  bg-white p-2 rounded-lg text-center shadow hover:bg-gray-100 transition">
                  <div className="flex justify-center relative">
                    <button
                      onClick={() =>
                        setShowMenuIndex(
                          teacher.id === showMenuIndex ? null : teacher.id
                        )
                      }
                    >
                      <MoreVertical />
                    </button>
                    {showMenuIndex === teacher.id && (
                      <div className="absolute right-full translate-x-[57px] translate-y-2 bg-white border rounded shadow z-10 w-20 text-center flex flex-col">
                        <button
                          className="block text-[#000] font-ruqaa hover:bg-gray-100"
                          onClick={() => {
                            setShowMenuIndex(null);
                            
                            setEditModal(true);
                          }}
                        >
                          تعديل
                        </button>
                        <button
                          className="block text-[#000] hover:bg-gray-100 font-ruqaa"
                          onClick={() => {
                            setShowMenuIndex(null);
                           
                          }}
                        >
                          حذف
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-center gap-1 w-24 text-center break-words">
                    <button onClick={() => navigate(`/profile/${mosque.id}`)}>
                      <LuFileText
                        className="text-[#2A603F] mx-auto"
                        size={20}
                      />
                      <span className="text-xs">الملف الشخصي</span>
                    </button>
                  </div>
                   <span className="text-xs break-words ">{teacher.phone} </span>
                   <span className="text-xs break-words ">
                    {teacher.address}{" "}
                  </span>
                  
                  <span className="text-sm  break-words text-[#2A603F] font-zain ">{teacher.email} </span>
                   <span className="text-sm break-words text-[#2A603F] font-zain ">{`${teacher.first_name} ${teacher.last_name}`}</span>

                 
                  
              
                  <span>
                    <AccountCircleOutlinedIcon className="text-[#F8C248]" />
                  </span>
                </div>

              
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}
