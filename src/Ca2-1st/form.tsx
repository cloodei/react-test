import React, { useState } from "react";
import { type Product } from "./types";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Select } from "../components/ui/select";

export default function Form({ addProduct, setShowForm }: {
  addProduct: (p: Product) => void,
  setShowForm: (b: boolean) => void
}) {
  const [form, setForm] = useState({ id: 0, name: '', desc: '', price: '', status: 'Còn hàng' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowForm(false);
    addProduct(form);
  }

  return (
    <>
      <h1 className="mb-6 text-3xl font-medium text-center">Quản lý Sản Phẩm</h1>
      
      <div className="rounded-md bg-white shadow">
        <p className="text-white bg-emerald-600 font-medium pl-4 py-1.5 rounded-t-md">Thêm Sản phẩm mới</p>
        <form onSubmit={handleSubmit} className="px-4 py-3 space-y-4">
          <label htmlFor="name">Tên Sản Phẩm</label>
          <Input
            onChange={e => setForm({ ...form, name: e.target.value })}
            type="text"
            placeholder="Nhập tên sản phẩm"
            name="name"
            required
          />
          
          <label htmlFor="desc">Mô tả</label>
          <Textarea
            onChange={e => setForm({ ...form, desc: e.target.value })}
            placeholder="Nhập mô tả sản phẩm"
            name="desc"
            className="border-stone-500/35"
            required
          />
          
          <label htmlFor="price">Giá</label>
          <Input
            onChange={e => setForm({ ...form, price: e.target.value })}
            type="number"
            placeholder="Nhập giá sản phẩm"
            name="price"
            required
          />
          
          <label htmlFor="status">Trạng thái</label>
          <Select className="w-full" name="status" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
            <option value="Còn hàng">Còn hàng</option>
            <option value="Hết hàng">Hết hàng</option>
          </Select>

          <Button type="submit" className="mt-5 w-full text-white bg-emerald-600 hover:bg-emerald-700">Thêm Sản phẩm</Button>
        </form>
      </div>
    </>
  );
}
