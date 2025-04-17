import { useState } from "react";
import { type Product } from "./types";
import { Button } from "@/components/ui/button";
import Form from "./form";
import List from "./list";
import data from "@/lib/data.json";

var acc = data.length + 10;

export default function App() {
  const [products, setProducts] = useState(data);
  const [showForm, setShowForm] = useState(true);

  const addProduct = (product: Product) => {
    setProducts([...products, { ...product, id: ++acc }]);
  }

  const removeProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  }

  const switchStatus = (status: string) => status === "Còn hàng" ? "Hết hàng" : "Còn hàng";

  const changeStatus = (id: number) => {
    setProducts(products.map((product) => (product.id === id ? { ...product, status: switchStatus(product.status) } : product)));
  }

  return (
    <div className="bg-gray-200 py-4 min-h-screen">
      <main className="container mx-auto lg:px-12 md:px-8 px-5">
        {showForm ? (
          <Form addProduct={addProduct} setShowForm={setShowForm} />
        ) : (
          <List removeProduct={removeProduct} changeStatus={changeStatus} products={products} />
        )}

        <Button className="absolute bottom-0 right-0" onClick={() => setShowForm(!showForm)}>...</Button>
      </main>
    </div>
  );
}
