import { Pencil } from "lucide-react";
import { Button } from "../components/ui/button";
import { EditType, EventType } from "./types";
import { formatDate } from "@/lib/utils";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";


const eventBg = (status: string) => {
  if(status === "upcoming")
    return "bg-blue-400/65";
  if(status === "ongoing")
    return "bg-yellow-500/65";

  return "bg-green-400/70";
}

export default function List({ events, handleShowForm, removeEvent, handleEdit }: {
  events: EventType[],
  handleShowForm: () => void,
  removeEvent: (id: number) => void,
  handleEdit: (e: EditType) => void
}) {
  const [open, setOpen] = useState(false);
  const [delID, setDelID] = useState(-1);

  const handleOpen = (idx: number) => {
    setDelID(idx);
    setOpen(true);
  }

  const handleRemove = () => {
    removeEvent(delID);
    setDelID(-1);
    setOpen(false);
  }

  return (
    <>
      <main className="container mx-auto lg:px-12 px-4 py-4">
        <h1 className="text-center text-3xl font-medium mb-6">Quản lý Sự Kiện</h1>

        <div className="space-y-3">
          {events.map((event, i) => (
            <div className={"flex justify-between items-center py-4 px-3.5 rounded-lg " + eventBg(event.status)}>
              <div>
                <p className="font-semibold text-xl mb-0.5">{event.name}</p>
                <p className="text-sm">{formatDate(event.date)} - {event.location}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={() => handleOpen(i)} variant="destructive" className="border-none text-lg pb-3">x</Button>
                <Button onClick={() => handleEdit({ ...event, id: i })} className="border-none bg-amber-500 hover:bg-amber-600">
                  <Pencil />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button onClick={handleShowForm} className="px-6 mt-6">Thêm Sự kiện</Button>
      </main>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle className="text-3xl font-semibold text-red-500 pb-2">
            Xóa Sự Kiện
          </DialogTitle>

          Bạn có muốn xóa đi sự kiện hiện tại?

          <DialogFooter>
            <Button variant="destructive" className="border-none" onClick={handleRemove}>Xóa</Button>

            <DialogClose asChild>
              <Button className="border-none">Hủy</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
