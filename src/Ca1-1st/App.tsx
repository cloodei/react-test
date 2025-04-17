import { useState } from "react"
import { Button } from "@/components/ui/button";
import { PhoneBookOmit } from "./types";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import ds from "@/lib/data6.json";
import Form from "./form";
import List from "./List";

var acc = ds.length + 5;

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [datas, setDatas] = useState(ds);

  const addPhonebook = (pb: PhoneBookOmit) => {
    setDatas([...datas, { id: ++acc, ...pb }]);
    toast("Đã thêm mới danh bạ thành công", {
      icon: <Check className="text-green-400/85" />,
      duration: 2000
    })
  }

  const removePhonebook = (idx: number) => {
    toast("Đã xóa danh bạ thành công", {
      icon: <X className="text-red-500/90 mt-1" />
    })
    setDatas(datas.filter(data => data.id !== idx));
  }

  return (
    <div className="min-h-screen bg-neutral-200">
      {showForm ? (
        <Form addPhonebook={addPhonebook} setShowForm={setShowForm} />
      ) : (
        <List removePhonebook={removePhonebook} phonebooks={datas} />
      )}
      
      <Button className="fixed bottom-0.5 right-2.5" onClick={() => setShowForm(!showForm)}>....</Button>
    </div>
  )
}
