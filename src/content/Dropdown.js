import { useEffect, useState } from "react"
import { fetchCollections } from "../utils/collections"

export const Dropdown = ({ collections, setCollections }) => {
    const [collection] = useState([])
    const [loadingState, setLoadingState] = useState(false)

    useEffect(async () => {
        getCollections()
    }, [])

    const getCollections = async () => {
        const response = await fetchCollections(window.ethereum.selectedAddress)
        response.forEach(element => {
            collection.push(element)
        });
        console.log(collection)
        setLoadingState(true)
    }

    if (loadingState === false) {
        return (
            <div>
                loading
            </div>
        )
    } else {



        return (
            <div className="pt-5">
                <div>
                    <label htmlFor='collecton'> Collection </label>
                    <div>
                        <small>This is the collection where your item will appear.</small>
                    </div>
                </div>

                <div className='pt-2 d-flex'>
                    {loadingState === true ? (
                        <select
                            style={{ width: '100%' }}
                            onChange={(e) => { setCollections(collection[e.target.value]) }}
                        >

                            <option selected disabled hidden >Choose your collection</option>
                            {
                                collection.map((col, index) => (
                                    <option key={index} value={index}> {col.collectionName} </option>))
                            }
                        </select>
                    ) : null}

                </div>
            </div >

        )
    }
}