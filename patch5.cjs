const fs = require('fs');
let content = fs.readFileSync('src/components/ParallaxHero.tsx', 'utf8');

content = content.replace(
`          <div className="flex items-center space-x-4 md:space-x-6 mt-2 md:mt-4">
            <motion.button
              onClick={() => onProductSelect(currentItem)}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-[#dd711c] text-white px-6 md:px-10 py-4 md:py-5 font-black uppercase text-[10px] md:text-sm tracking-widest hover:bg-white hover:text-[#dd711c] transition-colors"
            >
              Comprar Agora
            </motion.button>
          </div>`,
``
);

content = content.replace(
`              <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-[320px] md:w-full px-2 md:px-4 border-t border-white/10 pt-4 pb-6 md:pb-4 gap-2 md:gap-0">
                <div className="flex flex-col text-left">
                  <span className="text-lg md:text-2xl font-black uppercase tracking-tight text-white leading-tight">{currentItem.title}</span>
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">{currentItem.subtitle}</span>
                </div>
                <span className="text-lg md:text-xl font-mono font-black text-[#dd711c]">{currentItem.price}</span>
              </div>`,
`              <div className="flex flex-col w-[320px] md:w-full px-2 md:px-4 border-t border-white/10 pt-4 pb-6 md:pb-4 gap-4">
                <div className="flex flex-col text-left">
                  <span className="text-lg md:text-2xl font-black uppercase tracking-tight text-white leading-tight">{currentItem.title}</span>
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">{currentItem.subtitle}</span>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-xl md:text-3xl font-mono font-black text-[#dd711c]">{currentItem.price}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); onProductSelect(currentItem); }}
                    className="bg-[#dd711c] text-white px-6 py-3 font-black uppercase text-[10px] md:text-xs tracking-widest hover:bg-white hover:text-[#dd711c] transition-colors"
                  >
                    Comprar Agora
                  </button>
                </div>
              </div>`
);

content = content.replace(
`          {/* Carousel Controls */}
          <div className="relative flex mt-6 md:mt-8 space-x-4 z-40 md:self-end md:pr-4">
            <button onClick={prevSlide} className="w-12 h-12 md:w-14 md:h-14 bg-[#1a1a1a] border border-white/10 flex items-center justify-center hover:bg-[#dd711c] hover:border-[#dd711c] transition-all text-white group shadow-lg rounded-none">
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button onClick={nextSlide} className="w-12 h-12 md:w-14 md:h-14 bg-[#1a1a1a] border border-white/10 flex items-center justify-center hover:bg-[#dd711c] hover:border-[#dd711c] transition-all text-white group shadow-lg rounded-none">
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>`,
`          {/* Carousel Controls */}
          <div className="absolute top-[190px] md:top-[250px] lg:top-[300px] left-1/2 -translate-x-1/2 -translate-y-1/2 flex w-[360px] md:w-[490px] justify-between px-2 pointer-events-none z-40">
            <button onClick={prevSlide} className="w-12 h-12 md:w-14 md:h-14 bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#dd711c] hover:border-[#dd711c] transition-all text-white group shadow-lg rounded-full pointer-events-auto">
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button onClick={nextSlide} className="w-12 h-12 md:w-14 md:h-14 bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#dd711c] hover:border-[#dd711c] transition-all text-white group shadow-lg rounded-full pointer-events-auto">
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>`
);

fs.writeFileSync('src/components/ParallaxHero.tsx', content);
