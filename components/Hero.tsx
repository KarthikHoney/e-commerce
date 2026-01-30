import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden
                        bg-gradient-to-br from-black via-slate-900 to-black text-white">

      {/* Glow Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-600/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-14 px-6">

        {/* LEFT CONTENT */}
        <div className="space-y-6">

          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight
                         bg-gradient-to-r from-cyan-400 to-blue-500
                         bg-clip-text text-transparent">
            Latest Tech Deals
          </h1>

          <p className="text-lg text-gray-300 max-w-md">
            Premium electronics at unbeatable prices.  
            Discover the future of technology today.
          </p>

          <div className="flex gap-4">
            <button
              className="bg-gradient-to-r from-cyan-500 to-blue-600
                         px-8 py-4 rounded-full font-semibold
                         hover:scale-105 transition shadow-lg shadow-cyan-500/30"
            >
              Shop Now
            </button>

            <button
              className="border border-white/30 px-8 py-4 rounded-full
                         hover:bg-white/10 transition"
            >
              Explore
            </button>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center">

          <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full"></div>

          <Image
            src="/images/laptop.avif"
            alt="hero"
            width={520}
            height={420}
            className="relative z-10 rounded-3xl shadow-2xl
                       hover:scale-105 transition duration-500"
          />

        </div>

      </div>

    </section>
  );
}
