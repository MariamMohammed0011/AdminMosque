import { useEffect, useState } from "react";
import { Menu, Search, User, MoreVertical } from "lucide-react";
import { IoMdAdd } from "react-icons/io";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { LuFileText } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMenuIndex, setShowMenuIndex] = useState(null);
  const [adminName, setAdminName] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showSortMenu, setShowSortMenu] = useState(false);
const [sortField, setSortField] = useState("");
const [sortOrder, setSortOrder] = useState("asc");
const [showSortFieldMenu, setShowSortFieldMenu] = useState(false);
const [showSortOrderMenu, setShowSortOrderMenu] = useState(false);
const sortFieldLabel = (field) => {
  switch (field) {
    case "name":
      return "الاسم";
    case "address":
      return "العنوان";
    default:
      return "";
  }
};

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    father_phone: "",
    birth_date: "",
    email: "",
    address: "",
    certificates: "",
    experiences: "",
    memorized_parts: 0,
    is_save_quran: false,
    code:"",
  });

  const navigate = useNavigate();
  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/mosque/AllStudentAndTeacher", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setStudents(data.AllStudent || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const admin = JSON.parse(storedUser);
      setAdminName(`${admin.first_name} ${admin.last_name}`);
    }
    fetchStudents();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const admin = JSON.parse(storedUser);
      setAdminName(`${admin.first_name} ${admin.last_name}`);
    }
    const fetchStudents = async () => {
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
        setStudents(data.AllStudent || []);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students
    .filter((t) => t.first_name || t.last_name || t.phone)
    .filter((t) => {
      const firstName = t.first_name?.toLowerCase() || "";
      const lastName = t.last_name?.toLowerCase() || "";
      const phone = t.phone || "";

      return (
        firstName.includes(searchTerm.toLowerCase()) ||
        lastName.includes(searchTerm.toLowerCase()) ||
        phone.includes(searchTerm)
      );
    });

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const res = await fetch(`/api/user/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setStudents((prev) => prev.filter((student) => student.id !== id));
        console.log(`Student ${id} deleted`);
      } else {
        const err = await res.json();
        console.error("Error deleting student:", err);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };
  const handleUpdate = async () => {
    if (!selectedStudent) return;

    const token = localStorage.getItem("token");
    if (!token) return;
    const body = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
      father_phone: formData.father_phone,
      birth_date: formData.birth_date,
      email: formData.email,
      address: formData.address,
      certificates: formData.certificates,
      experiences: formData.experiences,
      code_user:formData.code_user,
      memorized_parts: formData.memorized_parts,
      is_save_quran: formData.is_save_quran,
      ...(formData.password ? { password: formData.password } : {}),
    };

    try {
      const res = await fetch(`/api/user/updateUser/${selectedStudent.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const updated = await res.json();
        setStudents((prev) =>
          prev.map((s) => (s.id === selectedStudent.id ? updated : s))
        );
        await fetchStudents();
        setEditModal(false);

        navigate("/dashboard");
        console.log("Student updated:", updated);
      } else {
        const err = await res.json();
        console.error("Error updating student:", err);
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };
const getSortedStudents = () => {
  let sorted = [...filteredStudents];
  if (sortField) {
    sorted.sort((a, b) => {
      let aField = "";
      let bField = "";

      if (sortField === "name") {
        aField = `${a.first_name} ${a.last_name}`.toLowerCase();
        bField = `${b.first_name} ${b.last_name}`.toLowerCase();
      } else if (sortField === "address") {
        aField = a.address?.toLowerCase() || "";
        bField = b.address?.toLowerCase() || "";
      }

      if (aField < bField) return sortOrder === "asc" ? -1 : 1;
      if (aField > bField) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }
  return sorted;
};

  return (
    <div className="flex flex-col justify-between items-center">
      <div className="w-full pb-2 mr-5">
        <h1 className="text-4xl font-light text-right font-zain">
          ... أهلا بعودتك آ. {adminName ? adminName.split(" ")[0] : "مشرف"}
        </h1>

        <h3 className="text-2xl text-right text-gray-400 font-zain font-[200] mb-2">
          كيف نساعدك اليوم ؟
        </h3>
      </div>

    <div className="w-full mb-4 mr-5 flex justify-between md:gap-4 flex-col md:flex-row">
        <button
  className="flex items-center gap-1 border px-3 py-1 rounded-lg shadow"
  onClick={() => setShowSortMenu(!showSortMenu)}
>
  <Menu size={18} />
  <span>تصنيف حسب</span>
</button>
{showSortMenu && (
  <div className="absolute mt-10 w-72 bg-white border rounded-2xl shadow-lg p-4 space-y-4 z-20">
    <button
      onClick={() => setShowSortMenu(false)}
      className="absolute left-2 top-2 text-gray-500 hover:text-gray-700"
    >
      <IoCloseCircleOutline size={30} />
    </button>

    {/* المجال */}
    <div className="relative w-full">
      <label className="flex flex-row-reverse mb-2 font-medium text-[#2A603F]">المجال</label>
      <button
        onClick={() => setShowSortFieldMenu(prev => !prev)}
        className="w-full text-right p-2 border rounded-2xl bg-white flex justify-between items-center"
      >
        {sortField ? sortFieldLabel(sortField) : "اختر المجال"}
        <span className="text-gray-400">▼</span>
      </button>

      {showSortFieldMenu && (
        <ul className="absolute w-full bg-white border rounded-2xl mt-1 max-h-32 overflow-y-auto shadow-lg z-50">
          {[
            { value: "name", label: "الاسم" },
            { value: "address", label: "العنوان" }
          ].map(option => (
            <li
              key={option.value}
              onClick={() => { setSortField(option.value); setShowSortFieldMenu(false); }}
              className="p-2 hover:bg-[#AFD1BC] cursor-pointer text-right text-[#2A603F]"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* الترتيب */}
    <div className="relative w-full mt-2">
      <label className="flex flex-row-reverse mb-2 font-medium text-[#2A603F]">الترتيب</label>
      <button
        onClick={() => setShowSortOrderMenu(prev => !prev)}
        className="w-full text-right p-2 border rounded-2xl bg-white flex justify-between items-center"
      >
        {sortOrder === "asc" ? "تصاعدي" : "تنازلي"}
        <span className="text-gray-400">▼</span>
      </button>

      {showSortOrderMenu && (
        <ul className="absolute w-full bg-white border rounded-2xl mt-1 max-h-32 overflow-y-auto shadow-lg z-50">
          {[
            { value: "asc", label: "تصاعدي" },
            { value: "desc", label: "تنازلي" }
          ].map(option => (
            <li
              key={option.value}
              onClick={() => { setSortOrder(option.value); setShowSortOrderMenu(false); }}
              className="p-2 hover:bg-[#AFD1BC] cursor-pointer text-right text-[#2A603F]"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
)}

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


      <div className="bg-[#D6E6DB] rounded-xl p-4  shadow flex-1 overflow-x-auto  w-full">
        <div className="flex justify-end  items-end mb-6 flex-col text-right gap-5 ">
          <h3 className="text-xl font-bold text-[#2A603F] text-right">
            الطلاب
          </h3>
          <button
            className="flex items-center gap-3 text-[#2A603F] "
            onClick={() => navigate("/createStudent")}
          >
            <div className="w-5 h-5 bg-white rounded text-center flex justify-center shadow-lg">
              <IoMdAdd size={20} className="text-[#999999]" />
            </div>
            <span
              className="font-medium p-2 text-[#999999]"
              style={{ textShadow: "0px 4px 4px #00000040" }}
            >
              إضافة طالب
            </span>
          </button>
        </div>

        <div className="hidden md:grid grid-cols-8 bg-[#D6E6DB] text-[#2A603F] font-bold p-2 rounded-lg text-center ">
          <span>الإجراءات</span>
          <span>الملف الشخصي</span>
          <span>رقم الهاتف</span>
           <span> العنوان</span>
          <span> الكود</span>
          <span>البريد الالكتروني</span>
          <span>اسم الطالب </span>

          <span></span>
        </div>

        <div className="space-y-2 mt-2 ">
         {getSortedStudents().map((student) =>  (
            <div key={student.id}>
              <div className="hidden md:grid grid-cols-8  bg-white p-2 rounded-lg text-center shadow hover:bg-gray-100 transition">
                <div className="flex justify-center relative w-full">
                  <button
                    onClick={() =>
                      setShowMenuIndex(
                        student.id === showMenuIndex ? null : student.id
                      )
                    }
                  >
                    <MoreVertical />
                  </button>
                  {showMenuIndex === student.id && (
                    <div className="absolute right-full translate-x-[60px] translate-y-2 bg-white border rounded shadow z-10 w-20 text-center flex flex-col">
                      <button
                        onClick={() => setShowMenuIndex(null)}
                        className="flex justify-center items-center p-1 hover:bg-gray-100   absolute left-0 top-0"
                      >
                        <IoCloseOutline size={13} className="" />
                      </button>
                      <button
                        className="block text-[#000] font-ruqaa hover:bg-gray-100 mt-4 "
                        onClick={() => {
                          setShowMenuIndex(null);
                          setSelectedStudent(student);
                          setFormData({
                            first_name: student.first_name || "",
                            last_name: student.last_name || "",
                            phone: student.phone || "",
                            father_phone: student.father_phone || "",
                            birth_date: student.birth_date || "",
                            email: student.email || "",
                            address: student.address || "",
                            certificates: student.certificates || "",
                            experiences: student.experiences || "",
                            memorized_parts: student.memorized_parts || 0,
                            is_save_quran: student.is_save_quran || false,
                            password: "",
                          });
                          setEditModal(true);
                        }}
                      >
                        تعديل
                      </button>

                      <button
                        className="block text-[#000] hover:bg-gray-100 font-ruqaa "
                        onClick={() => {
                          setShowMenuIndex(null);
                          handleDelete(student.id);
                        }}
                      >
                        حذف
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center gap-2 w-full text-center break-words">
                  <button onClick={() => navigate(`/userPro/${student.id}`)}>
                    <LuFileText className="text-[#2A603F] mx-auto" size={20} />
                    <span className="text-xs">الملف الشخصي</span>
                  </button>
                </div>
                <span className="text-sm w-full   text-[#2A603F]  ">
                  {student.phone}{" "}
                </span>
                <span className="text-sm w-full break-words text-[#2A603F] ">
                  {student.address}{" "}
                </span>
                  <span className="text-sm w-full break-words text-[#2A603F] ">
                  {student.code}{" "}
                </span>
                <span className="text-sm w-full break-words text-[#2A603F]   ">
                  {student.email}{" "}
                </span>
                <span className="w-full text-sm break-words text-[#2A603F]  font-zain    ">{`${student.first_name} ${student.last_name}`}</span>

                <span className="w-full">
                  <AccountCircleOutlinedIcon
                    className="text-[#F8C248]  text-2xl "
                    fontSize="large"
                  />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[500px] max-h-[90vh] overflow-y-auto custom-scroll text-right space-y-3 relative">
            {/* زر الإغلاق */}
            <button
              onClick={() => setEditModal(false)}
              className="absolute left-2 top-2 text-gray-500 hover:text-gray-700"
            >
              <IoCloseCircleOutline size={30} />
            </button>

            <h3 className="text-xl font-bold text-[#2A603F] mb-4">
              تعديل معلومات الطالب
            </h3>

            <input
              type="text"
              value={formData.first_name}
              onChange={(e) =>
                setFormData({ ...formData, first_name: e.target.value })
              }
              className="w-full border rounded p-2 text-right"
              placeholder="الاسم الأول"
            />
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
              className="w-full border rounded p-2 text-right"
              placeholder="الاسم الأخير"
            />
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full border rounded p-2 text-right"
              placeholder="رقم الهاتف"
            />
            <input
              type="text"
              value={formData.father_phone}
              onChange={(e) =>
                setFormData({ ...formData, father_phone: e.target.value })
              }
              className="w-full border rounded p-2 text-right"
              placeholder="رقم هاتف الأب"
            />
            <input
              type="date"
              value={formData.birth_date}
              onChange={(e) =>
                setFormData({ ...formData, birth_date: e.target.value })
              }
              className="w-full border rounded p-2 text-right"
              placeholder="تاريخ الميلاد"
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border rounded p-2 text-right"
              placeholder="البريد الإلكتروني"
            />
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full border rounded p-2 text-right"
              placeholder="العنوان"
            />
            <input
              type="text"
              value={formData.certificates}
              onChange={(e) =>
                setFormData({ ...formData, certificates: e.target.value })
              }
              className="w-full border rounded p-2 text-right"
              placeholder="الشهادات"
            />
            <input
              type="text"
              value={formData.experiences}
              onChange={(e) =>
                setFormData({ ...formData, experiences: e.target.value })
              }
              className="w-full border rounded p-2 text-right"
              placeholder="الخبرات"
            />
            <input
              type="number"
              value={formData.memorized_parts}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  memorized_parts: Number(e.target.value),
                })
              }
              className="w-full border rounded p-2 text-right"
              placeholder="عدد الأجزاء المحفوظة"
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_save_quran}
                onChange={(e) =>
                  setFormData({ ...formData, is_save_quran: e.target.checked })
                }
              />
              حافظ للقرآن
            </label>

            {/* <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full border rounded p-2 text-right"
              placeholder="كلمة المرور"
            /> */}

            <button
              onClick={handleUpdate}
              type="button"
              className="bg-[#2A603F] text-white px-4 py-2 rounded w-full hover:bg-[#245138]"
            >
              حفظ التعديلات
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
