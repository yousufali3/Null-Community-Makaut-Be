import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface NewWebinarFormProps {
  onClose: () => void;
  onCreate: (webinar: {
    title: string;
    date: Date;
    time: string;
    description: string;
    image: File | null;
  }) => void;
}

export const NewWebinarForm: React.FC<NewWebinarFormProps> = ({
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", title);
    formData.append("body", description);
    formData.append("date", new Date(date).toISOString());
    formData.append("time", time);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://192.168.0.105:8000/api/event/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onCreate({ title, date: new Date(date), time, description, image });
      toast.success("Your webinar has been created successfully!");
      onClose(); // Close the form after submission
    } catch (error) {
      console.error("Error creating webinar:", error);
      toast.error("There was an error creating the webinar.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold">Create New Webinar</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div>
            <label className="block">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div>
            <label className="block">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div>
            <label className="block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div>
            <label className="block">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="text-red-500">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#00ff88] text-black rounded p-2"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
