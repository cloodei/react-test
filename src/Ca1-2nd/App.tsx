import { useState } from "react";
import { Button } from "../components/ui/button";
import { LayoutList, Plus } from "lucide-react";
import List from "./list";
import Form from "./form";
import d from "@/lib/data2.json";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState(d);

  const addTodo = (name: string) => {
    setData([...data, { name, status: false }]);
    setShowForm(false);
  }

  const removeTodo = (index: number) => setData(data.filter((d, id) => id !== index));

  const complete = (index: number) => setData(data.map((d, id) => id === index ? { ...d, status: !d.status } : d));

  return (
    <div className="bg-gray-200 py-4 min-h-screen">
      {!showForm ? (
        <>
          <h1 className="text-3xl mb-6 font-medium text-center">Quản lý Công Việc</h1>
          <main className="container mx-auto lg:px-8 px-4 flex items-center justify-center">
            <List todos={data} removeTodo={removeTodo} complete={complete} />
          </main>
        </>
      ) : (
        <Form addTodo={addTodo} />
      )}

      <Button
        onClick={() => setShowForm(!showForm)}
        className="rounded-full p-5 bg-sky-500 fixed bottom-5 right-5 h-14 text-xl hover:bg-sky-600"
      >
        {showForm ? (
          <div>
            <LayoutList />
          </div>
        ) : (
          <div>
            <Plus />
          </div>
        )}
      </Button>
    </div>
  );
}
