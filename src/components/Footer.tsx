import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#050505] pt-20 pb-10 px-4 md:px-12 mt-auto border-t border-white/10 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
        <div className="flex flex-col gap-6 max-w-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-full border border-[#dd711c]/30">
              <img src="/logomeednovo.png" alt="Meed Loja Online Logo" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
              <div className="hidden text-xs font-bold text-[#dd711c]">M</div>
            </div>
            <span className="text-xl font-bold tracking-widest uppercase text-white">Meed Loja Online</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-[#dd711c] pl-4">
            Acessórios eletrônicos que unem design sofisticado, alta tecnologia e durabilidade para acompanhar o seu estilo de vida.
          </p>
          <div className="mt-2">
            <a href="#admin" onClick={() => window.scrollTo(0, 0)} className="text-gray-600 hover:text-[#dd711c] transition-colors inline-flex items-center gap-2" title="Área Restrita (Guardião)">
              <Shield size={14} />
            </a>
          </div>
        </div>
        
        <div className="flex gap-16">
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] text-gray-500 uppercase font-bold mb-2 tracking-widest">Produtos</h4>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">Áudio</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">Wearables</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">Energia</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">Acessórios</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] text-gray-500 uppercase font-bold mb-2 tracking-widest">Suporte</h4>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">FAQ</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">Garantia</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">Contato</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">Rastreio</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 relative">
        <div className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} Meed Loja Online. Todos os direitos reservados.
        </div>
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest items-center pr-12 md:pr-20">
          
          
        </div>
      </div>
    </footer>
  );
}
