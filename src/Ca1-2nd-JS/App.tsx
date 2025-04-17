import { useState } from "react"
import data from "@/lib/data4.json";
import List from "./list";
import Form from "./form";
import { User } from "./types";
import { toast } from "sonner";
import { Check, X } from "lucide-react";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [datas, setDatas] = useState(data);

  const addUser = (u: User) => {
    setDatas([...datas, u])
    toast("Đã đăng ký người dùng mới", {
      icon: <Check className="text-emerald-600" />,
      duration: 2250
    });
  }

  const removeUser = (idx: number) => {
    setDatas(datas.filter((_, i) => i !== idx));
    toast("Đã xóa người dùng thành công", {
      icon: <X className="text-red-500" />,
      duration: 2250
    });
  }

  return (
    <div className="py-4 min-h-screen">
      {!showForm ? (
        <List removeUser={removeUser} setShowForm={setShowForm} users={datas} />
      ) : (
        <Form setShowForm={setShowForm} addUser={addUser} />
      )}
    </div>
  )
}
