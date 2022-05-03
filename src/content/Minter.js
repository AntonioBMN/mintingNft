/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { mintERC1155 } from "../utils/erc1155";
import { BsImageFill } from 'react-icons/bs';

import { pinFile, json } from "../utils/utils";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from "./Dropdown";
import { Proprieties } from "./Proprieties";
import { Levels } from "./Levels";
import { Status } from "./Status";

const Minter = () => {
  const [formInput, updateFormInput] = useState({ name: '', description: '', amount: '', externalLink: '' })
  
  const [show3, setShow3] = useState(false)
  const [collections, setCollections] = useState()


  const [inputList, setInputList] = useState([{ 'trait_type': '', 'value': '' }])
  const [inputLevelList, setInputLevelList] = useState([{ 'trait_type': '', 'value': '3', 'max_value': '5' }])
  const [inputStatusList, setInputStatusList] = useState([{ 'trait_type': '', 'value': '3', 'max_value': '5', 'display_type': 'number' }])

  const [file, setFile] = useState('')
  const hiddenFileInput = useState(null)

  const mint1155 = async () => {
    const { name, description, amount, externalLink } = formInput
    if (!name || !description || !amount || !file) {
      alert('Há campos faltando')
      return
    }

    let PinataResponse = await pinFile(file)
    const metadata = json(name, PinataResponse.pinataUrl, externalLink, description, inputList, inputLevelList, inputStatusList)
    console.log(metadata)
    await mintERC1155(metadata, amount);
    window.location.href = '/FTs'
  };


  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    setFile(event.target.files[0])

  };


  return (
    <div className="container justify-content-start" style={{ maxWidth: '800px' }}>
      <div>
        <header>
          <h1 className="text-lg pt-3 text-bold">Criar novo item</h1>
        </header>

        <form >
          <div className="form-group" style={{ width: '100%' }}>
            <div className="pt-3">
              <label htmlFor='imagem'> Adicione aqui a sua imagem.  </label>
              <div className="pt-3">
                {file !== '' ? (
                  <div className="card d-flex justify-content-center" style={{ borderRadius: '5%', width: '350px', height: '257px' }}>
                    <img alt='' src={URL.createObjectURL(file)}
                      style={{ borderRadius: '5%', width: '350px', height: '257px', objectFit: 'cover' }} ></img>
                  </div>
                ) : (
                  <button style={{ all: 'unset', cursor: 'pointer' }} type='button' onClick={handleClick}>
                    <div className="card d-flex justify-content-center" style={{ borderRadius: '5%', width: '350px', height: '257px' }}>
                      <div className=" d-flex justify-content-center"> <BsImageFill size={80} /> </div>
                      <input
                        type="file"
                        ref={hiddenFileInput}
                        onChange={handleChange}
                        style={{ display: 'none' }}>
                      </input>
                    </div>
                  </button>
                )}
              </div>

            </div>
          </div>

          <div className="form-group pt-5" >
            <label htmlFor='name'> Nome </label>
            <div>
              <input
                placeholder='Nome do item'
                style={{ width: '100%' }}
                id='name'
                className='text-start mt-2 md-textarea form-control'
                onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group pt-5" >
            <label htmlFor='externalLink'> Link Externo </label>
            <div>
              <input
                placeholder='https://seuitem.io/item/123'
                style={{ width: '100%' }}
                id='externalLink'
                className='text-start mt-6 md-textarea form-control'
                onChange={e => updateFormInput({ ...formInput, externalLink: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group pt-5" >
            <label htmlFor='description'> Descrição </label>
            <div>
              <textarea
                placeholder='Escreva uma descrição detalhada do item'
                style={{ width: '100%' }}
                id='description'
                rows={4}
                className='text-start mt-2 md-textarea form-control'
                onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
              />
            </div>
          </div>

          <Dropdown collections={collections} setCollections={setCollections} />
 
          <Proprieties  inputList={inputList} setInputList={setInputList}  ></Proprieties>

          <Levels  inputLevelList={inputLevelList} setInputLevelList={setInputLevelList}  ></Levels>
          
          <Status  inputStatusList={inputStatusList} setInputStatusList={setInputStatusList}  ></Status>
          

          <div className="form-group pt-5" >
            <label htmlFor='name'> Supply </label>
            <div>
              <input
                placeholder='1'
                style={{ width: '100%' }}
                id='name'
                className='text-start mt-2 md-textarea form-control'
                type='number'
                onChange={e => updateFormInput({ ...formInput, amount: e.target.value })}
              />
            </div>
          </div>
          <div className="pt-3">
            <button
              style={{ width: '100px', height: '50px', background: '#2fa39d', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}
              onClick={mint1155}
              type='button'
              href='/NFTs' className="mt-3 text-light">
              Criar
            </button>
          </div>

        </form>
        <div className="pb-5"></div>
      </div>
    </div>
  )
}

export default Minter;
