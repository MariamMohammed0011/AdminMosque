import { useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { IoIosTimer } from "react-icons/io";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 

export default function Statistics() {
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());

  const students = [
    {
      name: "عليا",
      quranPages: 20,
      reviewPages: 15,
      attendance: 10,
      programWarnings: 1,
    },
    {
      name: "هدى",
      quranPages: 30,
      reviewPages: 22,
      attendance: 12,
      programWarnings: 0,
    },
  ];
  const today = new Date();
  return (
    <div className=" min-h-screen p-2 ">
     
      <h1 className="text-2xl font-[500] text-center text-gray-800 mb-10 font-zain text-shadow">
        احصائيات الطلبة خلال فترة زمنية محددة
      </h1>
<div className="flex flex-col gap-12">
      <div className="grid grid-cols-3 gap-6 h-[60%]    ">
      
        <div className="col-span-2 bg-white rounded-2xl shadow flex flex-col items-center h-full ">
         
          <div className="flex gap-4 mb-0 w-full justify-between items-start relative">
          
            <div className="flex flex-col items-center  border-none z-10 min-h-[270px] bg-none px-2 py-2">
              <DatePicker
                selected={dateFrom}
                onChange={(date) => setDateFrom(date)}
                highlightDates={[today]}
                inline
                dateFormat="MM/dd/yyyy"
                calendarClassName="!bg-white !p-0 !shadow-none calendar-custom"
                dayClassName={(date) =>
                  date.getDate() === today.getDate() &&
                  date.getMonth() === today.getMonth() &&
                  date.getFullYear() === today.getFullYear()
                    ? "bg-green-300 text-white rounded-full"
                    : undefined
                }
                renderCustomHeader={({
                  date,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 w-[260px] mx-auto">
                    <button
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                      className="border p-1 rounded-md border-black disabled:opacity-30"
                    >
                      <SlArrowLeft className="text-[#55755E]" size={18} />
                    </button>
                    <h3 className="flex-1 text-center font-zain text-[18px] text-gray-800 font-semibold">
                      {date.toLocaleString("ar-EG", { month: "long" })}{" "}
                      {date.getFullYear()}
                    </h3>
                    <button
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                      className="border p-1 rounded-md border-black disabled:opacity-30"
                    >
                      <SlArrowRight className="text-[#55755E]" size={18} />
                    </button>
                  </div>
                )}
              />
            </div>

          
            <div className="w-px bg-gray-400 min-h-[294px] mx-2 absolute left-1/2 top-0 transform -translate-x-1/2 z-0"></div>

          
            <div className="flex flex-col items-center  border-none z-10 min-h-[270px] bg-none px-2 py-2">
              <DatePicker
                selected={dateTo}
                onChange={(date) => setDateTo(date)}
                highlightDates={[today]}
                inline
                dateFormat="MM/dd/yyyy"
                calendarClassName="!bg-white !p-0 !shadow-none calendar-custom"
                dayClassName={(date) =>
                  date.getDate() === today.getDate() &&
                  date.getMonth() === today.getMonth() &&
                  date.getFullYear() === today.getFullYear()
                    ? "bg-green-300 text-white rounded-full"
                    : undefined
                }
                renderCustomHeader={({
                  date,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 w-[260px] mx-auto">
                    <button
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                      className="border p-1 rounded-md border-black disabled:opacity-30"
                    >
                      <SlArrowLeft className="text-[#55755E]" size={18} />
                    </button>
                    <h3 className="flex-1 text-center font-zain text-[18px] text-gray-800 font-semibold">
                      {date.toLocaleString("ar-EG", { month: "long" })}{" "}
                      {date.getFullYear()}
                    </h3>
                    <button
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                      className="border p-1 rounded-md border-black disabled:opacity-30"
                    >
                      <SlArrowRight className="text-[#55755E]" size={18} />
                    </button>
                  </div>
                )}
              />
            </div>
          </div>

         
          <div className="w-full h-px  bg-gray-400 mt-2"></div>
          <div className="flex   justify-between w-full ">
         <div className="flex flex-row gap-4  py-3 px-1">
          <div className=" flex-row gap-4 flex">
            <p className="flex text-xl">from</p>
            <div className="border-2 border-[#97BAA4] rounded-xl flex w-[100px] h-[40px]"></div>
          
          </div>
            <div className=" flex-row gap-4 flex">
            <p className="flex text-xl">to</p>
            <div className="border-2 border-[#97BAA4] rounded-xl flex w-[100px] h-[40px]"></div>
          
          </div>

</div>


 <div className="flex flex-row gap-4  py-3 px-1">
          <div className=" flex-row gap-4 flex ">
           
            <button type="button" className="text-black bg-[#D9D9D9]  text-xl font-zain font-[500] w-[60px] h-[40px] rounded-md shadow text-shadow">cancel</button>
           
          
          </div>
            <div className=" flex-row gap-4 flex">
           <button type="button" className="text-white bg-[#97BAA4]  text-lg font-zain font-[500] w-[80px] h-[40px] rounded-md shadow ">set date</button>
           
          </div>
          
</div>
</div>
        </div>

       
        <div className="bg-white col-span-1  rounded-2xl shadow  flex flex-col pt-4  h-full self-stretch justify-between ">
          <p className="text-center text-[#55755E] text-xl leading-relaxed font-zain mb-4 ">
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

          <div className="flex items-center justify-around py-1  shadow rounded-xl bg-[#AFD1BC]">
            <button className="bg-[#FFF7B8]  text-[#AFD1BC] font-zain mt-3 font-[700] rounded-lg  px-7 ml-2 py-1 hover:bg-green-300  shadow-[3px_3px_3px_rgba(0,0,0,0.3)]">
              فتح
            </button>
            <div className="flex items-center gap-3 text-gray-600 px-7 relative">
              <div className="text-white flex flex-col  text-right  leading-tight px-1 mr-3 mt-3">
                <h3 className="text-xl font-zain">تحديات الطالبة</h3>
                <span className="font-[100] text-xs font-zain">
                  افتح الرابط لرؤية التحديات
                </span>
              </div>

              <IoIosTimer
                size={33}
                className="text-white  absolute right-0  bottom-0"
              />
            </div>
          </div>
        </div>
      </div>

     
       <div className=" bg-white rounded-2xl shadow p-4 overflow-x-auto " dir="rtl">
        <table className="w-full text-right text-gray-700">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2">الاسم</th>
              <th className="px-4 py-2">عدد صفحات القرآن المحفوظة</th>
              <th className="px-4 py-2">عدد صفحات التحديث المحفوظة</th>
              <th className="px-4 py-2">عدد مرات الحضور</th>
              <th className="px-4 py-2">عدد مرات اخطار البرنامج</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, idx) => (
              <tr
                key={idx}
                className="hover:bg-green-50 transition border-b last:border-none"
              >
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.quranPages}</td>
                <td className="px-4 py-2">{s.reviewPages}</td>
                <td className="px-4 py-2">{s.attendance}</td>
                <td className="px-4 py-2">{s.programWarnings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> 
      </div>
    </div>
  );
}
