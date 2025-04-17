import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

type ListType = {
  todos: {
    name: string,
    status: boolean
  }[],
  removeTodo: (index: number) => void,
  complete: (index: number) => void,
}

const colors = ["bg-[#df5779]/70", "bg-[#dfbf57]/70", "bg-[#579ddf]/70"];

export default function List({ todos, removeTodo, complete }: ListType) {
  const [open, setOpen] = useState(false);
  const [delID, setDelID] = useState(0);

  const handleOpen = (id: number) => {
    setDelID(id);
    setOpen(true);
  }

  const handleDelete = () => {
    removeTodo(delID);
    setDelID(0);
    setOpen(false);
  }

  return (
    <>
      <div className="space-y-2.5 min-w-56">
        {todos.map((todo, i) => (
          <div
            className={cn(
              "rounded-md pr-4 flex items-center",
              colors[i % 3],
              todo.status ? "opacity-75 line-through" : ""
            )}
          >
            <div onClick={() => complete(i)} className="w-full h-full pl-4 pr-6 py-4">
              {todo.name}
            </div>
      
            <Button variant="destructive" className="border-none z-10" onClick={() => handleOpen(i)}>x</Button>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>
            <h1 className="text-red-500 text-2xl font-medium py-1">Xóa công việc</h1>
          </DialogTitle>

          Bạn có muốn xóa công việc hiện tại?

          <DialogFooter>
            <Button variant="destructive" className="border-none" onClick={handleDelete}>Xóa</Button>

            <DialogClose asChild>
              <Button className="border-none">Hủy</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
