
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sprout,
  CloudRain,
  CalendarDays,
  Sparkles,
  Leaf,
  ArrowRight,
  RotateCcw,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import MainLayout from "../layouts/MainLayout";

gsap.registerPlugin(ScrollTrigger);

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const soilTypes = [
  "Black Soil",
  "Red Soil",
  "Alluvial Soil",
  "Laterite Soil",
  "Rocky Soil",
  "Clay Soil",
  "Sandy Soil",
];

const rainfallOptions = [
  50, 80, 100, 120, 150, 180, 200, 220, 250, 280, 300, 320, 350, 400,
];

const seasons = ["Summer", "Winter", "Monsoon"];

const cropImages = {
  Rice: "https://t4.ftcdn.net/jpg/05/16/35/47/360_F_516354718_dPoyJgoRz2CQPNUuzzBbc6JCCfMRwrD9.jpg",
  Wheat: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200",
  Cotton: "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?w=1200",
  Tea: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=1200",
  Millet: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200",
  Groundnut: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=1200",
  Watermelon: "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=1200",
  Coffee: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200",
  Sugarcane: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=1200",
  Maize: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=1200",
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200";

const CropPrediction = () => {
  const [form, setForm] = useState({
    soilType: "",
    rainfall: "",
    season: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const resultRef = useRef(null);

  // Animate page entrance.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .from(".crop-hero-badge", {
          y: 15,
          opacity: 0,
          duration: 0.5,
        })
        .from(
          ".crop-hero-title",
          {
            y: 35,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.2"
        )
        .from(
          ".crop-hero-description",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".crop-form-card",
          {
            y: 35,
            opacity: 0,
            scale: 0.98,
            duration: 0.7,
          },
          "-=0.2"
        )
        .from(
          ".crop-field",
          {
            y: 15,
            opacity: 0,
            stagger: 0.12,
            duration: 0.45,
          },
          "-=0.3"
        );

      gsap.to(".crop-decoration", {
        y: -12,
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
      });

      gsap.utils.toArray(".crop-info-card").forEach((card) => {
        gsap.from(card, {
          y: 25,
          opacity: 0,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true,
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Animate the recommendation whenever a new result arrives.
  useEffect(() => {
    if (!result || !resultRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .fromTo(
          ".crop-result-card",
          {
            y: 45,
            opacity: 0,
            scale: 0.97,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
          }
        )
        .from(
          ".crop-result-image",
          {
            x: -25,
            opacity: 0,
            duration: 0.65,
          },
          "-=0.35"
        )
        .from(
          ".crop-result-content > *",
          {
            y: 18,
            opacity: 0,
            stagger: 0.12,
            duration: 0.45,
          },
          "-=0.3"
        );
    }, resultRef);

    return () => ctx.revert();
  }, [result]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!form.soilType || !form.rainfall || !form.season) {
      setError("Please select soil type, rainfall, and season.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/crop/predict`,
        {
          ...form,
          rainfall: Number(form.rainfall),
        }
      );

      if (!response.data?.recommendedCrop) {
        throw new Error(
          "The server did not return a recommended crop. Please check your API response."
        );
      }

      setResult(response.data);

      // Scroll to the result after it has rendered.
      requestAnimationFrame(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    } catch (err) {
      console.error("Crop prediction error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Prediction failed. Please check your backend connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({
      soilType: "",
      rainfall: "",
      season: "",
    });
    setResult(null);
    setError("");

    if (formRef.current) {
      formRef.current.reset();
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <MainLayout>
      <div
        ref={pageRef}
        className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-lime-50 px-4 py-8 sm:px-6 lg:px-10"
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="crop-decoration absolute -right-20 top-10 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
          <div className="crop-decoration absolute -left-20 top-[450px] h-64 w-64 rounded-full bg-lime-200/30 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* Hero section */}
          <section
            ref={heroRef}
            className="mb-10 grid items-center gap-8 lg:grid-cols-[1.3fr_0.7fr]"
          >
            <div>
              <div className="crop-hero-badge mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/80 px-4 py-2 text-sm font-semibold text-green-800 shadow-sm">
                <Sparkles size={16} />
                AI-powered agriculture
              </div>

              <h1 className="crop-hero-title max-w-2xl text-4xl font-black leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Grow smarter.
                <span className="block bg-gradient-to-r from-green-700 to-lime-500 bg-clip-text text-transparent">
                  Harvest better.
                </span>
              </h1>

              <p className="crop-hero-description mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
                Discover a suitable crop for your field using soil type,
                rainfall, and seasonal conditions. Get your prediction with
                AgriLink AI.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-600">
                <span className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm">
                  <CheckCircle2 size={17} className="text-green-600" />
                  Soil-aware insights
                </span>
                <span className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm">
                  <CheckCircle2 size={17} className="text-green-600" />
                  Seasonal analysis
                </span>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="crop-decoration absolute -right-2 top-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-100 text-green-700 shadow-lg">
                <Sprout size={32} />
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-white shadow-2xl shadow-green-900/10">
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200"
                  alt="Green agricultural field"
                  className="h-72 w-full object-cover"
                />
                <div className="bg-white p-5">
                  <p className="text-sm font-semibold text-gray-500">
                    SMART FARMING
                  </p>
                  <p className="mt-1 text-xl font-bold text-gray-900">
                    Better decisions start with your field.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Prediction form */}
          <section className="crop-form-card rounded-3xl border border-green-100 bg-white/95 p-5 shadow-xl shadow-green-900/5 sm:p-8 lg:p-10">
            <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-green-700">
                  <Leaf size={17} />
                  Crop intelligence
                </div>
                <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                  Tell us about your farm
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Enter your field conditions to generate a crop prediction.
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <Sprout size={30} />
              </div>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid gap-6 md:grid-cols-3">
                {/* Soil type */}
                <div className="crop-field">
                  <label
                    htmlFor="soilType"
                    className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700"
                  >
                    <Sprout size={17} className="text-green-700" />
                    Soil type
                  </label>

                  <select
                    id="soilType"
                    name="soilType"
                    value={form.soilType}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                  >
                    <option value="">Select soil type</option>
                    {soilTypes.map((soil) => (
                      <option key={soil} value={soil}>
                        {soil}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rainfall */}
                <div className="crop-field">
                  <label
                    htmlFor="rainfall"
                    className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700"
                  >
                    <CloudRain size={17} className="text-blue-600" />
                    Annual rainfall
                  </label>

                  <select
                    id="rainfall"
                    name="rainfall"
                    value={form.rainfall}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                  >
                    <option value="">Select rainfall</option>
                    {rainfallOptions.map((rain) => (
                      <option key={rain} value={rain}>
                        {rain} mm
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-xs text-gray-400">
                    Choose the closest available value.
                  </p>
                </div>

                {/* Season */}
                <div className="crop-field">
                  <label
                    htmlFor="season"
                    className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700"
                  >
                    <CalendarDays size={17} className="text-orange-500" />
                    Growing season
                  </label>

                  <select
                    id="season"
                    name="season"
                    value={form.season}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                  >
                    <option value="">Select season</option>
                    {seasons.map((season) => (
                      <option key={season} value={season}>
                        {season}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                  <AlertCircle size={20} className="mt-0.5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row">
                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex flex-1 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-green-700 to-emerald-600 px-6 py-4 font-bold text-white shadow-lg shadow-green-800/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-800/25 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <LoaderCircle size={20} className="animate-spin" />
                      Analyzing your farm...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Predict the best crop
                      <ArrowRight
                        size={19}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-4 font-semibold text-gray-600 transition hover:border-green-300 hover:bg-green-50 hover:text-green-800"
                >
                  <RotateCcw size={17} />
                  Reset
                </button>
              </div>
            </form>
          </section>

          {/* Prediction result */}
          {result && (
            <section
              ref={resultRef}
              className="mt-10 scroll-mt-8"
              aria-live="polite"
            >
              <div className="crop-result-card overflow-hidden rounded-3xl border border-green-200 bg-white shadow-2xl shadow-green-900/10">
                <div className="h-2 bg-gradient-to-r from-green-600 via-emerald-400 to-lime-400" />

                <div className="grid items-center gap-8 p-5 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
                  {/* Crop image */}
                  <div className="crop-result-image group relative overflow-hidden rounded-2xl">
                    <img
                      src={
                        cropImages[result.recommendedCrop] ||
                        FALLBACK_IMAGE
                      }
                      alt={`${result.recommendedCrop} crop`}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
                      className="h-72 w-full object-cover transition duration-700 group-hover:scale-105 sm:h-96"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-green-800 shadow-lg">
                      <Sparkles size={16} />
                      AI recommendation
                    </div>

                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <p className="text-sm font-medium text-white/80">
                        Recommended for your conditions
                      </p>
                      <p className="mt-1 text-3xl font-black sm:text-4xl">
                        {result.recommendedCrop}
                      </p>
                    </div>
                  </div>

                  {/* Result details */}
                  <div className="crop-result-content space-y-6">
                    <div>
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-green-700">
                        <CheckCircle2 size={15} />
                        Prediction generated
                      </div>

                      <h2 className="text-3xl font-black leading-tight text-gray-900 sm:text-4xl">
                        Your next harvest starts here.
                      </h2>

                      <p className="mt-3 leading-7 text-gray-600">
                        Based on the soil, rainfall, and season you selected,
                        the model recommends{" "}
                        <span className="font-bold text-green-800">
                          {result.recommendedCrop}
                        </span>
                        .
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <Sprout
                          size={20}
                          className="mb-3 text-green-700"
                        />
                        <p className="text-xs text-gray-500">Soil type</p>
                        <p className="mt-1 text-sm font-bold text-gray-800">
                          {form.soilType}
                        </p>
                      </div>

                      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <CloudRain
                          size={20}
                          className="mb-3 text-blue-600"
                        />
                        <p className="text-xs text-gray-500">Rainfall</p>
                        <p className="mt-1 text-sm font-bold text-gray-800">
                          {form.rainfall} mm
                        </p>
                      </div>

                      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <CalendarDays
                          size={20}
                          className="mb-3 text-orange-500"
                        />
                        <p className="text-xs text-gray-500">Season</p>
                        <p className="mt-1 text-sm font-bold text-gray-800">
                          {form.season}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-lime-50 p-5">
                      <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-white p-2 text-green-700 shadow-sm">
                          <Leaf size={21} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">
                            Smart farming insight
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Use this prediction as a starting point. Confirm
                            local soil conditions, water availability, and
                            regional agricultural guidance before planting.
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-800 px-5 py-4 font-bold text-white transition hover:bg-green-900 sm:w-auto"
                    >
                      Try another prediction
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Informational cards */}
          <section className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="crop-info-card rounded-2xl border border-green-100 bg-white/80 p-5">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-800">
                <Sprout size={23} />
              </div>
              <h3 className="font-bold text-gray-900">Know your soil</h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Soil characteristics influence which crops can grow
                successfully in your field.
              </p>
            </div>

            <div className="crop-info-card rounded-2xl border border-blue-100 bg-white/80 p-5">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <CloudRain size={23} />
              </div>
              <h3 className="font-bold text-gray-900">Consider rainfall</h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Water availability and local rainfall patterns are important
                factors in crop planning.
              </p>
            </div>

            <div className="crop-info-card rounded-2xl border border-orange-100 bg-white/80 p-5">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <CalendarDays size={23} />
              </div>
              <h3 className="font-bold text-gray-900">Plan by season</h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Choose a growing season that matches local weather and crop
                requirements.
              </p>
            </div>
          </section>

          <p className="mt-8 text-center text-xs leading-5 text-gray-400">
            AgriLink AI · Crop predictions are model-generated suggestions,
            not a guarantee of yield.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default CropPrediction;
