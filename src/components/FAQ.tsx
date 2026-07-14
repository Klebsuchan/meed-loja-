import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Como funciona a entrega?",
    answer: "Trabalhamos com as melhores transportadoras para garantir que seu pedido chegue rápido e em segurança. O prazo de entrega varia de acordo com a sua região, podendo ser calculado no carrinho de compras."
  },
  {
    question: "Qual é o tempo de garantia dos produtos?",
    answer: "Todos os nossos relógios possuem garantia de fábrica de 2 meses contra defeitos de fabricação. Caso tenha algum problema, basta entrar em contato com nossa equipe."
  },
  {
    question: "Como funciona o suporte ao cliente?",
    answer: "Nosso suporte está disponível de segunda a sexta, das 9h às 18h. Você pode nos contatar via WhatsApp, e-mail ou pelo formulário de contato em nosso site. Estamos prontos para te ajudar!"
  },
  {
    question: "Posso devolver se não gostar?",
    answer: "Sim! Você tem até 7 dias corridos após o recebimento para solicitar a devolução do produto caso não esteja satisfeito. O processo é simples e rápido."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-[#050505] relative z-10 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">Perguntas Frequentes</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Tire suas dúvidas sobre nossos produtos, envios e políticas.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-white/10 bg-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex items-center justify-between w-full p-6 text-left"
              >
                <span className="font-bold text-white pr-4">{faq.question}</span>
                <ChevronDown 
                  className={`text-[#dd711c] shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  size={20} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-gray-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
