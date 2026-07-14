import { useState } from 'react';
import { Shield, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const policyContent = {
  termos: {
    title: 'Termos de Uso',
    text: 'Bem-vindo à Meed Loja Online. Ao acessar e usar nosso site, você concorda com nossos termos e condições. Nossos produtos estão sujeitos a disponibilidade e os preços podem ser alterados sem aviso prévio. Reservamo-nos o direito de recusar qualquer pedido. O uso de nosso site é de sua inteira responsabilidade.'
  },
  privacidade: {
    title: 'Política de Privacidade',
    text: 'A Meed Loja Online respeita a sua privacidade. Coletamos informações pessoais apenas para processar seus pedidos e melhorar sua experiência de compra. Não compartilhamos, vendemos ou alugamos seus dados para terceiros. Seus dados de pagamento são processados de forma segura e criptografada.'
  },
  cookies: {
    title: 'Política de Cookies',
    text: 'Utilizamos cookies para personalizar conteúdo, fornecer funcionalidades seguras e analisar o nosso tráfego. Você pode configurar seu navegador para recusar cookies, mas isso pode limitar algumas funcionalidades do site.'
  },
  trocas: {
    title: 'Trocas e Devoluções',
    text: 'De acordo com o Código de Defesa do Consumidor, você tem até 7 dias corridos após o recebimento do produto para solicitar a devolução por arrependimento. Para trocas por defeito de fabricação, o prazo é de 90 dias. O produto deve ser devolvido na embalagem original, sem marcas de mau uso.'
  }
};

export function Footer() {
  const [activeModal, setActiveModal] = useState<keyof typeof policyContent | null>(null);

  return (
    <>
      <footer className="bg-[#050505] pt-20 pb-10 px-4 md:px-12 mt-auto border-t border-white/10 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-full border border-[#dd711c]/30">
                <img src="/logomed.png" alt="Meed Loja Online Logo" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
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
          
          <div className="flex flex-wrap gap-12 md:gap-16">
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] text-gray-500 uppercase font-bold mb-2 tracking-widest">Produtos</h4>
              <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">Áudio</a>
              <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">Wearables</a>
              <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">Energia</a>
              <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">Acessórios</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] text-gray-500 uppercase font-bold mb-2 tracking-widest">Políticas</h4>
              <button onClick={() => setActiveModal('termos')} className="text-left text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">Termos de Uso</button>
              <button onClick={() => setActiveModal('privacidade')} className="text-left text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">Privacidade</button>
              <button onClick={() => setActiveModal('cookies')} className="text-left text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">Cookies</button>
              <button onClick={() => setActiveModal('trocas')} className="text-left text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">Trocas e Devoluções</button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 relative">
          <div className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] text-center md:text-left">
            &copy; {new Date().getFullYear()} Meed Loja Online. Todos os direitos reservados.
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest items-center pr-12 md:pr-20">
            
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setActiveModal(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#111111] border border-white/10 p-6 md:p-8 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 bg-black/50 rounded-full"
              >
                <X size={20} />
              </button>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-widest uppercase mb-6 pr-8">
                {policyContent[activeModal].title}
              </h3>
              <div className="text-gray-300 leading-relaxed space-y-4 text-sm md:text-base">
                <p>{policyContent[activeModal].text}</p>
              </div>
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setActiveModal(null)}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-6 rounded-lg uppercase tracking-widest text-xs transition-colors"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
