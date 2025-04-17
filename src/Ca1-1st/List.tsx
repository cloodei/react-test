import { Button } from "@/components/ui/button"
import { PhoneBook } from "./types"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"


export default function List({ phonebooks, removePhonebook }: {
  phonebooks: PhoneBook[],
  removePhonebook: (idx: number) => void
}) {
  const [delID, setDelID] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = (id: number) => {
    setOpen(true);
    setDelID(id);
  }

  const handleRemove = () => {
    setOpen(false);
    removePhonebook(delID);
    setDelID(0);
  }

  return (
    <main className="container mx-auto lg:px-10 px-4 py-6">
      <div className="bg-white rounded-md">
        <h1 className="bg-neutral-500 text-white py-2 pl-4 rounded-t-md text-lg font-medium">Danh sách danh bạ</h1>

        <div className="p-3.5 space-y-5">
          {phonebooks.length > 0 ? (
            phonebooks.map(phonebook => (
              <div key={phonebook.id} className="rounded p-3 shadow-[0_1px_4px_rgba(0,0,0,0.25)] flex justify-between items-center">
                <div className="pl-1">
                  <p className="text-[19px] font-medium">{phonebook.name}</p>
                  <p className="text-gray-800/60 text-[15px] tracking-tight">SĐT: {phonebook.phone}</p>
                  <p className="text-gray-800/60 text-[15px]">Email: {phonebook.email}</p> 
                </div>

                <div>
                  <Button variant="destructive" onClick={() => handleOpen(phonebook.id)}>Xóa</Button>
                </div>
              </div>
            ))
          ) : (
            <p className="font-medium text-xl my-4">Hiện không có danh bạ nào</p>
          )}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle className="font-medium text-2xl text-red-500">Xóa danh bạ</DialogTitle>

          Bạn có muốn xóa bỏ danh bạ hiện tại?

          <DialogFooter>
            <Button variant="destructive" onClick={handleRemove}>Xóa</Button>

            <DialogClose asChild>
              <Button>Hủy</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
