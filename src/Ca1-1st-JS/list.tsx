import { Button } from "@/components/ui/button"
import { Items } from "./types"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

export default function List({ items, removeItem, edititem }: {
  items: Items[],
  removeItem: (idx: number) => void,
  edititem: (it: Items) => void
}) {
  const [open, setOpen] = useState(false);
  const [delID, setDelID] = useState(0);

  const handleRemove = (id: number) => {
    setDelID(id);
    setOpen(true);
  }

  const remove = () => {
    setOpen(false);
    removeItem(delID);
  }

  return (
    <>
      <main className="container mx-auto px-4 py-4">
        <div className="divide-y">
          {items.map(item => (
            <div key={item.id} className="flex items-center px-2 py-4 justify-between">
              <div className="space-y-0.5">
                <p className="text-xl font-medium">{item.name}</p>
                <p className="text-gray-500/90">{item.category}</p>
                <p className="font-medium">
                  <span className="text-green-400">Price: ${item.price.toFixed(2)} </span>
                  <span className="font-medium"> | Stock: {item.count}</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={() => edititem(item)}
                  className="bg-amber-400 hover:bg-amber-500 border-none text-gray-800/90"
                  >
                  Sửa
                </Button>

                <Button
                  onClick={() => handleRemove(item.id)}
                  variant="destructive"
                  className="border-none"
                >
                  Xóa
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-gray-500/80 text-center mb-2 mt-4">Showing 1 to {items.length} of {items.length} entries</p>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogTitle>
              <p className="text-red-500 text-[27px] font-medium">Xóa sản phẩm</p>
            </DialogTitle>

            Bạn có muốn xóa sản phẩm hiện tại?

            <DialogFooter>
              <Button variant="destructive" onClick={remove} className="border-none">Xóa</Button>

              <DialogClose asChild>
                <Button className="border-none">Hủy</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </>
  )
}
