import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useState } from "react";
import { Student } from "./types";
import { checkEmail, checkPhoneNumber } from "@/lib/utils";

export default function Form({ editData, setShowForm, addStudent }: {
  setShowForm: (s: boolean) => void,
  addStudent: (s: Student) => void,
  editData?: Student
}) {
  const [form, setForm] = useState({
    id: editData ? editData.id : "",
    name: editData ? editData.name : "",
    email: editData ? editData.email : "",
    phone: editData ? editData.phone : "",
    major: editData ? editData.major : "",
    gender: editData ? editData.gender : ""
  });
  const [errors, setErrors] = useState({
    id: "",
    email: "",
    phone: "",
    major: ""
  })

  const validateForm = () => {
    const errors = {
      id: "",
      email: "",
      phone: "",
      major: "",
    };
    let check = true;

    form.id = form.id.trim();
    if(form.id.length !== 5 || (form.id[0] !== 'S' || form.id[1] !== 'V')) {
      check = false;
      errors.id = "Mã sinh viên không đúng định dạng!";
    }
    if(isNaN(parseInt(form.id[2])) || isNaN(parseInt(form.id[3])) || isNaN(parseInt(form.id[4]))) {
      check = false;
      errors.id = "Mã sinh viên không đúng định dạng!";
    }

    form.email = form.email.trim();
    if(!checkEmail(form.email)) {
      check = false;
      errors.email = "Email không đúng định dạng!";
    }

    form.phone = form.phone.trim();
    if(!checkPhoneNumber(form.phone)) {
      check = false;
      errors.phone = "Số điện thoại không đúng định dạng!";
    }
    
    if(!form.major) {
      check = false;
      errors.major = "Hãy chọn ngành học!";
    }

    setErrors(errors);
    return check;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!validateForm())
      return;

    addStudent({ ...form, gender: form.gender === '1' });
    setShowForm(false);
  }

  return (
    <>
      <main className="container mx-auto lg:px-8 px-4 py-6">
        <h1 className="text-3xl font-semibold mb-8 mt-4">Đăng ký/Sửa thông tin Sinh Viên</h1>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="flex items-center gap-4">
            <div className="w-full">
              <label htmlFor="name">Họ và Tên</label>
              <Input
                required
                id="name"
                name="name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="w-full">
              <label htmlFor="sid">Mã sinh viên</label>
              <Input
                required
                id="sid"
                name="sid"
                placeholder="VD: SV001"
                value={form.id}
                onChange={e => setForm({ ...form, id: e.target.value })}
                aria-invalid={!!errors.id}
              />
              {errors.id && <p className="text-red-500">{errors.id}</p>}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-full">
              <label htmlFor="email">Email</label>
              <Input
                required
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>

            <div className="w-full">
              <label htmlFor="phone">Số điện thoại</label>
              <Input
                required
                id="phone"
                name="phone"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <p className="text-red-500">{errors.phone}</p>}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-full">
              <label htmlFor="major">Ngành học</label>
              <Select
                className="w-full"
                value={form.major || undefined}
                onChange={e => setForm({ ...form, major: e.target.value })}
                aria-invalid={!!errors.major}
              >
                <option selected disabled className="text-gray-300">Chọn ngành</option>
                <option value="Cơ khí">Cơ khí</option>
                <option value="Điện tử viễn thông">Điện tử viễn thông</option>
                <option value="Tài Chính">Tài Chính</option>
                <option value="IT">IT</option>
              </Select>
              {errors.major && <p className="text-red-500">{errors.major}</p>}
            </div>

            <div className="w-full">
              <p>Giới tính</p>

              <div className="flex items-center">
                <Input
                  required
                  id="male"
                  name="gender"
                  type="radio"
                  className="size-4"
                  value="0"
                  checked={form.gender === "0"}
                  onChange={e => setForm({ ...form, gender: e.target.value })}
                />
                <label htmlFor="male" className="inline-block pb-1 ml-1 mr-6">Nam</label>

                <Input
                  required
                  id="female"
                  name="gender"
                  type="radio"
                  className="size-4"
                  value="1"
                  checked={form.gender === "1"}
                  onChange={e => setForm({ ...form, gender: e.target.value })}
                />
                <label htmlFor="female" className="inline-block pb-1 ml-1">Nữ</label>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-5">
            <Button variant="primary" type="submit">Lưu thông tin</Button>
            <Button type="button" onClick={() => setShowForm(false)}>Hủy</Button>
          </div>
        </form>
      </main>
    </>
  )
}
