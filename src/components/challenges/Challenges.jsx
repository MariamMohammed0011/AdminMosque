import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import {
  notifySuccess,
  notifyError,
  notifyInfo,
} from "../../utils/toastNotifications.jsx";
import { LiaTasksSolid } from "react-icons/lia";
export default function SummerChallenge() {
  const [ageGroups, setAgeGroups] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [challengeId, setChallengeId] = useState(null);
  const [quranTasks, setQuranTasks] = useState([]);
  const [quranSubLevels, setQuranSubLevels] = useState([]);

  const [selectedLevels, setSelectedLevels] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    quranTaskId: null,
    ageGroupId: null,
    studentId: null,
  });

  const token = localStorage.getItem("token");

  const gradeMapping = {
    1: ["الصف الثالث - الرابع - الخامس"],
    2: ["الصف السادس - السابع"],
    3: ["الصف الثامن - التاسع - العاشر"],
    4: ["الصف الحادي عشر وما فوق"],
  };

  useEffect(() => {
    fetch("/api/challenge/allAgeGroup", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAgeGroups(data.ageGroups))
      .catch((err) => console.error("Error fetching age groups:", err));
  }, [token]);

  useEffect(() => {
    fetch("/api/mosque/AllStudentAndTeacher", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setStudentsList(data.AllStudent || []))
      .catch((err) => console.error("Error fetching students:", err));
  }, [token]);

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleGradeSelection = (selectedGrade) => {
    let matchedAgeGroupId = null;
    for (const [ageGroupId, grades] of Object.entries(gradeMapping)) {
      if (grades.includes(selectedGrade)) {
        matchedAgeGroupId = parseInt(ageGroupId);
        break;
      }
    }

    setFormData((prev) => ({
      ...prev,
      grade: selectedGrade,
      ageGroupId: matchedAgeGroupId,
      quranTaskId: null,
    }));

    setQuranTasks([]);
    setQuranSubLevels([]);
    setSelectedLevels([]);
  };

  const handleStudentSelection = (student) =>
    setFormData((prev) => ({
      ...prev,
      name: `${student.first_name} ${student.last_name}`,
      studentId: student.id,
    }));

  const handleSubmit = () => {
    if (!formData.studentId || !formData.ageGroupId) {
      notifyError("⚠️ يرجى اختيار الطالبة والصف قبل التسجيل");
      return;
    }

    fetch(`/api/challenge/createChallengelevel/${formData.ageGroupId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ student_id: formData.studentId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Challenge Created:", data);
        setChallengeId(data.challenge_id);

        if (formData.ageGroupId === 1) {
          notifySuccess("✅ تم إنشاء التحديات الجاهزة لهذه الطالبة بنجاح!");
        } else {
          setQuranTasks(data.quran || []);
          notifySuccess(
            "✅ تم إنشاء التحدي! يمكنك الآن اختيار مهمة القرآن والمستويات."
          );
        }
      })
      .catch((err) => console.error("Error creating challenge:", err));
  };

  const handleQuranTaskSelection = (taskId) => {
    if (!challengeId) {
      notifyError("⚠️ يرجى إنشاء التحدي أولًا!");
      return;
    }

    handleChange("quranTaskId", taskId);

    fetch(`/api/challenge/createChallangelevel1/${challengeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ taskQuranId: taskId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Levels Saved:", data);
        setQuranSubLevels(data.result || []);
      })

      .catch((err) => {
        console.error("Error fetching Quran levels:", err);
      });
  };

  const handleLevelSelection = (taskId, levelId) => {
    setSelectedLevels((prev) => ({
      ...prev,
      [taskId]: levelId,
    }));
  };
  const handleFinalSubmit = () => {
    if (!challengeId) {
      notifyError("⚠️ يرجى إنشاء التحدي أولًا!");
      return;
    }

    const data = Object.entries(selectedLevels).map(([taskId, levelId]) => ({
      task_id: parseInt(taskId),
      lavel_id: levelId,
    }));

    if (data.length === 0) {
      notifyError("⚠️ يرجى اختيار المستويات أولًا!");
      return;
    }

    fetch(`/api/challenge/createChallangelevel2/${challengeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Final Challenge Response:", response);
        notifySuccess("✅ تم حفظ المستويات النهائية بنجاح!");
      })
      .catch((err) => {
        console.error("Error saving final levels:", err);
        notifyError("❌ حدث خطأ أثناء حفظ المستويات!");
      });
  };

  return (
    <div className="flex flex-col gap-6 bg-[#FBFAF8]">
      <div className="flex flex-row justify-around mb-6 px-2 py-2">
        <div className="flex flex-col text-center">
          <img src="/challenge.png" alt="challenge" className="w-64" />
          <h1 className="text-3xl text-shadow text-gray-800 font-[500] font-zain -mt-5">
            تحدي صيف
          </h1>
          <p className="text-gray-600 font-[700] text-shadow text-2xl">2025</p>
        </div>

        <div className="flex flex-col gap-5 w-[50%] relative">
          <div className="relative">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full bg-white text-[#939292] rounded-2xl text-right font-zain px-6 py-1 pr-10 focus:outline-none focus:ring-1 focus:ring-gray-200 shadow-[3px_3px_3px_rgba(0,0,0,0.3)]"
              placeholder="ابحث عن اسم الطالبة"
            />
            <Search
              className="absolute right-3 top-1 text-[#939292]"
              size={19}
            />
          </div>
          <div className="border p-2 h-40 text-sm bg-white text-right rounded-2xl custom-scroll overflow-y-auto">
            {studentsList
              .filter((s) =>
                `${s.first_name} ${s.last_name}`
                  .toLowerCase()
                  .includes(formData.name.toLowerCase())
              )
              .map((student, idx) => (
                <div
                  key={idx}
                  className={`p-1 rounded-md cursor-pointer hover:bg-green-100 text-[#999999] font-[500] font-zain ${
                    formData.studentId === student.id
                      ? "bg-[#e8e9e6] font-[500] "
                      : ""
                  }`}
                  onClick={() => handleStudentSelection(student)}
                >
                  {student.first_name} {student.last_name}
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 px-20" dir="rtl">
        <div className="text-right flex flex-col items-start font-zain">
          <h2 className="font-bold text-gray-800 mb-2">الصف</h2>
          {ageGroups.length === 0 ? (
            <p className="text-gray-500">جاري تحميل البيانات...</p>
          ) : (
            Object.entries(gradeMapping).map(([ageGroupId, grades]) => {
              const group = ageGroups.find(
                (g) => g.id === parseInt(ageGroupId)
              );
              return (
                <div key={ageGroupId} className="mb-4">
                  <p className="font-bold text-green-700">
                    {group ? group.name : "تحميل..."}
                  </p>
                  {grades.map((grade, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-2 mb-1 font-[300]"
                    >
                      <input
                        type="checkbox"
                        checked={formData.grade === grade}
                        onChange={() => handleGradeSelection(grade)}
                      />
                      <span>{grade}</span>
                    </label>
                  ))}
                </div>
              );
            })
          )}
        </div>

        {challengeId && quranTasks.length > 0 && (
          <div className="font-zain">
            <h2 className="font-bold text-gray-800 mb-2">مهمة القرآن</h2>
            {quranTasks.map((task) => (
              <label key={task.id} className="flex items-center gap-2 mb-1">
                <input
                  type="radio"
                  name="quranTask"
                  checked={formData.quranTaskId === task.id}
                  onChange={() => handleQuranTaskSelection(task.id)}
                />
                <span>{task.level}</span>
              </label>
            ))}

            {quranSubLevels.length > 0 && (
              <div className="font-zain mt-4">
                <div className="flex flex-row gap-1">
                  <LiaTasksSolid className="text-green-700" size={25} />
                  <h2 className="font-bold text-green-700 font-zain mb-2">
                    المستويات
                  </h2>
                </div>

                {quranSubLevels.map((task, idx) => (
                  <div
                    key={idx}
                    className="mb-3  p-2 rounded-lg bg-white shadow-sm border-2 border-[#757373]"
                  >
                    <p className="text-green-700 font-semibold font-ruqaa">
                      تاسك {task.challange_task.task_id}
                    </p>
                    <div className="flex flex-col gap-2 mt-2 text-shadow">
                      {task.subLevels.map((lvl) => (
                        <label key={lvl.id} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`task-${task.challange_task.task_id}`}
                            onChange={() =>
                              handleLevelSelection(
                                task.challange_task.task_id,
                                lvl.id
                              )
                            }
                            checked={
                              selectedLevels[task.challange_task.task_id] ===
                              lvl.id
                            }
                          />

                          <span>
                            المستوى {lvl.number_level} (نقاط: {lvl.point})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-4 justify-center mt-6">
        <button
          onClick={handleSubmit}
          className="w-[120px] py-2 text-center bg-[#AFD1BC] text-black font-bold rounded-2xl shadow-lg hover:bg-green-700"
        >
          تسجيل
        </button>

        {challengeId && quranSubLevels.length > 0 && (
          <button
            onClick={handleFinalSubmit}
            className="w-[120px] py-2 text-center bg-green-500 text-white font-bold rounded-2xl shadow-lg hover:bg-green-700"
          >
            حفظ المستويات
          </button>
        )}
      </div>
    </div>
  );
}
