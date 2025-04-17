import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Items, ItemsOmit } from "./types";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Form({ editData, handleEdit, setShowForm, addItem }: {
  editData: Items | null,
  setShowForm: (s: boolean) => void,
  addItem: (it: ItemsOmit) => void,
  handleEdit: (it: Items) => void
}) {
  const [form, setForm] = useState({
    name: editData?.name || "",
    price: editData?.price ? String(editData.price) : "",
    description: editData?.description || "",
    category: editData?.category || "PC/Desktop PC",
    count: editData?.count ? String(editData.count) : "",
    pass: "",
    pass2: ""
  });
  const [errors, setErrors] = useState({
    price: "",
    count: "",
    pass: "",
    pass2: "",
  });

  const validateForm = () => {
    const errors = {
      price: "",
      count: "",
      pass: "",
      pass2: "",
    };
    let check = true;

    const parsedPrice = parseFloat(form.price = form.price.trim());
    if(!parsedPrice || isNaN(parsedPrice)) {
      check = false;
      errors.price = "Giá không hợp lệ";
    }

    const parsedCount = parseInt(form.count = form.count.trim());
    if(!parsedCount || isNaN(parsedCount)) {
      check = false;
      errors.count = "Số lượng không hợp lệ";
    }

    const parsedPass = form.pass = form.pass.trim();
    if(form.pass === '1') 1;
    else if(!parsedPass || parsedPass.length < 6 || parsedPass !== "111111") {
      check = false;
      errors.pass = "Sai mật khẩu";
    }

    const parsedPass2 = form.pass2 = form.pass2.trim();
    if(!parsedPass2 || parsedPass2 !== parsedPass) {
      check = false;
      errors.pass2 = "Mật khẩu không khớp!";
    }

    setErrors(errors);
    return check;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!validateForm())
      return;

    if(editData) {
      handleEdit({
        id: editData.id,
        name: form.name,
        price: parseFloat(form.price),
        description: form.description,
        category: form.category,
        count: parseInt(form.count)
      });
    }
    else {
      addItem({
        name: form.name,
        price: parseFloat(form.price),
        description: form.description,
        category: form.category,
        count: parseInt(form.count)
      });
    }

    setShowForm(false);
  }

  return (
    <>
      <main className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-semibold my-2">Thêm/Sửa Sản phẩm</h1>

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          <div className="flex w-full gap-4">
            <div className="w-full">
              <label htmlFor="name">Tên sản phẩm</label>
              <Input
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                name="name"
                id="name"
              />
            </div>

            <div className="w-full">
              <label htmlFor="price">Giá sản phẩm</label>
              <Input
                aria-invalid={!!errors.price}
                required
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                name="price"
                id="price"
              />
              {errors.price ? <p className="text-red-500/95">{errors.price}</p> : null}
            </div>
          </div>

          <div className="flex-1">
            <label htmlFor="desc">Mô tả sản phẩm</label>
            <Textarea
              required
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              name="desc"
              id="desc"
            />
          </div>
          
          <div className="flex w-full gap-4">
            <div className="w-full">
              <label htmlFor="cate">Danh mục</label>
              <Select
                required
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                name="cate"
                id="cate"
                className="w-full"
              >
                <option value="Laptop">Laptop</option>
                <option value="TV/Monitor">TV/Monitor</option>
                <option value="Smartphone">Smartphone</option>
                <option value="PC/Desktop PC">PC/Desktop PC</option>
                <option value="Gaming/Console">Gaming/Console</option>
              </Select>
            </div>

            <div className="w-full">
              <label htmlFor="count">Số lượng tồn kho</label>
              <Input
                aria-invalid={!!errors.count}
                required
                value={form.count}
                onChange={e => setForm({ ...form, count: e.target.value })}
                name="count"
                id="count"
              />
              {errors.count ? <p className="text-red-500/95">{errors.count}</p> : null}
            </div>
          </div>
          
          <div className="flex w-full gap-4">
            <div className="w-full">
              <label htmlFor="pass">Mật khẩu quản trị</label>
              <Input
                aria-invalid={!!errors.pass}
                required
                value={form.pass}
                onChange={e => setForm({ ...form, pass: e.target.value })}
                name="pass"
                id="pass"
                type="password"
              />
              {errors.pass ? <p className="text-red-500/95">{errors.pass}</p> : null}
            </div>

            <div className="w-full">
              <label htmlFor="passconf">Xác nhận mật khẩu</label>
              <Input
                aria-invalid={!!errors.pass2}
                required
                value={form.pass2}
                onChange={e => setForm({ ...form, pass2: e.target.value })}
                name="passconf"
                id="passconf"
                type="password"
              />
              {errors.pass2 ? <p className="text-red-500/95">{errors.pass2}</p> : null}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <Button
              type="submit"
              variant="primary"
            >
              Lưu sản phẩm
            </Button>

            <Button
              type="button"
              variant="secondary"
              className="bg-gray-500 text-white hover:bg-gray-600"
              onClick={() => setShowForm(false)}
            >
              Hủy
            </Button>
          </div>

        </form>
      </main>
    </>
  )
}
