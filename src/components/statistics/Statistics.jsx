import { useEffect, useState } from "react";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { IoIosTimer } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Statistics() {
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const today = new Date();

  const fetchStatistics = async (from, to) => {
    try {
      setLoading(true);
      const fromDate = from.toISOString().split("T")[0];
      const toDate = to.toISOString().split("T")[0];

      const token = localStorage.getItem("token");

      const res = await fetch(`/api/Statistics/statisticsForAdmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fromDate, toDate }),
      });

      if (!res.ok) {
        console.error("HTTP error:", res.status, res.statusText);
        return;
      }

      const data = await res.json();

      if (data.result) {
        const mapped = data.result.map((item) => ({
          name: `${item.studentInf.firstName.trim()} ${item.studentInf.lastName.trim()}`,
          quranPages: item.savedQuran,
          reviewPages: item.savedHadith,
          attendance: item.attendance,
          programWarnings: 0,
        }));
        setStudents(mapped);
      }
    } catch (err) {
      console.error("Error fetching statistics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics(dateFrom, dateTo);
  }, []);

  return (
    <div className="min-h-screen p-3 sm:p-4">
      <h1 className="text-xl sm:text-2xl font-[500] text-center text-gray-800 mb-6 sm:mb-10 font-zain text-shadow">
        احصائيات الطلبة خلال فترة زمنية محددة
      </h1>

      {/* قسم اختيار التاريخين */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* الأعمدة الأولى والثانية: التقويمين */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow flex flex-col items-center h-full p-2 sm:p-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-between items-center relative">
            {/* من تاريخ */}
            <div className="flex flex-col items-center z-10">
              <DatePicker
                selected={dateFrom}
                onChange={(date) => setDateFrom(date)}
                inline
                highlightDates={[today]}
                dateFormat="MM/dd/yyyy"
                calendarClassName="!bg-white !p-0 !shadow-none calendar-custom"
                renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                  <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 w-[260px] mx-auto">
                    <button
                      onClick={decreaseMonth}
                      className="border p-1 rounded-md border-black"
                    >
                      <SlArrowLeft className="text-[#55755E]" size={18} />
                    </button>
                    <h3 className="flex-1 text-center font-zain text-[16px] sm:text-[18px] text-gray-800 font-semibold">
                      {date.toLocaleString("ar-EG", { month: "long" })}{" "}
                      {date.getFullYear()}
                    </h3>
                    <button
                      onClick={increaseMonth}
                      className="border p-1 rounded-md border-black"
                    >
                      <SlArrowRight className="text-[#55755E]" size={18} />
                    </button>
                  </div>
                )}
              />
            </div>

            {/* الفاصل */}
            <div className="hidden sm:block w-px bg-gray-400 min-h-[294px] mx-2"></div>

            {/* إلى تاريخ */}
            <div className="flex flex-col items-center z-10">
              <DatePicker
                selected={dateTo}
                onChange={(date) => setDateTo(date)}
                inline
                highlightDates={[today]}
                dateFormat="MM/dd/yyyy"
                calendarClassName="!bg-white !p-0 !shadow-none calendar-custom"
                renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                  <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 w-[260px] mx-auto">
                    <button
                      onClick={decreaseMonth}
                      className="border p-1 rounded-md border-black"
                    >
                      <SlArrowLeft className="text-[#55755E]" size={18} />
                    </button>
                    <h3 className="flex-1 text-center font-zain text-[16px] sm:text-[18px] text-gray-800 font-semibold">
                      {date.toLocaleString("ar-EG", { month: "long" })}{" "}
                      {date.getFullYear()}
                    </h3>
                    <button
                      onClick={increaseMonth}
                      className="border p-1 rounded-md border-black"
                    >
                      <SlArrowRight className="text-[#55755E]" size={18} />
                    </button>
                  </div>
                )}
              />
            </div>
          </div>

          {/* الأزرار */}
          <div className="w-full h-px bg-gray-400 mt-3"></div>
          <div className="flex justify-between w-full px-4 py-3">
            <button
              type="button"
              className="text-black bg-[#D9D9D9] text-base sm:text-xl font-zain font-[500] w-[80px] h-[40px] rounded-md shadow"
              onClick={() => {
                setDateFrom(new Date());
                setDateTo(new Date());
              }}
            >
              إلغاء
            </button>
            <button
              type="button"
              className="text-white bg-[#97BAA4] text-base sm:text-lg font-zain font-[500] w-[100px] h-[40px] rounded-md shadow"
              onClick={() => fetchStatistics(dateFrom, dateTo)}
            >
              بحث
            </button>
          </div>
        </div>

        {/* العمود الثالث: الآية */}
        <div className="bg-white rounded-2xl shadow flex flex-col pt-4 justify-between text-center lg:col-span-1 p-3">
          <p className="text-[#55755E] text-lg sm:text-xl leading-relaxed font-zain mb-4">
            سابِقُوا إِلَى مَغْفِرَةٍ مِّن رَّبِّكُمْ
            <br />
            وَجَنَّةٍ
            <br />
            عَرْضُهَا كَعَرْضِ السَّمَاءِ
            <br />
            وَالْأَرْضِ أُعِدَّتْ لِّلَّذِينَ آمَنُوا بِاللَّهِ
            <br />
            وَرُسُلِهِ ۚ
            <br />
            ذَٰلِكَ فَضْلُ اللَّهِ يُؤْتِيهِ مَن يَشَاءُ ۚ
            <br />
            وَاللَّهُ ذُو الْفَضْلِ الْعَظِيمِ
          </p>
        </div>
      </div>

      {/* الجدول */}
      <div
        className="bg-white rounded-2xl shadow p-3 sm:p-4 overflow-x-auto mt-10"
        dir="rtl"
      >
        <table className="w-full text-right text-gray-700 text-sm sm:text-base">
          <thead>
            <tr className="border-b">
              <th className="px-2 sm:px-4 py-2 font-ruqaa font-[500] text-shadow text-[#55755E] text-center">
                الاسم
              </th>
              <th className="px-2 sm:px-4 py-2 font-ruqaa font-[500] text-shadow text-[#55755E] text-center">
                عدد صفحات القرآن
              </th>
              <th className="px-2 sm:px-4 py-2 font-ruqaa font-[500] text-shadow text-[#55755E] text-center">
                عدد صفحات الحديث
              </th>
              <th className="px-2 sm:px-4 py-2 font-ruqaa font-[500] text-shadow text-[#55755E] text-center">
                عدد مرات الحضور
              </th>
              <th className="px-2 sm:px-4 py-2 font-ruqaa font-[500] text-shadow text-[#55755E] text-center">
                اخطار البرنامج
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  جاري تحميل البيانات...
                </td>
              </tr>
            ) : students.length > 0 ? (
              students.map((s, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-green-50 transition border-b last:border-none"
                >
                  <td className="px-2 sm:px-4 py-2 text-center text-[#55755E]">
                    {s.name}
                  </td>
                  <td className="px-2 sm:px-4 py-2 text-center text-[#55755E]">
                    {s.quranPages}
                  </td>
                  <td className="px-2 sm:px-4 py-2 text-center text-[#55755E]">
                    {s.reviewPages}
                  </td>
                  <td className="px-2 sm:px-4 py-2 text-center text-[#55755E]">
                    {s.attendance}
                  </td>
                  <td className="px-2 sm:px-4 py-2 text-center text-[#55755E]">
                    {s.programWarnings}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  لا توجد بيانات لعرضها
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
