import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { ExpenseType } from "./types";

export default function Form({ setShowForm, addExpense }: {
  setShowForm: (s: boolean) => void,
  addExpense: (e: ExpenseType) => void
}) {
  const [form, setForm] = useState({
    name: "",
    cost: "",
    category: "Shopping"
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addExpense({ ...form, cost: parseInt(form.cost) });
    setShowForm(false);
  }

  return (
    <main className="container mx-auto px-8 lg:px-80">
      <h1 className="text-[32px] mb-7 mt-5 text-center font-medium">Thêm Chi Tiêu</h1>

      <form
        onSubmit={handleSubmit}
        className="py-3.5 px-4 border rounded-lg shadow-md border-gray-400/80 bg-neutral-200/60"
      >
        <label htmlFor="name">Hoạt Động</label>
        <Input
          required
          value={form.name}
          className="mb-4 border-stone-400/70"
          name="name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <label htmlFor="cost">Chi Phí</label>
        <Input
          required
          type="number"
          value={form.cost}
          className="mb-4 border-stone-400/70"
          name="cost"
          onChange={e => setForm({ ...form, cost: e.target.value })}
        />

        <label htmlFor="cate">Danh Mục</label>
        <Select
          required
          name="cate"
          id="cate"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          className="mb-6"
        >
          <option value="Other">Other</option>
          <option value="Shopping">Shopping</option>
          <option value="Transport">Transport</option>
          <option value="Food">Food</option>
          <option value="Entertainment">Entertainment</option>
        </Select>

        <Button className="w-full">Thêm</Button>
      </form>

      <Button className="mt-4" onClick={() => setShowForm(false)}>Xem Thống Kê</Button>
    </main>
  )
}
