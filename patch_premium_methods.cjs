const fs = require('fs');
let code = fs.readFileSync('src/components/ParallaxHero.tsx', 'utf8');

const newUseEffect = `  useEffect(() => {
    const q = query(collection(db, 'hero_items'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          color: "from-orange-600 to-amber-600",
          glow: "shadow-[0_0_80px_rgba(221,113,28,0.4)]"
        };
      });
      
      if (items.length > 0) {
        setHeroItems(items);
      } else {
        setHeroItems(fallbackHeroItems);
      }
    });
    return () => unsubscribe();
  }, []);`;

code = code.replace(/  useEffect\(\(\) => \{\n    const q = query\(collection\(db, 'products'\)[\s\S]*?  \}, \[\]\);/, newUseEffect);
fs.writeFileSync('src/components/ParallaxHero.tsx', code);
