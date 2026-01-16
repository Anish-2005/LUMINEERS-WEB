"use client";
export default function FeaturedJourneys({ setCursorExpand }) {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Featured Journeys
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover stories that transport you to distant lands and hidden gems
          </p>
        </div>
        {/* Placeholder for blog cards - Same as original but enhanced */}
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div 
              key={item}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-white/20 cursor-pointer"
              onMouseEnter={() => setCursorExpand(true)}
              onMouseLeave={() => setCursorExpand(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="h-48 bg-gradient-to-br from-blue-900/50 to-purple-900/50" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-300 transition-colors">
                  Adventure Awaits
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Explore breathtaking destinations through immersive storytelling
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
