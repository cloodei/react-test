import { Button } from "@/components/ui/button"
import { Student } from "./types"
import { useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";

export default function List({ students, removeStudent, handleOpenEdit }: {
  students: Student[],
  removeStudent: (id: string) => void,
  handleOpenEdit: (s: Student) => void
}) {
  const [open, setOpen] = useState(false);
  const [delID, setDelID] = useState("");

  const handleOpen = (id: string) => {
    setDelID(id);
    setOpen(true);
  }

  const handleRemove = () => {
    removeStudent(delID);
    setOpen(false);
  }

  return (
    <>
      <main className="container mx-auto lg:px-8 px-4 py-6">
        {students.map((student, i) => (
          <div
            key={i}
            className={"py-3 flex items-center justify-between" + ((i === students.length - 1) ? "" : " border-b border-gray-200")}
          >
            <div>
              <p className="text-xl font-medium">{student.name}</p>
              <p className="text-neutral-500/90 mb-1.5">
                Mã SV: {student.id} | Email: {student.email} | SĐT: {student.phone}
              </p>
              <p>Ngành: {student.major} | Giới tính: {student.gender ? "Nữ" : "Nam"}</p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                className="border-none bg-yellow-400 hover:bg-yellow-500 text-gray-950/90"
                onClick={() => handleOpenEdit(student)}
              >
                Sửa
              </Button>
              <Button variant="destructive" className="border-none" onClick={() => handleOpen(student.id)}>Xóa</Button>
            </div>
          </div>
        ))}

        <p className="text-center text-neutral-500/85 text-lg tracking-tight mt-4">
          Showing 1 to {students.length} of {students.length} entries
        </p>
      </main>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle className="text-3xl font-medium text-red-500">Xóa sinh viên</DialogTitle>

          Bạn có muốn xóa sinh viên hiện tại?

          <DialogFooter>
            <Button onClick={handleRemove} variant="destructive" className="border-none">Xóa</Button>

            <DialogClose asChild>
              <Button className="border-none">Hủy</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
