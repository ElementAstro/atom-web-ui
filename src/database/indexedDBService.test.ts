import { openDB } from "idb";
import {

addData,
getAllData,
searchData,
updateData,
deleteData,
recoverData,
importData,
exportData,
addBulkData,
deleteBulkData,
searchByIndex,
} from "./indexedDBService";

jest.mock("idb");

const mockDB = {
add: jest.fn(),
getAll: jest.fn(),
put: jest.fn(),
delete: jest.fn(),
transaction: jest.fn().mockReturnValue({
  store: {
    add: jest.fn(),
    delete: jest.fn(),
    index: jest.fn().mockReturnValue({
      getAll: jest.fn(),
    }),
  },
  done: Promise.resolve(),
}),
};

beforeEach(() => {
(openDB as jest.Mock).mockResolvedValue(mockDB);
});

describe("IndexedDB Service", () => {
it("should initialize the database", async () => {
  await openDB("MyDatabase", 1);
  expect(openDB).toHaveBeenCalledWith("MyDatabase", 1, expect.any(Object));
});

it("should add data", async () => {
  const data = { name: "Test" };
  await addData(data);
  expect(mockDB.add).toHaveBeenCalledWith("MyStore", data);
});

it("should get all data", async () => {
  const data = [{ id: 1, name: "Test" }];
  mockDB.getAll.mockResolvedValueOnce(data);
  const result = await getAllData();
  expect(result).toEqual(data);
});

it("should search data", async () => {
  const data = [{ id: 1, name: "Test" }];
  mockDB.getAll.mockResolvedValueOnce(data);
  const result = await searchData("test");
  expect(result).toEqual(data);
});

it("should update data", async () => {
  const data = { id: 1, name: "Updated Test" };
  await updateData(1, data);
  expect(mockDB.put).toHaveBeenCalledWith("MyStore", data);
});

it("should delete data", async () => {
  await deleteData(1);
  expect(mockDB.delete).toHaveBeenCalledWith("MyStore", 1);
});

it("should recover data", async () => {
  const data = { name: "Recovered Test" };
  await recoverData(data);
  expect(mockDB.add).toHaveBeenCalledWith("MyStore", data);
});

it("should import data", async () => {
  const jsonData = JSON.stringify([{ name: "Imported Test" }]);
  await importData(jsonData);
  expect(mockDB.transaction().store.add).toHaveBeenCalledWith({
    name: "Imported Test",
  });
});

it("should export data", async () => {
  const data = [{ id: 1, name: "Test" }];
  mockDB.getAll.mockResolvedValueOnce(data);
  const result = await exportData();
  expect(result).toEqual(JSON.stringify(data));
});

it("should add bulk data", async () => {
  const dataArray = [{ name: "Bulk Test 1" }, { name: "Bulk Test 2" }];
  await addBulkData(dataArray);
  dataArray.forEach((data) =>
    expect(mockDB.transaction().store.add).toHaveBeenCalledWith(data)
  );
});

it("should delete bulk data", async () => {
  const ids = [1, 2];
  await deleteBulkData(ids);
  ids.forEach((id) =>
    expect(mockDB.transaction().store.delete).toHaveBeenCalledWith(id)
  );
});

it("should search by index", async () => {
  const data = [{ id: 1, name: "Test" }];
  mockDB.transaction().store.index().getAll.mockResolvedValueOnce(data);
  const result = await searchByIndex("name", "Test");
  expect(result).toEqual(data);
});
});