import { useEffect, useState } from "react";
import { transferNft, fetchMyItems } from "../utils/erc721.js";

const NFTs = () => {
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')

    useEffect (() => {
        loadNfts()
    },[])

    async function loadNfts() {
        let response = await fetchMyItems()
        const data = (response.nfts.data.ownedNfts)
        const items = await Promise.all(data.map(async i => {
            let tokenId = i.id.tokenId.toString().substr(2,i.id.tokenId.toString().length)
            tokenId = parseInt(tokenId)

            let item = {
                tokenId  ,
                image: i.metadata.image,
                name: i.metadata.name,
                description: i.metadata.description,
                contractAddress: i.contract.address,
           }
            return item
          }))
        setNfts(items) 
        setLoadingState('loaded') 
    }
    
    async function transfer(nft) {
        const address = prompt('Digite aqui o endereço para quem quer transferir')
        const  id = nft.tokenId
        const response = await transferNft(address,id)
        prompt(response.status)
    }
    
    if (loadingState === 'not-loaded'){
        return (
        <div>
            loading
        </div>
        )   
    } 
    
    if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">Nenhuma nft mintada</h1>)
        return (
            <div className="container">
                <div className="row pt-1" style={{ maxWidth: '1400px'}}>
                    {nfts.map((nft, i) => (
                        <div style={{maxWidth: '330px'}} className='d-flex justify-content-center pb-3'>
                        <button className="text-lg-center rounded border border-dark bg-light " 
                        style={{ all: 'unset',cursor:'pointer' , height:'500px', maxWidth: '300px'}} > 
                            <div key={i} className='row'>
                            <div onClick={()=> {
                                window.location.href=`/asset/${nft.contractAddress}/${nft.tokenId}`
                            }} 
                            className=" items-center"
                            >
                            <img src={nft.image} alt='' style={{ objectFit:'cover', borderRadius:'5%' ,width: '285px', height:'285px'}}  class="card-img-top" />
                                <div className=" items-center" style={{minHeight:'150px'}}>
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
                            <div className="pb-1"> 
                                <button className="btn btn-primary" href='/' onClick={() => transfer(nft)}> Transferir NFT</button>
                                
                            </div>
                            </div>
                        </button>
                        </div>
                        
                    ))}       
                </div>
            </div>
        )
}

export default NFTs;