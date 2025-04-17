import { useState } from "react";
import { EditType, EventType } from "./types";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import Form from "./form";
import List from "./list";
import stats from "@/lib/data5.json"


export default function App() {
  const [datas, setDatas] = useState(stats);
  const [editData, setEditData] = useState<EditType | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);

  const addEvent = (ev: EventType) => {
    setDatas([...datas, ev])
    toast("Đã thêm sự kiện thành công", {
      icon: <Check className="text-emerald-400" />,
      duration: 2000
    })
  }

  const removeEvent = (idx: number) => {
    setDatas(datas.filter((_, i) => i !== idx));
    toast("Đã xóa sự kiện thành công", {
      icon: <X className="text-red-500" />,
      duration: 2000
    })
  }

  const editEvent = (e: EditType) => {
    setDatas(datas.map((data, i) => (i === e.id) ? e : data))
  }

  const handleEdit = (e: EditType) => {
    setEditData(e);
    setShowForm(true);
  }

  const handleShowAddForm = () => {
    setEditData(undefined);
    setShowForm(true);
  }

  return (
    <>
      <div className="min-h-screen">
        {showForm ? (
          <Form editEvent={editEvent} addEvent={addEvent} setShowForm={setShowForm} editData={editData} />
        ) : (
          <List handleEdit={handleEdit} removeEvent={removeEvent} handleShowForm={handleShowAddForm} events={datas} />
        )}
      </div>
    </>
  );
}
