import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { EditType, EventType } from "./types";
import { Button } from "../components/ui/button";
import { Select } from "../components/ui/select";

export default function EditForm({ addEvent, setShowForm, editData, editEvent }: {
  editData?: EditType,
  addEvent: (e: EventType) => void,
  setShowForm: (s: boolean) => void,
  editEvent: (e: EditType) => void
}) {
  const [form, setForm] = useState({
    name: editData?.name || "",
    date: editData?.date || "",
    location: editData?.location || "",
    status: editData?.status || "upcoming"
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(editData)
      editEvent({ ...form, id: editData.id });
    else
      addEvent(form)

    setShowForm(false)
  }

  return (
    <>
      <main className="container mx-auto lg:px-12 px-4 py-4">
        <h1 className="text-center text-3xl font-medium mb-6">{editData ? "Chỉnh sửa Sự Kiện" : "Thêm Sự Kiện"}</h1>

        <form onSubmit={handleSubmit} className="mx-auto lg:px-9 px-5 py-5 bg-[#eeeeee] rounded-md shadow-[0_2px_12px_rgba(0,0,0,0.32)]">
          <label htmlFor="name">Tên sự kiện</label>
          <Input
            name="name"
            id="name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="mb-4"
            required
          />

          <label htmlFor="date">Thời điểm</label>
          <Input
            type="date"
            value={form.date || (new Date()).toString()}
            onChange={e => setForm({ ...form, date: e.target.value })}
            required
          />

          <label htmlFor="location">Địa điểm</label>
          <Input
            name="location"
            id="location"
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            className="mb-4"
            required
          />

          <label htmlFor="status">Trạng thái</label>
          <br />
          <Select
            name="status"
            id="status"
            required
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
          >
            <option value="ongoing">Đang diễn ra</option>
            <option value="upcoming">Sắp diễn ra</option>
            <option value="done">Đã kết thúc</option>
          </Select>

          <Button className="w-[70%] block mx-auto mt-8" type="submit">{editData ? "Sửa sự kiện" : "Thêm sự kiện"}</Button>
        </form>
      </main>

      <Button onClick={() => setShowForm(false)} className="fixed bottom-0.5 right-0.5 border-none">...</Button>
    </>
  )
}
