// src/pages/ModManagerPage.tsx
import React, { useState, useEffect } from "react";
import Notification from "../components/Notification";
import Filter from "../components/Filter";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";

interface Mod {
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  version: string;
  tags: string[];
  creator: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

const ModManagerPage: React.FC = () => {
  const [mods, setMods] = useState<Mod[]>([]);
  const [notification, setNotification] = useState<string>("");
  const [selectedMod, setSelectedMod] = useState<Mod | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedCreator, setSelectedCreator] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const savedMods = JSON.parse(localStorage.getItem("mods") || "[]");
    setMods(savedMods);
  }, []);

  const addMod = (mod: Mod) => {
    const newMods = [
      ...mods,
      {
        ...mod,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      },
    ];
    setMods(newMods);
    localStorage.setItem("mods", JSON.stringify(newMods));
    showNotification("Mod added successfully!");
  };

  const updateMod = (mod: Mod) => {
    const updatedMods = mods.map((m) =>
      m === selectedMod ? { ...mod, updatedAt: new Date().toLocaleString() } : m
    );
    setMods(updatedMods);
    localStorage.setItem("mods", JSON.stringify(updatedMods));
    showNotification("Mod updated successfully!");
    setSelectedMod(null);
  };

  const deleteMod = (mod: Mod) => {
    const newMods = mods.filter((m) => m !== mod);
    setMods(newMods);
    localStorage.setItem("mods", JSON.stringify(newMods));
    showNotification("Mod deleted successfully!");
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleFormSubmit = (mod: Mod) => {
    if (selectedMod) {
      updateMod(mod);
    } else {
      addMod(mod);
    }
    setShowModal(false);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortOrder("asc");
    setSelectedRating(null);
    setSelectedCreator("");
  };

  const filteredMods = mods
    .filter(
      (mod) =>
        mod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mod.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (mod) => selectedCategory === "All" || mod.category === selectedCategory
    )
    .filter((mod) => selectedRating === null || mod.rating === selectedRating)
    .filter((mod) =>
      selectedCreator
        ? mod.creator.toLowerCase().includes(selectedCreator.toLowerCase())
        : true
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Mod Manager</h1>

      {notification && (
        <Notification
          message={notification}
          type="success"
          onClose={() => setNotification("")}
        />
      )}

      <div className="flex justify-between items-center mb-4">
        <Button
          onClick={() => setShowModal(true)}
          customClass="bg-blue-600 text-white px-4 py-2 rounded transition hover:bg-blue-700"
        >
          Add New Mod
        </Button>
        <Filter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          selectedRating={selectedRating ?? 0}
          setSelectedRating={setSelectedRating}
          selectedCreator={selectedCreator}
          setSelectedCreator={setSelectedCreator}
          resetFilters={resetFilters}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredMods.map((mod, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 flex flex-col items-start transition-transform transform hover:scale-105 shadow-lg bg-white"
          >
            {mod.thumbnail && (
              <img
                src={mod.thumbnail}
                alt={mod.name}
                className="w-full h-32 object-cover rounded mb-2"
              />
            )}
            <h3 className="text-lg font-bold">{mod.name}</h3>
            <p className="text-gray-700">{mod.description}</p>
            <p className="text-sm text-gray-500">{mod.category}</p>
            <p className="text-xs text-gray-400">
              Created: {mod.createdAt} | Updated: {mod.updatedAt}
            </p>
            <div className="ml-4 flex space-x-2 mt-2">
              <Button
                onClick={() => setSelectedMod(mod)}
                customClass="bg-green-500 text-white px-2 py-1 rounded transition hover:bg-green-600"
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to delete this mod?")
                  ) {
                    deleteMod(mod);
                  }
                }}
                customClass="bg-red-500 text-white px-2 py-1 rounded transition hover:bg-red-600"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {selectedMod && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{selectedMod.name}</h2>
            {selectedMod.thumbnail && (
              <img
                src={selectedMod.thumbnail}
                alt={selectedMod.name}
                className="w-32 h-32 rounded mb-4"
              />
            )}
            <p className="mb-2">{selectedMod.description}</p>
            <p className="text-sm text-gray-500">
              Category: {selectedMod.category}
            </p>
            <p className="text-sm text-gray-500">
              Version: {selectedMod.version}
            </p>
            <p className="text-sm text-gray-500">
              Tags: {selectedMod.tags.join(", ")}
            </p>
            <p className="text-sm text-gray-500">
              Creator: {selectedMod.creator}
            </p>
            <p className="text-sm text-gray-500">
              Rating: {selectedMod.rating}
            </p>
            <p className="text-xs text-gray-400">
              Created: {selectedMod.createdAt} | Updated:{" "}
              {selectedMod.updatedAt}
            </p>
            <Button
              onClick={() => setSelectedMod(null)}
              customClass="mt-4 bg-blue-500 text-white px-4 py-2 rounded transition hover:bg-blue-600"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <ModForm
            addMod={addMod}
            updateMod={updateMod}
            selectedMod={selectedMod}
            setSelectedMod={setSelectedMod}
            setShowModal={setShowModal}
            onSubmit={handleFormSubmit}
          />
        </Modal>
      )}
    </div>
  );
};

