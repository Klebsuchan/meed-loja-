const fs = require('fs');
let content = fs.readFileSync('src/components/ParallaxHero.tsx', 'utf8');

content = content.replace(
`          {/* Carousel Controls */}
          <div className="absolute top-[190px] md:top-[250px] lg:top-[300px] left-1/2 -translate-x-1/2 -translate-y-1/2 flex w-[360px] md:w-[490px] justify-between px-2 pointer-events-none z-40">
            <button onClick={prevSlide} className="w-12 h-12 md:w-14 md:h-14 bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#dd711c] hover:border-[#dd711c] transition-all text-white group shadow-lg rounded-full pointer-events-auto">
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button onClick={nextSlide} className="w-12 h-12 md:w-14 md:h-14 bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#dd711c] hover:border-[#dd711c] transition-all text-white group shadow-lg rounded-full pointer-events-auto">
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>`,
`          {/* Carousel Controls */}
          <div className="relative flex mt-6 md:mt-8 space-x-4 z-40 md:self-end md:pr-4">
            <button onClick={prevSlide} className="w-12 h-12 md:w-14 md:h-14 bg-[#1a1a1a] border border-white/10 flex items-center justify-center hover:bg-[#dd711c] hover:border-[#dd711c] transition-all text-white group shadow-lg rounded-none">
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button onClick={nextSlide} className="w-12 h-12 md:w-14 md:h-14 bg-[#1a1a1a] border border-white/10 flex items-center justify-center hover:bg-[#dd711c] hover:border-[#dd711c] transition-all text-white group shadow-lg rounded-none">
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>`
);

fs.writeFileSync('src/components/ParallaxHero.tsx', content);
