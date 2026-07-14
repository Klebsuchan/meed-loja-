const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

const methods = `
  const handlePremiumImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPremiumFormData({ ...premiumFormData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPremiumItem = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const itemData = {
        title: premiumFormData.title,
        subtitle: premiumFormData.subtitle,
        price: premiumFormData.price,
        image: premiumFormData.image,
      };

      if (editingProductId) {
        await updateDoc(doc(db, 'hero_items', editingProductId), itemData);
      } else {
        await addDoc(collection(db, 'hero_items'), { ...itemData, createdAt: serverTimestamp() });
      }

      setPremiumFormData({ title: '', subtitle: '', price: '', image: '' });
      setIsAdding(false);
      setEditingProductId(null);
    } catch (error) {
      console.error("Error saving premium item:", error);
    }
  };

  const handleEditPremiumItem = (item: any) => {
    setPremiumFormData({
      title: item.title || '',
      subtitle: item.subtitle || '',
      price: item.price || '',
      image: item.image || ''
    });
    setEditingProductId(item.id);
    setIsAdding(true);
  };

  const handleDeletePremiumItem = async (id: string) => {
    await deleteDoc(doc(db, 'hero_items', id));
  };
`;

code = code.replace(/const handleDeleteOrder =/, methods + '\n  const handleDeleteOrder =');

fs.writeFileSync('src/components/AdminPanel.tsx', code);
