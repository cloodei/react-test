import { useState } from "react";
import { Button } from "../components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { formatBigNum } from "@/lib/utils";
import { Select } from "../components/ui/select";
import { ExpenseType } from "./types";


const costColor = (cost: number) => {
  if(cost < 100_000)
    return "bg-green-500/65";
  if(cost < 300_000)
    return "bg-amber-400/65";

  return "bg-red-500/65";
}

export default function List({ expenses, setShowForm, removeExpense }: {
  expenses: ExpenseType[],
  setShowForm: (s: boolean) => void,
  removeExpense: (idx: number) => void
}) {
  const [cate, setCate] = useState("All");
  const [delModal, setDelModal] = useState(false);
  const [delID, setDelID] = useState(-1);

  const filtered = cate === "All" ? expenses : expenses.filter(expense => expense.category === cate);

  const calc = () => {
    var sum = 0;
    filtered.forEach(expense => sum += expense.cost);

    return formatBigNum(sum);
  }

  const handleDelModal = (idx: number) => {
    setDelID(idx);
    setDelModal(true);
  }

  const handleRemove = () => {
    removeExpense(delID);
    setDelModal(false);
    setDelID(-1);
  }

  return (
    <>
      <main className="container mx-auto px-6 md:px-28 lg:px-52">
        <h1 className="text-[32px] mb-4 text-center font-medium">Quản lý Chi tiêu</h1>

        <Select
          value={cate}
          onChange={e => setCate(e.target.value)}
          className="mb-5 ml-auto"
        >
          <option value="All">All</option>
          <option value="Other">Other</option>
          <option value="Shopping">Shopping</option>
          <option value="Transport">Transport</option>
          <option value="Food">Food</option>
          <option value="Entertainment">Entertainment</option>
        </Select>

        <div className="min-w-64 space-y-3.5 mx-auto">
          {filtered.length > 0 ? (
            filtered.map((expense, i) => (
            <div key={i} className={"rounded-xl py-4 px-4 flex gap-6 items-center justify-between " + costColor(expense.cost)}>
              <div>
                <b className="font-medium">{expense.name}</b> - {expense.category}
                <p className="mt-0.5">{formatBigNum(expense.cost)} VND</p>
              </div>
      
              <div>
                <Button variant="destructive" className="border-none" onClick={() => handleDelModal(i)}>x</Button>
              </div>
            </div>
          ))) : (
            <p className="py-4 text-center text-2xl font-medium tracking-tight">Chưa có hoạt phí hiện tại</p>
          )}
        </div>

        <div className="flex mt-4 items-center justify-between">
          <Button onClick={() => setShowForm(true)}>Thêm Chi Tiêu</Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="px-10">Tổng thiệt hại</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogTitle className="text-4xl font-semibold mb-2">Tổng chi tiêu</DialogTitle>

              <p className="border-t border-gray-900/50">
                Tổng số tiền bạn đã tiêu: 
                <span className="text-2xl font-medium"> {calc()}</span>
              </p>
            </DialogContent>
          </Dialog>
        </div>
      </main>

      <Dialog open={delModal} onOpenChange={setDelModal}>
        <DialogContent>
          <DialogTitle className="text-4xl font-semibold pb-1 text-red-500">Xóa hoạt phí</DialogTitle>

          Bạn có muốn xóa hoạt phí hiện tại?

          <DialogFooter>
            <Button variant="destructive" onClick={handleRemove}>Xóa</Button>

            <DialogClose asChild>
              <Button>Hủy</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
