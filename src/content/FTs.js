import { useEffect, useState } from "react";
import { fetchMyItems, transferERC1155, getTokenAmount } from "../utils/erc1155.js";

const FTs = () => {
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')

    useEffect(() => {
        loadNfts()
    }, [])

    async function loadNfts() {
        let response = await fetchMyItems()
        console.log(response)
        const data = (response.nfts.data.ownedNfts)
        console.log(data)
        const items = await Promise.all(data.map(async i => {
            let tokenId = i.id.tokenId.toString().substr(2, i.id.tokenId.toString().length)
            tokenId = parseInt(tokenId)
            const amount = await getTokenAmount(window.ethereum.selectedAddress, tokenId)
            console.log('teste')
            let item = {
                tokenId,
                image: i.metadata.image,
                name: i.metadata.name,
                description: i.metadata.description,
                contractAddress: i.contract.address,
                amount
            }
            console.log(item)
            return item
        }))
        setNfts(items)
        setLoadingState('loaded')
    }

    async function transfer(nft) {
        const address = prompt('Digite aqui o endereço para quem quer transferir')
        const amount = prompt('Digite aqui a quantidade que quer transferir')

        const id = nft.tokenId
        const response = await transferERC1155(address, id, amount)
        prompt(response.status)
    }

    if (loadingState === 'not-loaded') {
        return <div>
            loading
        </div>
    }

    if (loadingState === 'loaded' && !nfts.length)
        return (<h1 className="px-20 py-10 text-3xl">Nenhuma nft mintada</h1>)

    return (
        <div className="container">
            <div className=" row pt-1" style={{ maxWidth: '1400px' }}>
                {nfts.map((nft, i) => (
                    <div style={{ maxWidth: '330px' }} className=' d-flex justify-content-center pb-3'>
                        <button className="text-lg-center rounded border border-dark bg-light "
                            style={{ all: 'unset', cursor: 'pointer', height: '500px', maxWidth: '300px' }} >
                            <div key={i} className='row'>
                                <div onClick={() => {
                                    window.location.href = `/asset/${nft.contractAddress}/${nft.tokenId}`
                                }} className="text-lg-left"
                                >
                                    <img src={nft.image} alt='' style={{ objectFit:'cover', width: '285px', height: '285px' }} className="card-img-top" />
                                    <div className="d-flex justify-content-center"> 
                                        <div className="  text-center" style={{minHeight:'125px', maxWidth: '250px'}}>
                                            <h1 className="text-lg">{nft.name} </h1>
                                            <div >
                                                {
                                                nft.description.length > 50 ? (
                                                    <p style={{ whiteSpace: "normal" }} className="text-gray-400">{nft.description.substr(0, 50)}...</p>

                                                ) : (<p style={{ whiteSpace: "normal" }} className="text-gray-400">{nft.description}</p>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-400">Quantidade: {nft.amount}</p>
                                </div>
                                <div>
                                    <button className="btn btn-primary" onClick={() => transfer(nft)}> Transferir NFT</button>
                                </div>
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default FTs;