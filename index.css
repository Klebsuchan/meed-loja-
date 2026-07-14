import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Carlos Eduardo",
    location: "Centro, Passo Fundo",
    text: "Comprei o smartwatch de manhã e de tarde o motoboy já estava entregando. Atendimento excelente e produto original. Recomendo muito!",
    rating: 5
  },
  {
    name: "Amanda Silva",
    location: "São Cristóvão, Passo Fundo",
    text: "Fiquei com dúvida sobre qual fone escolher e fui muito bem atendida pelo WhatsApp. A entrega foi super rápida e o produto veio muito bem embalado. Pessoal super atencioso.",
    rating: 5
  },
  {
    name: "Felipe Rodrigues",
    location: "Boqueirão, Passo Fundo",
    text: "Achei incrível ter uma loja com produtos tão bons aqui na cidade, sem precisar esperar dias pelo correio. Voltarei a comprar com certeza. Produto de alta qualidade.",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 bg-[#050505] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">O que a cidade diz</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Avaliações reais de clientes da nossa região que já compraram com a Meed Loja.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#dd711c]/50 transition-colors">
              <div className="flex gap-1 mb-6 text-[#dd711c]">
                {[...Array(review.rating)].map((_, index) => (
                  <Star key={index} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-300 italic mb-8 leading-relaxed">"{review.text}"</p>
              <div>
                <p className="font-bold text-white uppercase tracking-tight">{review.name}</p>
                <p className="text-xs text-[#dd711c] uppercase tracking-widest mt-1">{review.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
