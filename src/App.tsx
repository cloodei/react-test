import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button";
import { Items, ItemsOmit } from "./types";
import { toast } from "sonner";
import { Check, PencilLine, X } from "lucide-react";
import { Input } from "./components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./components/ui/dialog";
import ds from "@/lib/data"
import Form from "./form";
import List from "./list";

var acc = ds.length + 5;

export default function App() {
  const [datas, setDatas] = useState(ds);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editData, setEditData] = useState<Items | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => setShowAddForm(showEditForm), [showEditForm]);
  

  const addItem = (it: ItemsOmit) => {
    setDatas([...datas, { id: ++acc, ...it }]);
    toast("Đã thêm sách thành công", {
      icon: <Check className="text-green-500" />,
      duration: 2000,
      style: {
        display: "flex",
        gap: "16px",
        alignItems: "center"
      }
    })
  }

  const handleEdit = (it: Items) => {
    setDatas(datas.map(data => data.id === it.id ? it : data));
    setShowEditForm(false);
    setEditData(null);
    toast("Đã chỉnh sửa sách thành công", {
      icon: <PencilLine className="text-yellow-500" />,
      duration: 2000,
      style: {
        display: "flex",
        gap: "16px",
        alignItems: "center"
      }
    })
  }

  const removeItem = (idx: number) => {
    setDatas(datas.filter(data => data.id !== idx));
    toast("Đã xóa sách thành công", {
      icon: <X className="text-red-600" />,
      duration: 2000,
      style: {
        display: "flex",
        gap: "16px",
        alignItems: "center"
      }
    })
  }

  const setEditItem = (it: Items) => {
    setEditData(it);
    setShowEditForm(true);
  }

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between gap-4 py-3 px-6 bg-slate-800 text-white shadow-md">
        <div className="flex items-center gap-5">
          <h1 className="font-semibold md:text-3xl text-xl pb-1 tracking-tight mr-2">Quản lý sách</h1>
          <p className="md:text-base text-sm">Trang chủ</p>
          <p className="md:text-base text-sm">Liên hệ</p>
        </div>

        <div className="flex items-center gap-3">
          <Input placeholder="Tìm sách..." />
          <Button variant="primary">
            Tìm
          </Button>
        </div>
      </header>
      
      <section className="flex pt-2">
        <aside className="space-y-7 py-8 px-5 bg-zinc-300/80 min-w-44 max-sm:hidden">
          <p className="text-lg">Bảng điều khiển</p>
          <p className="text-lg">Danh sách sách</p>
          <p className="text-lg">Thêm mới</p>
          <p className="text-lg">Báo cáo</p>
        </aside>

        <main className="container mx-auto px-6 py-6">
          <List showForm={setShowAddForm} setEditItem={setEditItem} removeItem={removeItem} items={datas} />
        </main>
      </section>

      <Dialog open={showAddForm || showEditForm} onOpenChange={(s) => { showEditForm ? setShowEditForm(s) : setShowAddForm(s) }}>
        <DialogContent className="lg:w-3xl md:w-2xl sm:w-xl w-lg sm:max-w-4xl max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-medium pb-5 border-b border-neutral-400/50">
              {showEditForm ? "Chỉnh sửa sách" : "Thêm sách mới"}
            </DialogTitle>
          </DialogHeader>

          <Form
            editData={showEditForm ? editData : null}
            setShowForm={showEditForm ? setShowEditForm : setShowAddForm}
            addItem={addItem}
            handleEdit={handleEdit}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