interface ModFormProps {
  addMod: (mod: Mod) => void;
  updateMod: (mod: Mod) => void;
  selectedMod: Mod | null;
  setSelectedMod: (mod: Mod | null) => void;
  setShowModal: (show: boolean) => void;
  onSubmit: (mod: Mod) => void;
}

const ModForm: React.FC<ModFormProps> = ({
  addMod,
  updateMod,
  selectedMod,
  setSelectedMod,
  setShowModal,
  onSubmit,
}) => {
  const [modName, setModName] = useState<string>("");
  const [modDescription, setModDescription] = useState<string>("");
  const [modCategory, setModCategory] = useState<string>("Category 1");
  const [modThumbnail, setModThumbnail] = useState<string>("");
  const [modVersion, setModVersion] = useState<string>("");
  const [modTags, setModTags] = useState<string>("");
  const [modCreator, setModCreator] = useState<string>("");
  const [modRating, setModRating] = useState<number>(1);

  useEffect(() => {
    if (selectedMod) {
      setModName(selectedMod.name);
      setModDescription(selectedMod.description);
      setModCategory(selectedMod.category);
      setModThumbnail(selectedMod.thumbnail);
      setModVersion(selectedMod.version);
      setModTags(selectedMod.tags.join(", "));
      setModCreator(selectedMod.creator || "");
      setModRating(selectedMod.rating || 1);
    } else {
      resetForm();
    }
  }, [selectedMod]);

  const resetForm = () => {
    setModName("");
    setModDescription("");
    setModThumbnail("");
    setModVersion("");
    setModTags("");
    setModCreator("");
    setModRating(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = modTags.split(",").map((tag) => tag.trim());
    const modData: Mod = {
      name: modName,
      description: modDescription,
      category: modCategory,
      thumbnail: modThumbnail,
      version: modVersion,
      tags: tagsArray,
      creator: modCreator,
      rating: modRating,
      createdAt: selectedMod
        ? selectedMod.createdAt
        : new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };
    onSubmit(modData);
    resetForm();
    setSelectedMod(null);
    setShowModal(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Mod Name"
        value={modName}
        onChange={(e) => setModName(e.target.value)}
        required
      />
      <Input
        type="textarea"
        placeholder="Mod Description"
        value={modDescription}
        onChange={(e) => setModDescription(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Thumbnail URL"
        value={modThumbnail}
        onChange={(e) => setModThumbnail(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Mod Version"
        value={modVersion}
        onChange={(e) => setModVersion(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Tags (comma-separated)"
        value={modTags}
        onChange={(e) => setModTags(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Creator"
        value={modCreator}
        onChange={(e) => setModCreator(e.target.value)}
      />
      <div className="mb-4">
        <label className="block text-gray-700">Rating:</label>
        <select
          value={modRating}
          onChange={(e) => setModRating(parseInt(e.target.value))}
          className="border p-2 rounded w-full"
        >
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
      </div>
      <select
        value={modCategory}
        onChange={(e) => setModCategory(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      >
        <option value="Category 1">Category 1</option>
        <option value="Category 2">Category 2</option>
      </select>
      <div className="flex justify-between">
        <Button
          type="submit"
          customClass="bg-blue-600 text-white px-4 py-2 rounded transition hover:bg-blue-700"
        >
          {selectedMod ? "Update Mod" : "Add Mod"}
        </Button>
        <Button
          type="button"
          onClick={() => setShowModal(false)}
          customClass="bg-gray-300 text-gray-800 px-4 py-2 rounded transition hover:bg-gray-400"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ModManagerPage;
