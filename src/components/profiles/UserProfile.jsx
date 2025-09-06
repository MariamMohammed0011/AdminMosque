import { useEffect, useState } from "react";
import {
  FaUserTie,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaMosque,
  FaBookOpen,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ProfileItem from "./ProfileItem.jsx";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Fetching user with id:", id);
        const res = await fetch(`/api/user/showUserById/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return (
      <div className="p-6 text-center text-red-600 font-bold">
        لا يوجد بيانات المستخدم ⚠️
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#AFD1BC] via-[#8FB8A4] to-[#E8F0EF] px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-[420px] text-right font-ruqaa relative overflow-hidden group">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 left-3 text-[#2A603F] hover:text-[#1e422c] transition z-50"
        >
          <IoReturnUpBackOutline size={32} />
        </button>

        <div className="absolute -top-16 -left-16 w-40 h-40 bg-[#AFD1BC] rounded-full opacity-20 group-hover:scale-110 transition-transform duration-500"></div>
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-[#2A603F] rounded-full opacity-20 group-hover:scale-110 transition-transform duration-500"></div>

        <div className="flex justify-center mb-6 ">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#2A603F] to-[#AFD1BC] flex items-center justify-center shadow-lg">
            <FaUserTie className="text-white" size={40} />
          </div>
        </div>

        <div className="space-y-4 text-right">
          <ProfileItem
            icon={<FaUserTie />}
            label="الاسم"
            value={`${user.first_name} ${user.last_name}`}
          />
          <ProfileItem icon={<MdEmail />} label="الإيميل" value={user.email} />
          <ProfileItem
            icon={<FaPhoneAlt />}
            label="الهاتف"
            value={user.phone}
          />
          <ProfileItem
            icon={<FaPhoneAlt />}
            label="هاتف الأب"
            value={user.father_phone}
          />
          <ProfileItem
            icon={<FaMapMarkerAlt />}
            label="العنوان"
            value={user.address}
          />
          <ProfileItem
            icon={<FaMosque />}
            label="المسجد"
            value={user.mosque_id}
          />
          <ProfileItem
            icon={<FaBookOpen />}
            label="عدد الأجزاء المحفوظة"
            value={user.memorized_parts}
          />
          <ProfileItem
            icon={<FaUserTie />}
            label="الدور"
            value={user.role_id === 1 ? "طالب" : "معلم"}
          />
          <ProfileItem
            icon={<FaBookOpen />}
            label="حافظ للقرآن"
            value={user.is_save_quran ? "نعم" : "لا"}
          />
        </div>
      </div>
    </section>
  );
}
