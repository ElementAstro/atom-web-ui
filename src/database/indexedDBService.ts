import { openDB, IDBPDatabase } from "idb";

const dbName = "MyDatabase";
const storeName = "MyStore";

interface Data {
  id?: number;
  name: string;
  [key: string]: any;
}

const initDB = async (): Promise<IDBPDatabase> => {
  return await openDB(dbName, 1, {
    upgrade(db) {
      const store = db.createObjectStore(storeName, {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("name", "name"); // 创建索引
    },
  });
};

// 添加数据
export const addData = async (data: Data): Promise<void> => {
  try {
    const db = await initDB();
    await db.add(storeName, data);
  } catch (error) {
    console.error("Error adding data:", error);
    throw new Error("添加数据失败");
  }
};

// 获取所有数据
export const getAllData = async (): Promise<Data[]> => {
  try {
    const db = await initDB();
    return await db.getAll(storeName);
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw new Error("获取数据失败");
  }
};

// 搜索数据
export const searchData = async (query: string): Promise<Data[]> => {
  const data = await getAllData();
  return data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
};

// 更新数据
export const updateData = async (id: number, newData: Data): Promise<void> => {
  try {
    const db = await initDB();
    await db.put(storeName, { ...newData, id });
  } catch (error) {
    console.error("Error updating data:", error);
    throw new Error("更新数据失败");
  }
};

// 删除数据
export const deleteData = async (id: number): Promise<void> => {
  try {
    const db = await initDB();
    await db.delete(storeName, id);
  } catch (error) {
    console.error("Error deleting data:", error);
    throw new Error("删除数据失败");
  }
};

// 恢复删除的数据
export const recoverData = async (data: Data): Promise<void> => {
  try {
    await addData(data);
  } catch (error) {
    console.error("Error recovering data:", error);
    throw new Error("恢复数据失败");
  }
};

// 导入数据
export const importData = async (jsonData: string): Promise<void> => {
  const dataArray: Data[] = JSON.parse(jsonData);
  await addBulkData(dataArray);
};

// 导出数据
export const exportData = async (): Promise<string> => {
  const data = await getAllData();
  return JSON.stringify(data);
};

// 批量添加数据
export const addBulkData = async (dataArray: Data[]): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(storeName, "readwrite");
  dataArray.forEach((data) => tx.store.add(data));
  await tx.done;
};

// 批量删除数据
export const deleteBulkData = async (ids: number[]): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(storeName, "readwrite");
  ids.forEach((id) => tx.store.delete(id));
  await tx.done;
};

// 根据索引搜索数据
export const searchByIndex = async (
  indexName: string,
  query: string
): Promise<Data[]> => {
  try {
    const db = await initDB();
    const tx = db.transaction(storeName, "readonly");
    const index = tx.store.index(indexName);
    const results = await index.getAll(IDBKeyRange.only(query));
    await tx.done;
    return results;
  } catch (error) {
    console.error("Error searching by index:", error);
    throw new Error("索引搜索失败");
  }
};
