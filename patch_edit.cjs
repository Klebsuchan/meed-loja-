const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

content = content.replace(
  "import { collection, addDoc, deleteDoc, doc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';",
  "import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';"
);

// Add editingProductId state
content = content.replace(
  "const [isAdding, setIsAdding] = useState(false);",
  "const [isAdding, setIsAdding] = useState(false);\n  const [editingProductId, setEditingProductId] = useState<string | null>(null);"
);

// Add Edit Pen icon import
content = content.replace(
  "import { Trash2, Plus, Image as ImageIcon, Package } from 'lucide-react';",
  "import { Trash2, Plus, Edit2, Image as ImageIcon, Package } from 'lucide-react';"
);

// Modify handleAddProduct
content = content.replace(
  /const handleAddProduct = async \(e: FormEvent\) => \{[\s\S]*?setIsAdding\(false\);\n      setFormData\(\{ name: '', description: '', price: '', category: 'Fones', image: '', badge: '' \}\);\n    \} catch \(error\) \{\n      console\.error\("Error adding product", error\);\n    \}\n  \};/,
  `const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const priceNumber = parseFloat(formData.price.toString().replace(',', '.'));
      const productData = {
        name: formData.name,
        description: formData.description,
        price: priceNumber,
        category: formData.category,
        image: formData.image,
        badge: formData.badge,
      };

      if (editingProductId) {
        await updateDoc(doc(db, 'products', editingProductId), productData);
      } else {
        await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: serverTimestamp()
        });
      }
      setIsAdding(false);
      setEditingProductId(null);
      setFormData({ name: '', description: '', price: '', category: 'Fones', image: '', badge: '' });
    } catch (error) {
      console.error("Error saving product", error);
    }
  };`
);

// Function to handle opening edit form
content = content.replace(
  "const handleDeleteProduct = async (id: string) => {",
  `const handleEditProduct = (product: any) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price?.toString().replace('.', ',') || '',
      category: product.category,
      image: product.image,
      badge: product.badge || ''
    });
    setEditingProductId(product.id);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduct = async (id: string) => {`
);

// Update Add button text in form
content = content.replace(
  '<button type="submit" className="bg-[#dd711c] hover:bg-[#c26217] text-white font-bold py-3 rounded-lg uppercase tracking-widest transition-colors mt-2">',
  '<button type="submit" className="bg-[#dd711c] hover:bg-[#c26217] text-white font-bold py-3 rounded-lg uppercase tracking-widest transition-colors mt-2">'
); // no change actually, just to check if it's there.

content = content.replace(
  'Adicionar Produto Salvar',
  '{editingProductId ? "Salvar Alterações" : "Adicionar Produto"}'
);

content = content.replace(
  '<button type="submit" className="bg-[#dd711c] hover:bg-[#c26217] text-white font-bold py-3 rounded-lg uppercase tracking-widest transition-colors mt-2">\n                Adicionar Produto\n              </button>',
  `<button type="submit" className="bg-[#dd711c] hover:bg-[#c26217] text-white font-bold py-3 rounded-lg uppercase tracking-widest transition-colors mt-2">
                {editingProductId ? 'Salvar Alterações' : 'Adicionar Produto'}
              </button>`
);

content = content.replace(
  '{isAdding ? \'Cancelar\' : <><Plus size={16}/> Adicionar Produto</>}',
  '{isAdding ? \'Cancelar\' : <><Plus size={16}/> Adicionar Produto</>}'
);

content = content.replace(
  'onClick={() => { setIsAdding(!isAdding);',
  'onClick={() => { setIsAdding(!isAdding); if(isAdding) { setEditingProductId(null); setFormData({ name: "", description: "", price: "", category: "Fones", image: "", badge: "" }); }'
);


// Make image optional for edit
content = content.replace(
  '<input required type="file" accept="image/*"',
  '<input type="file" accept="image/*" required={!editingProductId}'
);

content = content.replace(
  '<button onClick={() => handleDeleteProduct(product.id)} className="text-red-400 hover:text-red-300 h-fit p-2 shrink-0"><Trash2 size={20}/></button>',
  `<div className="flex gap-2 shrink-0 h-fit">
                  <button onClick={() => handleEditProduct(product)} className="text-blue-400 hover:text-blue-300 p-2"><Edit2 size={20}/></button>
                  <button onClick={() => handleDeleteProduct(product.id)} className="text-red-400 hover:text-red-300 p-2"><Trash2 size={20}/></button>
                </div>`
);


fs.writeFileSync('src/components/AdminPanel.tsx', content);
