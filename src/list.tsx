import { Button } from "@/components/ui/button"
import { Items } from "./types"
import { useState } from "react"
import { Trash2, AlertTriangle, Pencil, Plus } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function List({ items, removeItem, setEditItem, showForm }: {
  items: Items[],
  removeItem: (idx: number) => void,
  setEditItem: (it: Items) => void,
  showForm: (s: boolean) => void
}) {
  const [open, setOpen] = useState(false);
  const [delID, setDelID] = useState(0);

  const handleRemove = (id: number) => {
    setDelID(id);
    setOpen(true);
  }

  const remove = () => {
    removeItem(delID);
    setOpen(false);
  }

  return (
    <>
      <main className="pt-2">
        <div className="flex items-center py-7 justify-between">
          <h1 className="md:text-3xl text-xl font-semibold">Danh sách sách trong kho</h1>
          <Button variant="primary" className="md:gap-2 gap-0.5 max-md:text-sm" onClick={() => showForm(true)}>
            <Plus />
            Thêm sách mới
          </Button>
        </div>

        <table className="w-full border rounded-lg border-collapse border-gray-300">
          <thead>
            <tr className="border rounded-lg border-collapse border-gray-300">
              <td className="border font-semibold rounded-lg py-1 px-2 border-collapse border-gray-300">STT</td>
              <td className="border font-semibold rounded-lg p-1.5 border-collapse border-gray-300">Tên sách</td>
              <td className="border font-semibold rounded-lg p-1.5 border-collapse border-gray-300">Danh mục</td>
              <td className="border font-semibold rounded-lg p-1.5 border-collapse border-gray-300">Nội dung</td>
              <td className="border font-semibold rounded-lg p-1.5 border-collapse border-gray-300">Chủ đề</td>
              <td className="border font-semibold rounded-lg p-1.5 border-collapse border-gray-300">Hành động</td>
            </tr>
          </thead>

          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border rounded-lg border-collapse border-gray-300">
                <th className="border px-2 border-collapse border-gray-300">{i + 1}</th>
                <td className="border rounded-lg p-1.5 border-collapse border-gray-300">{item.name}</td>
                <td className="border rounded-lg p-1.5 border-collapse border-gray-300">{item.category}</td>
                <td className="border rounded-lg p-1.5 border-collapse border-gray-300">{item.content}</td>
                <td className="border rounded-lg p-1.5 border-collapse border-gray-300">{item.topic}</td>
                <td className="border rounded-lg p-1.5 border-collapse border-gray-300">
                  <Button className="mr-2 bg-yellow-500 hover:bg-yellow-600" onClick={() => setEditItem(item)}>
                    <Pencil className="max-md:hidden" />
                    Sửa
                  </Button>
                  <Button variant="destructive" onClick={() => handleRemove(item.id)}>
                    <Trash2 className="max-md:hidden" />
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Xác nhận xóa sách
            </DialogTitle>
            <DialogDescription className="pt-2 text-slate-600">
              Bạn có chắc chắn muốn xóa sách hiện tại?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" className="border-neutral-400/65">Hủy</Button>
            </DialogClose>

            <Button onClick={remove} variant="destructive">
              <Trash2 className="mr-1.5" />
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
