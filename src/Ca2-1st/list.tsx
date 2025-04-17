import { type Product } from "./types";
import { Button } from "../components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { useState } from "react";

export default function List({ products, removeProduct, changeStatus }: {
  products: Product[],
  removeProduct: (id: number) => void,
  changeStatus: (id: number) => void
}) {
  const [open, setOpen] = useState(false);
  const [delID, setDelID] = useState(0);

  return (
    <div className="rounded-md bg-white shadow">
      <p className="text-white font-medium bg-accent-foreground pl-5 py-1.5 rounded-t-md">Danh Sách Sản Phẩm</p>

      <ul className="py-2 px-3.5 space-y-2.5">
        {products.length ? (
          products.map((product, i) => (
            <li key={i} className="flex shadow-md py-1.5 px-3 rounded-md border border-accent items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-2xl my-0.5">{product.name}</p>
                <p className="text-black/50 text-sm">{product.desc}</p>
                <p><span className="font-semibold">Giá: </span>{product.price}.000<span className="underline">đ</span></p>
                <p className="text-black/50 text-base">Trạng thái: {product.status}</p>
              </div>

              <div className="flex gap-2">
                <Button
                  className={`${product.status === "Còn hàng" ? "bg-amber-400 hover:bg-amber-500 text-gray-800" : "bg-green-500 hover:bg-green-600 text-gray-100"}`}
                  onClick={() => changeStatus(product.id)}
                >
                  Đánh dấu {product.status === "Còn hàng" ? "Hết hàng" : "Còn hàng"}
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => {
                    setOpen(true);
                    setDelID(product.id);
                  }}
                >
                  Xóa
                </Button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center">Bạn chưa có sản phẩm nào</p>
        )}
      </ul>
                
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle className="font-medium text-[30px] text-red-500">
            Xóa Sản Phẩm
          </DialogTitle>
          
          Bạn có muốn xóa sản phẩm hiện tại?

          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => {
                setOpen(false);
                removeProduct(delID);
              }}
            >
              Xóa
            </Button>
            
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
