import React, { useState } from "react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneBookOmit } from "./types";


export default function Form({ setShowForm, addPhonebook }: {
  setShowForm: (s: boolean) => void,
  addPhonebook: (pb: PhoneBookOmit) => void
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPhonebook(form);
    setShowForm(false);
  }

  return (
    <>
      <main className="container mx-auto px-4 lg:px-12 py-6 pt-3">
        <h1 className="text-3xl font-semibold mb-5 text-center">Quản lý danh bạ</h1>

        <div className="bg-white rounded-md shadow-xl">
          <p className="bg-blue-500 text-white py-2 pl-4 rounded-t-md text-lg font-medium">Thêm Danh bạ mới</p>

          <form onSubmit={handleSubmit} className="space-y-3.5 p-4 pt-3">
            <label htmlFor="name">Họ và Tên</label>
            <Input
              placeholder="Nhập họ và tên"
              name="name"
              id="name"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            
            <label htmlFor="phone">Số điện thoại</label>
            <Input
              placeholder="Nhập số điện thoại"
              name="phone"
              id="phone"
              required
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />
            
            <label htmlFor="email">Email</label>
            <Input
              placeholder="Nhập email"
              name="email"
              id="email"
              type="email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />

            <Button type="submit" variant="primary" className="w-full mt-4">Thêm Danh bạ</Button>
          </form>
        </div>
      </main>
    </>
  )
}
