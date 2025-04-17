import { useState } from "react"
import ds from "@/lib/data7.json"
import Form from "./form";
import List from "./list";
import { Button } from "@/components/ui/button";
import { Items, ItemsOmit } from "./types";
import { toast } from "sonner";
import { Check, PencilLine, X } from "lucide-react";

var acc = ds.length + 5;

export default function App() {
  const [datas, setDatas] = useState(ds);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<Items | null>(null);

  const addItem = (it: ItemsOmit) => {
    setDatas([...datas, { id: ++acc, ...it }]);
    toast("Đã thêm sản phẩm thành công", {
      icon: <Check className="pt-1 text-green-400" />,
      duration: 2000,
      style: {
        display: "flex",
        gap: "12px",
        boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 20px;"
      }
    })
  }

  const handleEdit = (it: Items) => {
    setDatas(datas.map(data => data.id === it.id ? it : data));
    toast("Đã chỉnh sửa sản phẩm thành công", {
      icon: <PencilLine className="pt-1 text-yellow-400" />,
      duration: 2000,
      style: {
        display: "flex",
        gap: "12px",
        boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 20px;"
      }
    })
  }

  const removeItem = (idx: number) => {
    setDatas(datas.filter(data => data.id !== idx));
    toast("Đã xóa sản phẩm thành công", {
      icon: <X className="pt-1 text-red-500/85" />,
      duration: 2000,
      style: {
        display: "flex",
        gap: "12px",
        boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 20px;"
      }
    })
  }

  const editItem = (it: Items) => {
    setEditData(it);
    setShowForm(true);
  }

  return (
    <div className="min-h-screen">
      <header className="bg-gray-200 border-b border-b-gray-300 flex items-center p-2 justify-between">
        <h1 className="text-2xl font-medium text-gray-950/80 pb-1 pl-1">Product Management</h1>

        {showForm ? null : (
          <div>
            <Button className="bg-transparent border-gray-400 text-gray-500 mr-4">Filter</Button>
            <Button variant="primary" className="font-normal" onClick={() => setShowForm(true)}>+ Add Product</Button>
          </div>
        )}
      </header>
      
      {showForm ? (
        <Form editData={editData} handleEdit={handleEdit} addItem={addItem} setShowForm={setShowForm} />
      ) : (
        <List edititem={editItem} removeItem={removeItem} items={datas} />
      )}
    </div>
  )
}
