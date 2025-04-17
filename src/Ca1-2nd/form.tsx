import { FormEvent, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";


export default function Form({ addTodo }: {
  addTodo: (name: string) => void
}) {
  const [name, setName] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTodo(name);
  }

  return (
    <>
      <h1 className="text-3xl mb-10 font-medium text-center">Thêm công việc mới</h1>

      <form
        className="mx-auto mt-12 border border-gray-400/80 shadow-lg px-8 py-3.5 bg-gray-100 rounded-xl max-w-80"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Tên công việc</label>
        <Input name="name" id="name" value={name} onChange={e => setName(e.target.value)} required />

        <Button type="submit" className="w-full mt-2.5">Thêm</Button>
      </form>
    </>
  )
}
