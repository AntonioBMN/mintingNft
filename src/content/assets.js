import { useEffect, useState } from "react";
import { fetchNftData } from "../utils/openSea"
import { getTokenAmount, transferERC1155 } from "../utils/erc1155"
import { transferNft } from "../utils/erc721"

const Assets = () => {
    const [loadingState, setLoadingState] = useState('not-loaded')
    const [nft, setNft] = useState()
    const [blockchain, setBlockchain] = useState()

    useEffect(() => {
        loadNft()
        let blockchain = loadBlockchain()
        setBlockchain(blockchain)
    }, [])

    const loadBlockchain = () => {
        let block;
        switch (window.ethereum.chainId) {
            case "0x1":
                block = "Ethereum";
                break;
            case "0x38":
                block = "Binance";
                break;
            case "0x89":
                block = "Polygon";
                break;
            case "0x13881":
                block = "Mumbai Tesnet";
                break;
            default:
                return (block = "Ethereum");
        }
        return block;
    };

    const loadNft = async () => {
        const split = window.location.href.split('/')
        const contract = split[4]
        const id = split[5]

        const response = await fetchNftData(contract, id)
        const data = response.nfts.data
        console.log(data)

        if (data.id.tokenMetadata.tokenType === 'ERC1155') {
            const amount = await getTokenAmount(window.ethereum.selectedAddress, id)
            const nft = {
                name: data.metadata.name,
                description: data.description,
                tokenId: data.id.tokenId,
                image: data.metadata.image,
                contract: data.contract.address,
                contractModel: data.id.tokenMetadata.tokenType,
                amount
            }
            console.log(nft)
            setNft(nft)
        } else {
            const nft = {
                name: data.metadata.name,
                description: data.description,
                tokenId: data.id.tokenId,
                image: data.metadata.image,
                contract: data.contract.address,
                contractModel: data.id.tokenMetadata.tokenType
            }
            console.log(nft)
            setNft(nft)
        }


        setLoadingState('loaded')
    }

    const erc721Transfer = async (id) => {
        const address = prompt('Digite aqui o endereço para quem quer transferir')
        const response = await transferNft(address, id)
        prompt(response.status)
    }

    const erc1155Transfer = async (id) => {
        const address = prompt('Digite aqui o endereço para quem quer transferir')
        const amount = prompt('Digite aqui a quantidade que quer transferir')

        const response = await transferERC1155(address, id, amount)
        prompt(response.status)
    }

    if (loadingState === 'loaded') {
        return (
            <div className="container-fluid d-flex justify-content-between" style={{ width: '1300px' }}>
                <div className="pt-3 row d-flex justify-content-center" style={{ width: '450px', height: '550px', textAlign: "center" }}>
                    <div className="card d-flex justify-content-center" style={{ width: '450px', height: '350px' }} >
                        <div className="d-flex justify-content-center">
                            <img src={nft.image} alt='nft' style={{ objectFit:'contain', maxWidth: '425px', minHeight: '300px', borderRadius: '5%' }} />
                        </div>
                    </div>
                    <div className="pt-3" />
                    <div className="pt-3 card" style={{ paddingBottom: '15px' }}>
                        <div className="d-flex justify-content-center ">
                            <div className="card-body" style={{ maxWidth: '450px'}}>
                                <div className="text-left">
                                    <div className="d-flex justify-content-start border-bottom border-dark">
                                        <p className="font-weight-bold"> Descrição </p>
                                    </div>
                                    <div>
                                        <p className="text-left"> {nft.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-3" />

                </div>

                <div className="pt-3 row flex-column" style={{ width: '830px', height: '750px' }}>
                    <div style={{ height: '90px' }}>
                        <div className="d-flex justify-content-between pt-1">
                            <a style={{ paddingLeft: '4px', textDecoration: 'none' }} href={`https://rinkeby.etherscan.io/address/${nft.contract}`}> NFT - {nft.contract.substr(0, 5)} </a>
                            {
                                nft.contractModel === "ERC721" ? (
                                    <button style={{ width: '100px', height: '35px' }} className='btn btn-outline-dark' onClick={() => erc721Transfer(nft.tokenId)}> transfer </button>
                                ) : (
                                    <button style={{ width: '100px', height: '35px' }} className='btn btn-outline-dark' onClick={() => erc1155Transfer(nft.tokenId)}> transfer </button>)
                            }
                        </div>
                        <h1 style={{ paddingBottom: '30px' }}> {nft.name} </h1>


                    </div>
                    <div style={{ paddingBottom: '20px' }} />
                    <div className="card pt-3" style={{ minHeight: '300px' }} >
                        <div className="card-body">

                            <div className="card-title text-center border-bottom border-dark">
                                <h1 style={{ fontWeight: 'bold', fontSize: '25px' }}> Detalhes em blockchain </h1>
                            </div >
                            <div className="card-text text-center">
                                <h1 style={{ fontWeight: 'normal', fontSize: '20px', color: 'grey' }}> ID do NFT </h1>
                                <p style={{ fontSize: '16px', fontWeight: 'bold' }}> {nft.tokenId}</p>
                                <h1 style={{ fontWeight: 'normal', fontSize: '20px', color: 'grey' }}> Endereço do Contrato </h1>
                                <p>
                                    <a style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 'bold', color: 'inherit' }} onMouseOver={(e) => {
                                        e.target.style.color = 'blue'
                                    }} onMouseOut={(e) => {
                                        e.target.style.color = 'inherit'
                                    }} href={`https://rinkeby.etherscan.io/address/${nft.contract}`}>{`${nft.contract.substr(0, 5)}...${nft.contract.substr(nft.contract.length - 10, nft.contract.length - 1)}`}</a>
                                </p>
                                <h1 style={{ fontWeight: 'normal', fontSize: '20px', color: 'grey' }}> Blockchain </h1>
                                <p style={{ fontSize: '16px', fontWeight: 'bold' }}> {blockchain} </p>
                                {nft.contractModel === 'ERC1155' ? (
                                    <>
                                        <h1 style={{ fontWeight: 'normal', fontSize: '20px', color: 'grey' }}> Quantidade Adquirida </h1>
                                        <p style={{ fontSize: '16px', fontWeight: 'bold' }}> {nft.amount} </p>
                                    </>
                                ) : null}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                loading
            </div>
        )
    }

}
export default Assets;