import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { notifySuccessWithIcon } from "../utils/notifySuccessWithIcon ";

export default function LoginAdmin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mosque_code: "",
    code_user: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mosque_code: formData.mosque_code,
          code_user: formData.code_user,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSuccess(false);
        setMessage(data.message || "فشل تسجيل الدخول");
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);

        localStorage.setItem("userData", JSON.stringify(data));
        localStorage.setItem("mosque_id", data.mosque_id);
      }

      setSuccess(true);
      setMessage("تم تسجيل الدخول بنجاح!");
      setFormData({ mosque_code: "", code_user: "" });

      notifySuccessWithIcon("تم تسجيل الدخول بنجاح!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error:", err);
      setSuccess(false);
      setMessage("حدث خطأ أثناء تسجيل الدخول");
    }
  };

  return (
  <section className="min-h-screen flex items-center justify-center font-mono bg-gradient-to-r from-[#AFD1BC] via-[#8FB8A4] to-[#E8F0EF] p-4 sm:p-0">
  <div className="flex flex-col items-center justify-center w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
    <div className="flex gap-3 flex-row-reverse text-right align-middle mx-auto mb-4">
      <AiOutlineLogin
        className="mt-2 text-[#2A603F]"
        size={29}
      />
      <h1 className="text-2xl sm:text-3xl font-bold text-[#2A603F] font-ruqaa">
        ادخال حساب مشرف الجامع
      </h1>
    </div>

    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="flex flex-col text-right">
        <label className="text-[#2A603F] font-zain">كود الجامع</label>
        <input
          type="text"
          name="mosque_code"
          value={formData.mosque_code}
          onChange={handleChange}
          required
          className="rounded-md p-2 border-2 outline-none focus:border-[#AFD1BC] focus:bg-[#EBF3EC]"
        />
      </div>

      <div className="flex flex-col text-right">
        <label className="text-[#2A603F] font-zain">كود الأدمن</label>
        <input
          type="text"
          name="code_user"
          value={formData.code_user}
          onChange={handleChange}
          required
          className="rounded-md p-2 border-2 outline-none focus:border-[#AFD1BC] focus:bg-[#EBF3EC]"
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-2 text-xl rounded-md bg-gradient-to-r from-[#AFD1BC] via-[#8FB8A4] to-[#E8F0EF] text-white font-ruqaa hover:from-[#AFD1BC] hover:to-[#AFD1BC]"
      >
        دخول
      </button>
    </form>

    {message && (
      <div
        className={`font-ruqaa text-center mt-4 ${
          success ? "text-green-600" : "text-red-500"
        }`}
      >
        {message}
      </div>
    )}
  </div>
</section>

  );
}
