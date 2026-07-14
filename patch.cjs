const fs = require('fs');
let content = fs.readFileSync('src/components/ParallaxHero.tsx', 'utf8');

// Restore Comprar Agora on the left content
content = content.replace(
`          <AnimatePresence mode="wait">
            <motion.p
              key={\`desc-\${currentIndex}\`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm md:text-lg text-gray-400 max-w-md mb-8 md:mb-10 leading-relaxed border-l-2 border-transparent md:border-[#dd711c] pl-0 md:pl-6"
            >
              Tecnologia de ponta e design focado no seu estilo. {currentItem.subtitle} disponível agora.
            </motion.p>
          </AnimatePresence>
          
        </motion.div>`,
`          <AnimatePresence mode="wait">
            <motion.p
              key={\`desc-\${currentIndex}\`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm md:text-lg text-gray-400 max-w-md mb-8 md:mb-10 leading-relaxed border-l-2 border-transparent md:border-[#dd711c] pl-0 md:pl-6"
            >
              Tecnologia de ponta e design focado no seu estilo. {currentItem.subtitle} disponível agora.
            </motion.p>
          </AnimatePresence>
          
          <div className="flex items-center space-x-4 md:space-x-6 mt-2 md:mt-4">
            <motion.button
              onClick={() => onProductSelect(currentItem)}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-[#dd711c] text-white px-6 md:px-10 py-4 md:py-5 font-black uppercase text-[10px] md:text-sm tracking-widest hover:bg-white hover:text-[#dd711c] transition-colors"
            >
              Comprar Agora
            </motion.button>
          </div>
        </motion.div>`
);

// Restore Title and Price layout on the right content
content = content.replace(
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
              </div>`,
`              <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-[320px] md:w-full px-2 md:px-4 border-t border-white/10 pt-4 pb-6 md:pb-4 gap-2 md:gap-0">
                <div className="flex flex-col text-left">
                  <span className="text-lg md:text-2xl font-black uppercase tracking-tight text-white leading-tight">{currentItem.title}</span>
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">{currentItem.subtitle}</span>
                </div>
                <span className="text-lg md:text-xl font-mono font-black text-[#dd711c]">{currentItem.price}</span>
              </div>`
);

fs.writeFileSync('src/components/ParallaxHero.tsx', content);
