import { useState } from "react";
import api from "../services/api";

const cropList = [
  "Cotton",
  "Rice",
  "Wheat",
  "Groundnut",
  "Millet",
  "Maize",
  "Tea",
  "Coffee",
  "Watermelon",
  "Sugarcane",
];

const CreateShipmentForm = ({ fetchShipments }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    crop: "",
    quantity: "",
    destination: "",
  });

  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "crop") {
      const filtered =
        value.trim() === ""
          ? []
          : cropList.filter((c) =>
              c.toLowerCase().startsWith(value.toLowerCase()),
            );

      setSuggestions(filtered);
    }
  };

  const selectCrop = (crop) => {
    setForm((prev) => ({
      ...prev,
      crop,
    }));

    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        farmerName: user?.name,
        createdBy: user?.id || user?._id,
      };

      console.log("Creating Shipment:", payload);

      const res = await api.post("/shipments/create", payload);

      console.log(res.data);

      fetchShipments();

      setForm({
        crop: "",
        quantity: "",
        destination: "",
      });

      setSuggestions([]);

      alert("Shipment created successfully!");
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.error || "Failed to create shipment");
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-md mb-8">
      <h2 className="text-3xl font-bold text-green-700 mb-8">
        Create Shipment
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Crop Input */}
        <div className="relative">
          <input
            type="text"
            name="crop"
            placeholder="Crop Name"
            value={form.crop}
            onChange={handleChange}
            className="border p-4 rounded-2xl w-full"
            autoComplete="off"
            required
          />

          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 top-full mt-2 bg-white border rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  onClick={() => selectCrop(item)}
                  className="p-3 cursor-pointer hover:bg-green-100"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          className="border p-4 rounded-2xl"
          required
        />

        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
          className="border p-4 rounded-2xl"
          required
        />

        <input
          type="text"
          value={user?.name || ""}
          disabled
          className="border p-4 rounded-2xl bg-gray-100 text-gray-600"
        />

        <button
          type="submit"
          className="bg-green-700 hover:bg-green-800 text-white py-4 rounded-2xl col-span-1 md:col-span-2"
        >
          Create Shipment
        </button>
      </form>
    </div>
  );
};

export default CreateShipmentForm;
