export function TopBar() {
  return (
    <div className="bg-[#dd711c] text-white text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider md:tracking-widest py-2 px-2 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center">
        <span className="flex items-center justify-center gap-1.5">
          <span className="text-sm shrink-0">🛵</span> 
          <span className="leading-tight">Entrega via Motoboy no mesmo dia para Passo Fundo</span>
        </span>
        <span className="hidden md:flex items-center justify-center gap-1.5">
          <span className="text-sm shrink-0">💻</span> 
          <span className="leading-tight">Loja 100% online e segura</span>
        </span>
        <span className="hidden lg:flex items-center justify-center gap-1.5">
          <span className="text-sm shrink-0">✅</span> 
          <span className="leading-tight">Assistência e suporte local</span>
        </span>
      </div>
    </div>
  );
}
