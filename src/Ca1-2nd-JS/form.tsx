import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { User } from "./types";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { checkEmail } from "@/lib/utils";

type FormType = {
  setShowForm: (s: boolean) => void,
  addUser: (u: User) => void
};

export default function Form({ addUser, setShowForm }: FormType) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    gender: false
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    password2: ""
  });

  const validateForm = () => {
    let check = true;
    const error = {
      email: "",
      password: "",
      password2: ""
    };

    if(!checkEmail(form.email)) {
      error.email = "Email không hợp lệ"
      check = false;
    }

    form.password = form.password.trim()
    form.password2 = form.password2.trim()

    if(form.password.length < 8) {
      error.password = "Mật khẩu phải chứa 8 ký tự trở lên";
      check = false;
    }

    if(form.password !== form.password2) {
      error.password2 = "Mật khẩu không khớp!";
      check = false;
    }

    setErrors(error);
    return check;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!validateForm())
      return;
    
    addUser(form);
    setShowForm(false);
  }

  return (
    <>
      <main className="container mx-auto px-12">
        <h1 className="text-3xl font-semibold mt-4 text-center">Quản lý Người dùng</h1>

        <form onSubmit={handleSubmit} className="mt-6 p-4 px-6 border rounded-md border-gray-400/60 shadow bg-neutral-50">
          <label className="mt-4 inline-block" htmlFor="name">Tên</label>
          <Input
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="border-gray-400/65"
            id="name"
            name="name"
            required
          />
          
          <label className="mt-4 inline-block" htmlFor="email">Email</label>
          <Input
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="border-gray-400/65"
            id="email"
            name="email"
            type="email"
            required
          />
          {errors.email ? <p className="text-red-500 mb-0.5">{errors.email}</p> : null}

          <label className="mt-4 inline-block" htmlFor="password">Mật khẩu</label>
          <Input
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="border-gray-400/65"
            id="password"
            name="password"
            type="password"
            required
          />
          {errors.password ? <p className="text-red-500 mb-0.5">{errors.password}</p> : null}

          <label className="mt-4 inline-block" htmlFor="password2">Nhập lại mật khẩu</label>
          <Input
            onChange={e => setForm({ ...form, password2: e.target.value })}
            className="border-gray-400/65"
            id="password2"
            name="password2"
            type="password"
            required
          />
          {errors.password2 ? <p className="text-red-500 mb-0.5">{errors.password2}</p> : null}

          <p className="mb-1.5 mt-5">Giới tính</p>
          <RadioGroup
            required
            className="mb-4 flex items-center gap-1.5"
            value={form.gender ? "Nữ" : "Nam"}
            onValueChange={val => setForm({ ...form, gender: val === "Nam" ? false : true })}
          >
            <RadioGroupItem id="male" value="Nam" className="border-gray-800/60 size-4">Nam</RadioGroupItem>
            <label htmlFor="male">Nam</label>

            <RadioGroupItem id="female" value="Nữ" className="border-gray-800/60 size-4 ml-1">Nữ</RadioGroupItem>
            <label htmlFor="female">Nữ</label>
          </RadioGroup>

          <Button type="submit" variant="primary" className="px-7">Thêm người dùng</Button>
        </form>
        
        <Button onClick={() => setShowForm(false)} className="float-right mt-6 px-5">Danh sách người dùng</Button>
      </main>
    </>
  )
}
