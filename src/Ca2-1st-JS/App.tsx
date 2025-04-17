import { useState } from "react"
import { Student } from "./types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, Pencil, X } from "lucide-react";
import ds from "@/lib/data8.json"
import Form from "./form";
import List from "./list";

export default function App() {
  const [datas, setDatas] = useState(ds);
  const [showForm, setShowAddForm] = useState(false);
  const [editData, setEditData] = useState<Student>();
  const [showEditForm, setShowEditForm] = useState(false);

  const addStudent = (s: Student) => {
    setDatas([...datas, s]);
    toast("Đã thêm mới sinh viên", {
      icon: <Check className="text-green-400" />,
      duration: 2000,
      style: {
        display: "flex",
        gap: "16px",
        alignItems: "center"
      }
    })
  }

  const removeStudent = (idx: string) => {
    setDatas(datas.filter(data => data.id !== idx));
    toast("Đã xóa sinh viên thành công", {
      icon: <X className="text-red-500" />,
      duration: 2000,
      style: {
        display: "flex",
        gap: "16px",
        alignItems: "center"
      }
    })
  }

  const handleOpenEdit = (s: Student) => {
    setEditData(s);
    setShowAddForm(true);
    setShowEditForm(true);
  }

  const editStudent = (s: Student) => {
    setDatas(datas.map(data => data.id === s.id ? s : data));
    setEditData(undefined);
    setShowAddForm(false);
    setShowEditForm(false);
    toast("Đã chỉnh sửa thông tin sinh viên thành công", {
      icon: <Pencil className="text-yellow-500" />,
      duration: 2000,
      style: {
        display: "flex",
        gap: "16px",
        alignItems: "center"
      }
    })
  }

  const closeEditForm = (_: boolean) => {
    setShowAddForm(false);
    setShowEditForm(false);
  }

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between gap-3 py-1.5 px-4 bg-gray-200">
        <h1 className="font-medium text-2xl tracking-tight pb-1.5">Student Management</h1>

        {!showForm ? (
          <div className="flex items-center gap-3">
            <Button disabled className="bg-transparent hover:bg-transparent text-gray-600 border-gray-400">Filter</Button>
            <Button variant="primary" onClick={() => setShowAddForm(true)}>+ Add Student</Button>
          </div>
        ) : null}
      </header>

      {showForm ? (
        <Form
          setShowForm={showEditForm ? closeEditForm : setShowAddForm}
          addStudent={showEditForm ? editStudent : addStudent}
          editData={showEditForm ? editData : undefined}
        />
      ) : (
        <List handleOpenEdit={handleOpenEdit} removeStudent={removeStudent} students={datas} />
      )}
    </div>
  )
}
