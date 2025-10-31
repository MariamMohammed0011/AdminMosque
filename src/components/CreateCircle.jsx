import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineDateRange } from "react-icons/md";
import { toast } from "sonner";
import {
  notifySuccess,
  notifyError,
  notifyInfo,
} from "../utils/toastNotifications.jsx";

export default function CreateCircle() {
  const { circleId } = useParams();
  const [circleData, setCircleData] = useState({
    name: "",
    description: "",
    circle_type_id: null,
    student_id: [],
    teacher_id: [],
  });

  const [selectionMode, setSelectionMode] = useState("students");

  const toggleStudent = (studentId) => {
    setCircleData((prev) => {
      const exists = prev.student_id.includes(studentId);
      return {
        ...prev,
        student_id: exists
          ? prev.student_id.filter((id) => id !== studentId)
          : [...prev.student_id, studentId],
      };
    });
  };

  const selectTeacher = (teacherId) => {
    setCircleData((prev) => ({
      ...prev,
      teacher_id: [teacherId],
    }));
  };

  const navigate = useNavigate();
  const [studentsList, setStudentsList] = useState([]);
  const [teachersList, setTeachersList] = useState([]);
  const [circleTypes, setCircleTypes] = useState([]);

  useEffect(() => {
    const fetchCircleTypes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/circle-type/showAllType", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok)
          setCircleTypes(
            (data.Type || []).map((t) => ({ ...t, id: Number(t.id) }))
          );
      } catch (err) {
        console.error(err);
      }
    };

    const fetchStudentsAndTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("api/mosque/AllStudentAndTeacher", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setStudentsList(data.AllStudent || []);
          setTeachersList(data.AllTeacher || []);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCircleTypes();
    fetchStudentsAndTeachers();
  }, []);

  useEffect(() => {
    if (!circleId) return;

    const fetchCircleData = async () => {
      try {
        const token = localStorage.getItem("token");
        const resCircle = await fetch(`/api/circle/showWithId/${circleId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataCircle = await resCircle.json();
        if (resCircle.ok) {
          setCircleData({
            name: dataCircle.name || "",
            description: dataCircle.description || "",
            circle_type_id: dataCircle.typeCircle_id || null,
            student_id: dataCircle.students?.map((s) => Number(s.id)) || [],
            teacher_id: dataCircle.teachers?.map((t) => Number(t.id)) || [],
          });
        }

        const resLists = await fetch("/api/mosque/AllStudentAndTeacher", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataLists = await resLists.json();
        if (resLists.ok) {
          setStudentsList(
            (dataLists.AllStudent || []).map((s) => ({
              ...s,
              id: Number(s.id),
            }))
          );
          setTeachersList(
            (dataLists.AllTeacher || []).map((t) => ({
              ...t,
              id: Number(t.id),
            }))
          );
        }
      } catch (err) {
        console.error("خطأ في جلب بيانات الحلقة:", err);
      }
    };

    fetchCircleData();
  }, [circleId]);

  const handleSubmit = async () => {
    if (!circleData.name.trim()) {
      notifyError("يرجى إدخال اسم الحلقة");
      return;
    }
    if (!circleData.circle_type_id) {
      notifyError("يرجى اختيار نوع الحلقة");
      return;
    }
    if (circleData.student_id.length === 0) {
      notifyError("يرجى اختيار الطلاب");
      return;
    }
    if (circleData.teacher_id.length === 0) {
      notifyError("يرجى اختيار معلم");
      return;
    }
    if (!circleData.description.trim()) {
      notifyError("يرجى إدخال وصف للحلقة");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const url = circleId
        ? `/api/circle/update/${circleId}`
        : "/api/circle/create";
      const method = circleId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(circleData),
      });

      const result = await response.json();
      if (response.ok) {
        notifySuccess("تم حفظ الحلقة بنجاح!");
        navigate("/dashboard");
      } else {
        notifyError("فشل في إضافة الحلقة!");
      }
    } catch (error) {
      notifyInfo("يرجى مراجعة المعلومات.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#EBF0EA] flex items-start justify-center font-[Zain] p-6 relative">
      <div className="relative w-full max-w-[1300px] bg-[#F3F7F3] rounded-2xl shadow-md px-6 py-5 h-auto md:h-[700px]">
        {/* زر الرجوع */}
        <div
          className="w-10 h-10 bg-white rounded-lg flex justify-center items-center absolute top-6 left-6 shadow-md cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <img src="/arrow.png" alt="رجوع" className="w-5" />
        </div>

        {/* المحتوى الرئيسي */}
        <div className="flex flex-col lg:flex-row-reverse justify-start gap-10 max-lg:gap-6 max-md:gap-4">
          {/* القسم الأول */}
          <div className="flex-1 max-w-[600px] mt-4 w-full">
            <h2 className="text-right font-bold mt-9 md:mt-0 text-[28px] md:text-[30px] mb-8 md:mb-10 text-[#2A3B1F]">
              إنشاء حلقة جديدة
            </h2>

            {/* اسم الحلقة */}
            <h3 className="text-right font-bold text-[22px] md:text-[25px] mb-2 text-[#2A3B1F]">
              اسم الحلقة
            </h3>
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="اسم الحلقة"
                value={circleData.name}
                onChange={(e) =>
                  setCircleData({ ...circleData, name: e.target.value })
                }
                className="bg-white rounded-xl shadow-md border border-gray-300 focus:border-[#97BAA4] w-full p-3 pr-10 text-right text-gray-600 placeholder-gray-400"
              />
              <MdOutlineDateRange
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={22}
              />
            </div>

            {/* نوع الحلقة */}
            <h3 className="text-right font-bold text-[22px] md:text-[25px] mb-2 text-[#2A3B1F]">
              نوع الحلقة
            </h3>
            <div className="flex flex-col space-y-1 text-right py-3 items-end font-ruqaa">
              {circleTypes.map((type) => (
                <label
                  key={type.id}
                  className="flex justify-between items-center w-full max-w-[200px] px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  <span className="text-[#2A3B1F] text-sm md:text-base">
                    {type.name}
                  </span>
                  <input
                    type="radio"
                    name="circleType"
                    value={type.id}
                    checked={circleData.circle_type_id === type.id}
                    onChange={() =>
                      setCircleData((prev) => ({
                        ...prev,
                        circle_type_id: type.id,
                      }))
                    }
                    className="accent-[#97BAA4] w-5 h-5"
                  />
                </label>
              ))}
            </div>

            {/* وصف الحلقة */}
            <h3 className="text-right font-bold text-[22px] md:text-[25px] mb-2 mt-3 text-[#2A3B1F]">
              وصف الحلقة
            </h3>
            <div className="relative mb-10">
              <input
                type="text"
                placeholder="وصف الحلقة"
                value={circleData.description}
                onChange={(e) =>
                  setCircleData({ ...circleData, description: e.target.value })
                }
                className="bg-white rounded-xl shadow-md border border-gray-300 focus:border-[#97BAA4] w-full p-3 pr-10 text-right text-gray-600 placeholder-gray-400"
              />
              <MdOutlineDateRange
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={22}
              />
            </div>
          </div>

          {/* القسم الثاني */}
          <div className="flex-1 max-w-[300px] mt-4 w-full">
            <div className="flex justify-center gap-3 mb-4">
              <button
                onClick={() => setSelectionMode("students")}
                className={`px-4 py-2 rounded-lg font-bold text-sm md:text-base ${
                  selectionMode === "students"
                    ? "bg-[#97BAA4] text-white"
                    : "bg-gray-200"
                }`}
              >
                تخصيص طلاب
              </button>
              <button
                onClick={() => setSelectionMode("teachers")}
                className={`px-4 py-2 rounded-lg font-bold text-sm md:text-base ${
                  selectionMode === "teachers"
                    ? "bg-[#97BAA4] text-white"
                    : "bg-gray-200"
                }`}
              >
                اختيار معلم
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 h-[300px] overflow-y-auto rtl custom-scroll border border-gray-200">
              {selectionMode === "students" &&
                studentsList.map((student) => (
                  <label
                    key={student.id}
                    className="flex flex-row-reverse items-center justify-between py-1 w-full cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={circleData.student_id.includes(student.id)}
                      onChange={() => toggleStudent(student.id)}
                      className="accent-[#97BAA4] w-5 h-5"
                    />
                    <span className="text-[#6E9479] font-medium text-sm font-ruqaa">
                      {student.first_name} {student.last_name}
                    </span>
                  </label>
                ))}

              {selectionMode === "teachers" &&
                teachersList.map((teacher) => (
                  <label
                    key={teacher.id}
                    className="flex flex-row-reverse items-center justify-between py-1 w-full cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="teacher"
                      checked={circleData.teacher_id.includes(teacher.id)}
                      onChange={() => selectTeacher(teacher.id)}
                      className="accent-[#97BAA4] w-5 h-5"
                    />
                    <span className="text-[#6E9479] font-medium text-sm font-ruqaa">
                      {teacher.first_name}
                    </span>
                  </label>
                ))}
            </div>
          </div>
        </div>

        {/* زر الإنشاء */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleSubmit}
            className="w-[160px] h-[45px] bg-[#A5C6A1] rounded-lg text-black font-bold text-base hover:bg-[#97BAA4] transition-colors"
          >
            {circleId ? "تعديل" : "إنشاء"}
          </button>
        </div>

        {/* الديكورات */}
        <div className="absolute bottom-4 left-4 w-[180px] hidden md:block">
          <img src="/satl.png" alt="plant" className="w-full" />
        </div>
        <div className="absolute -top-[150px] -right-[120px] w-[400px] h-[300px] rounded-full bg-[#D6EAD9] blur-[200px] z-0"></div>
      </div>
    </div>
  );
}
