import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { TbPencilStar } from "react-icons/tb";
import { RiFileList3Line } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbBookmarkEdit } from "react-icons/tb";
import { PiBookOpenTextThin } from "react-icons/pi";
import { toast } from "sonner";
import {
  notifySuccess,
  notifyError,
  notifyInfo,
} from "../../utils/toastNotifications.jsx";

export default function Circles() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    name: "",
    hadith_num: "",
  });
  const [editBookId, setEditBookId] = useState(null);
  const [circles, setCircles] = useState([]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   const fetchCircles = async () => {
  //     try {
  //       const res = await fetch("/api/circle/showAll", {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const data = await res.json();
  //       setCircles(data.circles || []);
  //     } catch (err) {
  //       console.error("Error fetching circles:", err);
  //     }
  //   };

  //   const fetchBooks = async () => {
  //     try {
  //       const response = await fetch("/api/hadith-book/getAllBook", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const result = await response.json();
  //       setBooks(result.data || []);
  //     } catch (err) {
  //       console.error("خطأ أثناء جلب الكتب:", err);
  //     }
  //   };

  //   fetchCircles();
  //   fetchBooks();
  // }, []);


const token = localStorage.getItem("token");

const fetchCircles = async () => {
  try {
    const res = await fetch("/api/circle/showAll", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setCircles(data.circles || []);
  } catch (err) {
    console.error("Error fetching circles:", err);
  }
};

const fetchBooks = async () => {
  try {
    const response = await fetch("/api/hadith-book/getAllBook", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    setBooks(result.data || []);
  } catch (err) {
    console.error("خطأ أثناء جلب الكتب:", err);
  }
};

useEffect(() => {
  fetchCircles();
  fetchBooks();
  const interval = setInterval(() => {
    fetchBooks();
    fetchCircles();
  }, 5000); // كل 5 ثواني تحدث البيانات
 return () => clearInterval(interval);
}, []);








  const handleSubmit = async () => {
    if (!newBook.name.trim()) {
      notifyError("يرجى إدخال اسم الكتاب");
      return;
    }

    if (newBook.hadith_num === 0) {
      notifyError("يرجى ادخال عدد الأحاديث");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/hadith-book/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBook),
      });

      const result = await response.json();
      if (response.ok) {
  notifySuccess("تم إنشاء الكتاب بنجاح!");
  setBooks((prev) => [...prev, result.data]);
  setNewBook({ name: "", hadith_num: "" });
  fetchBooks(); // 👈 أضفناها هون
} else {
  notifyError("فشل في الإرسال:");
}

    } catch (error) {
      notifyError("حدث خطأ في الاتصال بالخادم");
    }
  };

  const handleDeleteCircle = (id) => {
    toast.custom((t) => (
      <div className="relative w-[300px] p-4 bg-[#D6E6DB] border border-[#AFD1BC] rounded-2xl shadow-lg text-[#2A603F]">
        <div className="text-sm font-medium py-1 mb-3 text-right">
          هل أنت متأكد من حذف الحلقة؟
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 bg-white border border-[#AFD1BC] text-[#2A603F] rounded-lg hover:bg-[#AFD1BC] hover:text-white transition"
            onClick={() => toast.dismiss(t)}
          >
            لا
          </button>

          <button
            className="px-3 py-1 bg-[#2A603F] text-white rounded-lg hover:bg-[#245138] transition"
            onClick={async () => {
              toast.dismiss(t);
              try {
                const token = localStorage.getItem("token");
                const res = await fetch(`/api/circle/deleteCircle/${id}`, {
                  method: "DELETE",
                  headers: { Authorization: `Bearer ${token}` },
                });

                if (res.ok) {
                  setCircles((prev) => prev.filter((c) => c.id !== id));
                  notifySuccess("تم حذف الحلقة ✅");
                } else {
                  notifyError("فشل الحذف ❌");
                }
              } catch (err) {
                notifyError("حدث خطأ أثناء الحذف ❌");
              }
            }}
          >
            نعم
          </button>
        </div>

        <IoCloseOutline
          toastInstance={t}
          className="absolute top-2 left-2 text-[#2A603F] hover:text-[#245138] cursor-pointer"
          size={20}
        />
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-6 bg-[#FBFAF8] p-2 sm:p-4">
      {/* العنوان */}
      <div className="bg-[#97BAA4] rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center shadow gap-4 sm:gap-0">
        <img
          src="../../public/lab.png"
          alt="circles illustration"
          className="w-36 sm:w-52 object-contain"
        />
        <div className="text-center font-zain m-auto">
          <h2 className="text-lg sm:text-xl text-white mb-4">
            أنشئ حلقة جديدة وخصص لها المعلمين والطلبة
          </h2>
          <button
            className="border-white border text-white px-8 sm:px-10 py-1 font-ruqaa rounded-lg shadow hover:bg-[#AFD1BC] transition"
            onClick={() => navigate("/createCircle")}
          >
            إنشاء حلقة
          </button>
        </div>
      </div>

      {/* المحتوى */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* القسم الأيسر */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-5 bg-[#FBFAF8] rounded-xl p-4">
          {/* إدخال كتاب */}
          <div className="flex-1 px-3 rounded-xl py-3 bg-white shadow">
            <div className="flex flex-row gap-2 text-center justify-center mb-6">
              <h3 className="font-[300] text-[#2A603F] text-shadow">إضافة كتاب حديث</h3>
              <RiFileList3Line className="text-[#2A603F]" size={23} />
            </div>

            <input
              type="text"
              placeholder="اسم الكتاب"
              value={newBook.name}
              onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
              className="w-full rounded-lg px-5 py-1 mb-6 text-right bg-[#FBFAF8] font-zain drop-shadow-black"
            />

            <div className="flex flex-col sm:flex-row mb-8 justify-start gap-2 w-full">
              <input
                type="number"
                value={newBook.hadith_num}
                onChange={(e) =>
                  setNewBook({ ...newBook, hadith_num: e.target.value })
                }
                className="w-full sm:w-[30%] px-1 py-1 border rounded-md font-zain text-center drop-shadow-black"
              />
              <span className="text-shadow text-right px-1 text-sm sm:text-base">
                إدخال عدد الأحاديث
              </span>
            </div>

            <div className="text-center flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleSubmit}
                className="bg-[#AFD1BC] text-white px-1 py-1 rounded-lg shadow w-full sm:w-[60%] mx-auto font-zain font-[100]"
              >
                إضافة
              </button>
              {editBookId && (
                <button
                  onClick={() => handleEdit(editBookId)}
                  className="bg-[#2A603F] text-white px-1 py-1 rounded-lg shadow w-full sm:w-[30%] mx-auto font-zain"
                >
                  تعديل
                </button>
              )}
            </div>
          </div>

          {/* عرض الكتب */}
          <div className="flex-1 px-3 rounded-xl py-3 bg-white shadow">
            <h3 className="font-[300] font-zain text-center text-[#2A603F] text-shadow mt-1 mb-5">
              كتب الحديث المدخلة
            </h3>

            <div
              className="py-3 flex flex-col gap-2 custom-scroll overflow-y-auto pr-2 bg-[#FBFAF8] rounded-lg shadow px-1"
              style={{ maxHeight: "250px" }}
            >
              {books.map((book) => (
                <div
                  key={book.id}
                  className="flex flex-row justify-between items-center border rounded-lg px-4 py-2 shadow-sm"
                >
                  <PiBookOpenTextThin className="text-gray-700" size={29} />
                  <div className="flex flex-col items-end max-w-[80%]">
                    <span className="block text-gray-700 text-right font-[300] font-zain truncate">
                      {book.name}
                    </span>
                    <span className="text-xs text-gray-400 mb-3">
                      عدد الأحاديث: {book.hadith_num}
                    </span>
                    <span className="text-xs text-gray-400 flex flex-row gap-4">
                      <button onClick={() => handleDelete(book.id)}>
                        <RiDeleteBin6Line className="text-[#2A603F]" size={14} />
                      </button>
                      <button
                        onClick={() => {
                          setNewBook({
                            name: book.name,
                            hadith_num: book.hadith_num,
                          });
                          setEditBookId(book.id);
                        }}
                      >
                        <TbBookmarkEdit className="text-[#2A603F]" size={14} />
                      </button>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* القسم الأيمن */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl shadow p-4">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 custom-scroll overflow-y-auto pr-2"
            style={{ maxHeight: "500px" }}
          >
            {circles.map((circle) => (
              <div
                key={circle.id}
                className="bg-[#EBF3EC] rounded-3xl shadow-lg p-3 text-right hover:bg-[#E6F4EA] transition"
              >
                <div className="text-center flex flex-row gap-3 align-middle items-center justify-center mb-6">
                  <h3 className="font-[400] text-[#2A603F] text-shadow">
                    {circle.name}
                  </h3>
                  <TbPencilStar className="text-[#2A603F]" size={26} />
                </div>
                <div className="flex flex-col gap-3 pr-5 py-3 font-zain mb-1">
                  <p>
                    بإشراف المعلمة:{" "}
                    {circle.teachers?.length > 0
                      ? `${circle.teachers[0].first_name} ${circle.teachers[0].last_name}`
                      : "—"}
                  </p>

                  <p>عدد الطلاب بالحلقة : {circle.students.length}</p>
                  <p>وصف الحلقة : {circle.description}</p>
                  <div className="flex flex-row gap-4 items-start justify-end mt-4">
                    <button onClick={() => handleDeleteCircle(circle.id)}>
                      <RiDeleteBin6Line className="text-[#2A603F]" size={16} />
                    </button>

                    <button
                      onClick={() => navigate(`/createCircle/${circle.id}`)}
                    >
                      <TbBookmarkEdit className="text-[#2A603F]" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
