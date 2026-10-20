
import { useEffect, useRef, useState } from "react";
import api from "../services/api";
import gsap from "gsap";
import {
  Sprout,
  Package,
  MapPin,
  UserRound,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
  Leaf,
  Truck,
  X,
  Search,
} from "lucide-react";

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

const cropImages = {
  Cotton:
    "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?w=700",
  Rice: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=700",
  Wheat:
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=700",
  Groundnut:
    "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=700",
  Millet:
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=700",
  Maize:
    "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=700",
  Tea: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=700",
  Coffee:
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700",
  Watermelon:
    "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=700",
  Sugarcane:
    "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=700",
};

const initialForm = {
  crop: "",
  quantity: "",
  destination: "",
};

const CreateShipmentForm = ({ fetchShipments }) => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const rootRef = useRef(null);
  const formRef = useRef(null);
  const suggestionsRef = useRef(null);
  const resultPreviewRef = useRef(null);

  // Read the logged-in user safely.
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    } catch (err) {
      console.error("Unable to read user information:", err);
      setUser(null);
    }
  }, []);

  // Intro animations.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      timeline
        .from(".shipment-eyebrow", {
          y: 15,
          opacity: 0,
          duration: 0.5,
        })
        .from(
          ".shipment-title",
          {
            y: 28,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.2"
        )
        .from(
          ".shipment-description",
          {
            y: 15,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.35"
        )
        .from(
          ".shipment-form-card",
          {
            y: 35,
            opacity: 0,
            scale: 0.985,
            duration: 0.75,
          },
          "-=0.15"
        )
        .from(
          ".shipment-field",
          {
            y: 18,
            opacity: 0,
            stagger: 0.1,
            duration: 0.45,
          },
          "-=0.3"
        )
        .from(
          ".shipment-preview",
          {
            x: 20,
            opacity: 0,
            duration: 0.65,
          },
          "-=0.35"
        );

      gsap.to(".shipment-orb", {
        y: -12,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.35,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Animate the crop suggestions when they appear.
  useEffect(() => {
    if (!suggestions.length || !suggestionsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".crop-suggestion-item", {
        y: 8,
        opacity: 0,
        stagger: 0.04,
        duration: 0.25,
        ease: "power2.out",
      });
    }, suggestionsRef);

    return () => ctx.revert();
  }, [suggestions]);

  // Animate success and error messages.
  useEffect(() => {
    if (!success && !error) return;

    const ctx = gsap.context(() => {
      gsap.from(".shipment-feedback", {
        y: 12,
        opacity: 0,
        duration: 0.35,
        ease: "power2.out",
      });
    }, rootRef);

    return () => ctx.revert();
  }, [success, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");

    if (name === "crop") {
      const filtered = cropList.filter((crop) =>
        crop.toLowerCase().includes(value.trim().toLowerCase())
      );

      setSuggestions(value.trim() ? filtered : []);
    }
  };

  const selectCrop = (crop) => {
    setForm((prev) => ({
      ...prev,
      crop,
    }));

    setSuggestions([]);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const farmerId = user?.id || user?._id;

    if (!user || !farmerId) {
      setError("Your user session is missing. Please log in again.");
      return;
    }

    if (!form.crop.trim() || !form.destination.trim()) {
      setError("Please complete all shipment fields.");
      return;
    }

    if (!Number.isFinite(Number(form.quantity)) || Number(form.quantity) <= 0) {
      setError("Quantity must be a number greater than zero.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        crop: form.crop.trim(),
        quantity: Number(form.quantity),
        destination: form.destination.trim(),
        farmerName: user.name,
        createdBy: farmerId,
      };

      const res = await api.post("/shipments/create", payload);

      setSuccess(
        res.data?.message || "Your shipment has been created successfully!"
      );

      setForm(initialForm);
      setSuggestions([]);

      if (formRef.current) {
        formRef.current.reset();
      }

      if (typeof fetchShipments === "function") {
        await fetchShipments();
      }

      // Briefly emphasize the confirmation.
      requestAnimationFrame(() => {
        rootRef.current
          ?.querySelector(".shipment-feedback")
          ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    } catch (err) {
      console.error("Create shipment error:", err);

      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to create shipment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setSuggestions([]);
    setError("");
    setSuccess("");

    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const selectedCropImage = cropImages[form.crop];

  return (
    <div
      ref={rootRef}
      className="relative isolate mb-10 overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-950 via-green-900 to-green-800 p-4 shadow-2xl shadow-green-950/10 sm:p-7 lg:p-9"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="shipment-orb absolute -right-16 -top-20 h-72 w-72 rounded-full bg-lime-400/15 blur-3xl" />
        <div className="shipment-orb absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] [background-size:24px_24px]" />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div className="max-w-2xl">
            <div className="shipment-eyebrow mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-lime-200 backdrop-blur-md">
              <Sparkles size={15} />
              AgriLink AI Logistics
            </div>

            <h2 className="shipment-title text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Move your harvest.
              <span className="block text-lime-300">
                Grow your business.
              </span>
            </h2>

            <p className="shipment-description mt-4 max-w-xl text-sm leading-7 text-green-100/75 sm:text-base">
              Create a shipment, add its destination, and keep your
              agricultural supply chain moving.
            </p>
          </div>

          <div className="shipment-eyebrow flex h-16 w-16 shrink-0 items-center justify-center self-start rounded-2xl border border-white/15 bg-white/10 text-lime-300 shadow-lg backdrop-blur-md sm:h-20 sm:w-20">
            <Truck size={36} strokeWidth={1.6} />
          </div>
        </div>

        {/* Status messages */}
        {error && (
          <div
            role="alert"
            className="shipment-feedback mb-5 flex items-start gap-3 rounded-2xl border border-red-200/40 bg-red-500/10 p-4 text-sm text-red-100"
          >
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <span className="flex-1">{error}</span>
            <button
              type="button"
              onClick={() => setError("")}
              aria-label="Dismiss error"
              className="rounded-lg p-1 transition hover:bg-white/10"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {success && (
          <div
            role="status"
            className="shipment-feedback mb-5 flex items-start gap-3 rounded-2xl border border-green-200/40 bg-green-400/10 p-4 text-sm text-green-100"
          >
            <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
            <span className="flex-1">{success}</span>
            <button
              type="button"
              onClick={() => setSuccess("")}
              aria-label="Dismiss success message"
              className="rounded-lg p-1 transition hover:bg-white/10"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* Main content */}
        <div className="grid items-stretch gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Form card */}
          <div className="shipment-form-card rounded-3xl border border-white/70 bg-white p-5 shadow-xl sm:p-7 lg:p-8">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-800">
                <Package size={25} />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-gray-900">
                  Shipment details
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Fill in the information below.
                </p>
              </div>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Crop autocomplete */}
              <div className="shipment-field relative">
                <label
                  htmlFor="shipment-crop"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Crop name <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Sprout
                    size={19}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-green-700"
                  />

                  <input
                    id="shipment-crop"
                    type="text"
                    name="crop"
                    placeholder="Search or enter a crop"
                    value={form.crop}
                    onChange={handleChange}
                    onFocus={() => {
                      if (form.crop.trim()) {
                        setSuggestions(
                          cropList.filter((crop) =>
                            crop
                              .toLowerCase()
                              .includes(form.crop.trim().toLowerCase())
                          )
                        );
                      }
                    }}
                    onBlur={() => {
                      window.setTimeout(() => setSuggestions([]), 150);
                    }}
                    autoComplete="off"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-green-300 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
                  />

                  <Search
                    size={17}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>

                {suggestions.length > 0 && (
                  <ul
                    ref={suggestionsRef}
                    className="absolute left-0 right-0 top-full z-30 mt-2 max-h-56 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl"
                  >
                    {suggestions.map((crop) => (
                      <li key={crop}>
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => selectCrop(crop)}
                          className="crop-suggestion-item flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-800"
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-700">
                            <Leaf size={18} />
                          </span>
                          {crop}
                          <ArrowRight
                            size={15}
                            className="ml-auto text-gray-400"
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Quantity */}
              <div className="shipment-field">
                <label
                  htmlFor="shipment-quantity"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Quantity <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Package
                    size={19}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-green-700"
                  />

                  <input
                    id="shipment-quantity"
                    type="number"
                    name="quantity"
                    placeholder="Enter quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    min="0.01"
                    step="any"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-20 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-green-300 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500">
                    Units*
                  </span>
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Enter the quantity using the unit your shipment system
                  expects.
                </p>
              </div>

              {/* Destination */}
              <div className="shipment-field">
                <label
                  htmlFor="shipment-destination"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Destination <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <MapPin
                    size={19}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-green-700"
                  />

                  <input
                    id="shipment-destination"
                    type="text"
                    name="destination"
                    placeholder="City, market, or delivery location"
                    value={form.destination}
                    onChange={handleChange}
                    required
                    maxLength={200}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-green-300 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
                  />
                </div>
              </div>

              {/* Farmer */}
              <div className="shipment-field">
                <label
                  htmlFor="shipment-farmer"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Created by
                </label>

                <div className="relative">
                  <UserRound
                    size={19}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    id="shipment-farmer"
                    type="text"
                    value={user?.name || "Loading farmer details..."}
                    disabled
                    className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 py-4 pl-12 pr-4 text-sm font-medium text-gray-500 outline-none"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="shipment-field flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row">
                <button
                  type="submit"
                  disabled={loading || !user}
                  className="group inline-flex flex-1 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-green-700 to-emerald-600 px-5 py-4 font-bold text-white shadow-lg shadow-green-800/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <LoaderCircle size={20} className="animate-spin" />
                      Creating shipment...
                    </>
                  ) : (
                    <>
                      <Truck size={20} />
                      Create shipment
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={loading}
                  className="rounded-xl border border-gray-200 px-6 py-4 font-semibold text-gray-600 transition hover:border-green-300 hover:bg-green-50 hover:text-green-800 disabled:opacity-50"
                >
                  Clear form
                </button>
              </div>
            </form>
          </div>

          {/* Live shipment preview */}
          <aside className="shipment-preview flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-xl backdrop-blur-md">
            <div className="relative min-h-52 flex-1 overflow-hidden bg-green-950/30">
              <img
                src={selectedCropImage || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900"}
                alt={form.crop ? `${form.crop} preview` : "Agricultural field"}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900";
                }}
                className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-950/20 to-transparent" />

              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-2 text-xs font-bold text-white backdrop-blur-md">
                <Sparkles size={14} className="text-lime-300" />
                Live preview
              </div>

              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime-200">
                  Shipment overview
                </p>

                <h3 className="mt-2 break-words text-3xl font-black text-white">
                  {form.crop || "Your crop"}
                </h3>

                <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
                  <MapPin size={16} />
                  {form.destination || "Destination not set"}
                </p>
              </div>
            </div>

            <div className="space-y-4 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <span className="text-sm text-green-100/70">
                  Crop selected
                </span>
                <span className="max-w-[60%] break-words text-right text-sm font-bold text-white">
                  {form.crop || "—"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <span className="text-sm text-green-100/70">Quantity</span>
                <span className="text-right text-sm font-bold text-white">
                  {form.quantity || "—"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-green-100/70">Farmer</span>
                <span className="max-w-[60%] break-words text-right text-sm font-bold text-white">
                  {user?.name || "Not available"}
                </span>
              </div>

              <div className="mt-5 rounded-2xl border border-lime-300/15 bg-lime-300/10 p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-lime-300/15 p-2 text-lime-300">
                    <CheckCircle2 size={20} />
                  </div>

                  <div>
                    <p className="font-bold text-white">
                      Ready to dispatch?
                    </p>
                    <p className="mt-1 text-xs leading-5 text-green-100/70">
                      Verify the crop, quantity, and destination before
                      creating your shipment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-green-100/60">
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 size={14} className="text-lime-300" />
            Shipment details preview
          </span>
          <span className="inline-flex items-center gap-2">
            <Leaf size={14} className="text-lime-300" />
            Built for agricultural logistics
          </span>
        </div>

        <p className="mt-3 text-center text-[11px] leading-5 text-green-100/45">
          * Quantity units are illustrative. Match the unit to your backend
          and shipment workflow.
        </p>
      </div>
    </div>
  );
};

export default CreateShipmentForm;
