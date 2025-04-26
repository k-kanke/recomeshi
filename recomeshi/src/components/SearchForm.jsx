import React, {useState} from 'react';

const items = {
    野菜: ["大根", "玉ねぎ", "人参", "白菜", "キャベツ", "ネギ", "じゃがいも"],
    肉: ["鶏もも肉", "豚バラ", "豚ロース", "牛肉", "ひき肉"],
    魚: ["鮭", "鯖", "アジ", "タラ", "いわし"]
}


const SearchForm = () => {
    const [keyword, setKeyword] = useState('');

    const handleClick = () => {
        if (keyword.trim() !== '') {
            const encodedKeyword = encodeURIComponent(keyword);
            const url = `https://cookpad.com/jp/search/${encodedKeyword}`;
            window.open(url, '_blank')
        }
    };

    // カテゴリボタンを押した時
    const handleCategoryClick = (category) => {
        const categoryItems = items[category];
        if (categoryItems && categoryItems.length > 0) {
        const randomItem = categoryItems[Math.floor(Math.random() * categoryItems.length)];
        setKeyword(randomItem);
        }
    };

    return (
        <div style={{ marginTop: '1rem' }}>
            <h2>カテゴリ別提案</h2>
            {/* カテゴリボタン */}
            <div style={{ marginBottom: '1rem' }}>
                {Object.keys(items).map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        style={{ margin: '0.5rem', padding:'0.5rem 1rem' }}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* 検索ボックスとボタン */}
            <input
                type="text" 
                placeholder='食材を入力...'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ padding: '0.5rem', width:'200rem', marginRight: '1rem'}}
            />
            <button onClick={handleClick} style={{ padding: '0.5rem 1rem' }}>
                レシピを探す
            </button>
        </div>
    );
};

export default SearchForm