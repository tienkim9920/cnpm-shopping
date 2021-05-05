import React, { useState, useRef } from 'react';

function Search({ handlerSearch }) {
    const [search, setSearch] = useState('')

    const delaySearchTextTimeOut = useRef(null)

    const onChangeText = (e) => {
        const value = e.target.value

        setSearch(value)

        console.log(search)

        if (handlerSearch) {

            //Nếu người dùng đang nhập thì mình clear cái giây đó
            if (delaySearchTextTimeOut.current) {
                clearTimeout(delaySearchTextTimeOut.current)
            }

            delaySearchTextTimeOut.current = setTimeout(() => {
                handlerSearch(value)
            }, 300)

        }
    }
    return (
        <div>
            <input className="form-control w-40" type="text" placeholder="Enter Search!" value={search} onChange={onChangeText} />
        </div>
    );
}

export default Search;