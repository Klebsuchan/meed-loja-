export function AboutUs() {
  return (
    <section id="sobre" className="py-24 bg-[#111111] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6">De Passo Fundo<br/><span className="text-[#dd711c]">Para a Região</span></h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            A Meed Loja Online nasceu com o propósito de trazer o que há de mais moderno em tecnologia e acessórios com a agilidade que só o comércio local pode oferecer.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Nossa operação é 100% digital e focada em Passo Fundo, oferecendo atendimento personalizado, garantia de verdade e a facilidade de receber seu produto no conforto da sua casa no mesmo dia via motoboy.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Nossa missão é conectar você às melhores inovações com segurança e sem dor de cabeça. Compre de quem está perto de você!
          </p>
        </div>
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden border border-white/10 group">
          <img 
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800" 
            alt="Nosso Estoque" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-white font-bold uppercase tracking-widest text-sm mb-1">Nosso Estoque Local</p>
            <p className="text-gray-400 text-xs">Passo Fundo, RS</p>
          </div>
        </div>
      </div>
    </section>
  );
}
