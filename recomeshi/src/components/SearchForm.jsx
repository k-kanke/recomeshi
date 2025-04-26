import React, {useState} from 'react';

const items = {
    野菜: ["大根", "玉ねぎ", "人参", "白菜", "キャベツ", "ネギ", "じゃがいも"],
    肉: ["鶏もも肉", "豚バラ", "豚ロース", "牛肉", "ひき肉"],
    魚: ["鮭", "鯖", "アジ", "タラ", "いわし"]
}

// サイトごとの検索URL
const siteUrls = {
    "クックパッド": "https://cookpad.com/jp/search/",
    "クラシル": "https://www.kurashiru.com/search?query=",
    "デリッシュキッチン": "https://delishkitchen.tv/search?q=",
  };


//サイトごとの検索URL
const SearchForm = () => {
    const [keyword, setKeyword] = useState('');
    const [currentCategory, setCurrentCategory] = useState('');
    const [history, setHistory] = useState([]);
    const [selectedSite, setSelectedSite] = useState('クックパッド'); //デフォルトはCookpadに設定
    const [selectedDishType, setSelectedDishType] = useState('');


//料理ジャンルリスト
const dishTypes = ["おかず", "汁物", "副菜", "サラダ", "おやつ"]


    //「レシピを探す」ボタンをクリックしたとき実行
    const handleClick = () => {
        if (keyword.trim() !== '') {

            setHistory([keyword, ...history.slice(0, 4)]); //直近5件だけ保存

            let searchKeyword = keyword; //料理ジャンルが選択されていたら、検索URLに食材と一緒に埋め込む
            if (selectedDishType) {
                searchKeyword += `　${selectedDishType}`;
            }

            const encodedKeyword = encodeURIComponent(searchKeyword.trim());
            const baseUrl = siteUrls[selectedSite];
            const url = `${baseUrl}${encodedKeyword}`;

            window.open(url, '_blank')
        }
    };

    // カテゴリボタンを押した時
    const handleCategoryClick = (category) => {
        setCurrentCategory(category); // 選択中カテゴリを記録
        proposeRandomItem(category);
    };

    // ランダムで食材提案
    const proposeRandomItem = (category) => {
        const categoryItems = items[category];
        if (categoryItems && categoryItems.length > 0) {
            const randomItem = categoryItems[Math.floor(Math.random() * categoryItems.length)];
            setKeyword(randomItem);
        }
    };

    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6">
                <h1 className="text-2xl font-bold text-center text-gray-800">RECOMESHI</h1>

                {/* サイト選択セレクトボックス */}
                <div className='flex items-center space-x-2'>
                    <label className='font-semibold text-gray-700'>料理サイト：</label>
                    <select
                        value={selectedSite}
                        onChange={(e) => setSelectedSite(e.target.value)}
                        className="border rounded-lg p-2 flex-1"
                    >
                    {Object.keys(siteUrls).map((site) => (
                        <option key={site} value={site}>
                            {site}
                        </option>
                    ))}
                    </select>
                </div>

                {/* 料理ジャンル選択 */}
                <div className="flex items-center space-x-2">
                    <label className="font-semibold text-gray-700">料理ジャンル：</label>
                    <select
                        value={selectedDishType}
                        onChange={(e) => setSelectedDishType(e.target.value)}
                        className="border rounded-lg p-2 flex-1"
                    >
                    <option value="">選択なし</option> {/* 何も選ばない状態 */}
                    {dishTypes.map((dish) => (
                        <option key={dish} value={dish}>
                            {dish}
                        </option>
                    ))}
                    </select>
                </div>

                {/* カテゴリボタン */}
                <div className="flex flex-wrap gap-2 justify-center">
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

                {/* もう一回提案ボタン（今カテゴリ選んでる時だけ出す） */}
                {currentCategory && (
                    <div className="text-center">
                        <button
                            onClick={() => proposeRandomItem(currentCategory)}
                            className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-full transition"
                        >
                            同じカテゴリでもう一度提案する
                        </button>
                    </div>
                )}

                {/* 検索ボックスとボタン */}
                <div className="text-center">
                    <input
                        type="text" 
                        placeholder='食材を入力...'
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button 
                        onClick={handleClick} 
                        className="bg-green-400 hover:bg-green-400 text-gray-100 py-2 px-4 rounded-lg transition ml-2"
                    >
                        レシピを探す
                    </button>
                </div>

                {/* 最近の検索履歴 */}
                {history.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">最近の検索履歴</h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {history.map((item, index) => (
                            <li key={index} style={{ marginTop: '0.5rem' }}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchForm