import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Items, ItemsOmit } from "./types";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save, XCircle } from "lucide-react";

export default function Form({ editData, handleEdit, setShowForm, addItem }: {
  editData: Items | null;
  setShowForm: (s: boolean) => void;
  addItem: (it: ItemsOmit) => void;
  handleEdit: (it: Items) => void;
}) {
  const [form, setForm] = useState({
    name: editData?.name || "",
    content: editData?.content || "",
    category: editData?.category || "Nghệ thuật",
    topic: editData?.topic || ""
  });
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(editData)
      handleEdit({ id: editData.id, ...form });
    else
      addItem(form);
      
    setShowForm(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="font-medium text-slate-700">
            Tên sách
          </label>
          <Input
            required
            id="name"
            name="name"
            placeholder="Nhập tên sách"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="border-slate-300"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="cate" className="font-medium text-slate-700">
            Danh mục
          </label>
          <Select
            required
            id="cate"
            name="cate"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            selectClass="w-full"
            className="w-full"
          >
            <option value="Công nghệ">Công nghệ</option>
            <option value="Khoa học">Khoa học</option>
            <option value="Lịch sử">Lịch sử</option>
            <option value="Nghệ thuật">Nghệ thuật</option>
            <option value="Phát triển bản thân">Phát triển bản thân</option>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="content" className="font-medium text-slate-700">
            Nội dung
          </label>
          <Textarea
            required
            id="content"
            name="content"
            placeholder="Mô tả nội dung sách"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="min-h-[88px] border-slate-300"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="topic" className="font-medium text-slate-700">
            Chủ đề sách
          </label>
          <Input
            required
            id="topic"
            name="topic"
            placeholder="Nhập chủ đề sách"
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-slate-200 mt-8">
        <Button variant="primary" type="submit">
          <Save className="size-4 mr-1" /> Lưu sách
        </Button>

        <Button
          type="button"
          variant="outline"
          className="border-neutral-400/65"
          onClick={() => setShowForm(false)}
        >
          <XCircle className="size-4 mr-1" /> Hủy
        </Button>
      </div>
    </form>
  );
}
