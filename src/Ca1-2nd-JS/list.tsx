import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Button } from "../components/ui/button"
import { User } from "./types"
import { useState } from "react"

type ListType = {
  users: User[],
  setShowForm: (s: boolean) => void,
  removeUser: (idx: number) => void
}

export default function List({ users, setShowForm, removeUser }: ListType) {
  const [open, setOpen] = useState(false);
  const [delID, setDelID] = useState(0);

  const handleOpen = (id: number) => {
    setDelID(id);
    setOpen(true);
  }

  const handleRemove = () => {
    removeUser(delID);
    setDelID(0);
    setOpen(false);
  }

  return (
    <>
      <main className="container mx-auto px-4">
        <h1 className="text-3xl font-medium mt-4">Danh sách Người dùng</h1>

        <table className="w-full border mt-6 border-collapse border-gray-400/60">
          <thead>
            <tr className="border border-collapse border-gray-400/60">
              <td className="font-semibold p-1 pl-2 border border-collapse border-gray-400/60">#</td>
              <td className="font-semibold p-1 pl-2 border border-collapse border-gray-400/60">Tên</td>
              <td className="font-semibold p-1 pl-2 border border-collapse border-gray-400/60">Email</td>
              <td className="font-semibold p-1 pl-2 border border-collapse border-gray-400/60">Giới tính</td>
              <td className="font-semibold p-1 pl-2 border border-collapse border-gray-400/60">Hành động</td>
            </tr>
          </thead>

          <tbody>
            {users.map((user, i) => (
              <tr className="border border-collapse border-gray-400/60" key={i}>
                <td className="p-1 pl-2 border border-collapse border-gray-400/60">{i + 1}</td>
                <td className="p-1 pl-2 border border-collapse border-gray-400/60">{user.name}</td>
                <td className="p-1 pl-2 border border-collapse border-gray-400/60">{user.email}</td>
                <td className="p-1 pl-2 border border-collapse border-gray-400/60">{user.gender ? "Nữ" : "Nam"}</td>
                <td className="p-1 pl-2 border border-collapse border-gray-400/60">
                  <Button variant="destructive" onClick={() => handleOpen(i)}>Xóa</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Button onClick={() => setShowForm(true)} className="mt-8 px-5">Đăng ký người dùng</Button>
      </main>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>
            <h1 className="text-red-500 text-2xl font-medium">Xóa người dùng</h1>
          </DialogTitle>

          Bạn có muốn xóa người dùng hiện tại?

          <DialogFooter>
            <Button className="border-none" variant="destructive" onClick={handleRemove}>Xóa</Button>

            <DialogClose asChild>
              <Button className="border-none">Hủy</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
