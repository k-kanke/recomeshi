import React, {useState} from 'react';

const SearchForm = () => {
    const [keyword, setKeyword] = useState('');

    const handleClick = () => {
        if (keyword.trim() !== '') {
            const encodedKeyword = encodeURIComponent(keyword);
            const url = `https://cookpad.com/jp/search/${encodedKeyword}`;
            window.open(url, '_blank')
        }
    }

    return (
        <div style={{ marginTop: '1rem' }}>
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