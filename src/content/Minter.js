/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { mintERC1155 } from "../utils/erc1155";
import { BsImageFill, BsPlus } from 'react-icons/bs';
import { FaRegMoon } from 'react-icons/fa';
import { FiBarChart2 } from 'react-icons/fi';
import { MdFormatListBulleted, MdClose } from 'react-icons/md';
import { pinFile, json } from "../utils/utils";


import Modal from "react-bootstrap/Modal";
import 'bootstrap/dist/css/bootstrap.min.css';

const Minter = () => {
  const [formInput, updateFormInput] = useState({ name: '', description: '', amount: '', externalLink: '' })
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [show3, setShow3] = useState(false)

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

  const HandlePropChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { trait_type: "", value: "" }]);
  };

  const HandleLevelChange = (e, index) => {
    const { name, value } = e.target;
    if (value<0) { 
      return 
    }
    if (name === 'value' && parseInt(value) > inputLevelList[index]['max_value'] ) {
      return
    }

    const list = [...inputLevelList];
    list[index][name] = value;
    setInputLevelList(list);
  };

  const handleRemoveLevelClick = index => {
    const list = [...inputLevelList];
    list.splice(index, 1);
    setInputLevelList(list);
  };

  const handleAddLevelClick = () => {
    setInputLevelList([...inputLevelList, { trait_type: "", value: "", max_value: "" }]);
  };

  const HandleStatusChange = (e, index) => {
    const { name, value } = e.target;
    if (value<0) { 
      return 
    }
    if (name === 'value' && parseInt(value) > inputStatusList[index]['max_value'] ) {
      return
    }

    const list = [...inputStatusList];
    list[index][name] = value;
    setInputStatusList(list);
  };

  const handleRemoveStatusClick = index => {
    const list = [...inputStatusList];
    list.splice(index, 1);
    setInputStatusList(list);
  };

  const handleAddStatusClick = () => {
    setInputStatusList([...inputStatusList, { trait_type: "", value: "", max_value: "", display_type: 'number' }]);
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


          <div className="d-flex justify-content-between pt-5"  >
            <div className="d-flex justify-content-start">
              <div>
                <MdFormatListBulleted size={25} />
              </div>
              <div style={{ paddingLeft: '5px' }}>
                <p style={{ padding: '0', margin: '0' }} className="font-weight-bold"> Propriedades </p>
                <small className="text-muted"> Textual traits that show up as rectangles. </small>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button style={{ borderRadius: '20%', all: 'unset', cursor: 'pointer' }} type='button' onClick={() => setShow1(true)}>
                <div className="card d-flex justify-content-center" style={{ borderRadius: '25%', width: '50px', height: '50px' }}>
                  <div className="d-flex justify-content-center"> <BsPlus size={24} color={'#213213'} /></div>
                </div>
              </button>
              <Modal show={show1} onHide={() => setShow1(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Adicionar Propriedades</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <small>Properties show up underneath your item, are clickable, and can be filtered in your collection's sidebar.</small>
                  <div className="form-group pt-5" >
                    {
                      inputList.map((x, i) => {
                        return (
                          <div key={i} className="d-flex justify-content-between pt-3">
                            <div>
                              <div className="d-flex form-control" style={{ width: '98%', padding: '0' }}>
                                <div className="d-flex justify-content-center" style={{ width: '50px' }}>
                                  {
                                    inputList.length !== 1 ?
                                      (<button style={{ all: 'unset', cursor: 'pointer' }} type='button' onClick={() => handleRemoveClick(i)}>
                                        <MdClose size={27} />
                                      </button>)
                                      :
                                      (<button style={{ all: 'unset', cursor: 'pointer' }} type='button'>
                                        <MdClose size={27} />
                                      </button>)
                                  }

                                </div>
                                <input
                                  placeholder='Criador'
                                  style={{ border: '0' }}
                                  name="trait_type"
                                  className='text-start md-textarea form-control border-top-0 border-bottom-0 border-right-0'
                                  value={x.trait_type}
                                  onChange={e => HandlePropChange(e, i)}
                                />
                              </div>
                            </div>
                            <div>
                              <input
                                placeholder='Antonio Neto'
                                style={{ marginLeft: '3px' }}
                                name="value"
                                className='text-start md-textarea form-control'
                                value={x.value}
                                onChange={e => HandlePropChange(e, i)}
                              />
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                  <button style={{ borderRadius: '20%', all: 'unset', cursor: 'pointer' }} className='pt-3' type='button'>
                    <div className="card d-flex justify-content-center "
                      style={{ color: 'blue', padding: '5px', borderColor: 'blue', borderRadius: '5px' }}
                      onClick={handleAddClick} >
                      Add Mais
                    </div>
                  </button>
                </Modal.Body>
                <Modal.Footer>
                  <button style={{ borderRadius: '20%', all: 'unset', cursor: 'pointer' }} type='button' onClick={() => setShow1(false)}>
                    <div className="card d-flex justify-content-center" style={{ borderRadius: '25%', width: '50px', height: '50px' }}>
                      Salvar
                    </div>
                  </button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>


          <div className="d-flex justify-content-between pt-5"  >
            <div className="d-flex justify-content-start">
              <div>
                <FaRegMoon size={25} />
              </div>
              <div style={{ paddingLeft: '5px' }}>
                <p style={{ padding: '0', margin: '0' }} className="font-weight-bold"> Levels  </p>
                <small className="text-muted"> Numerical traits that show as a progress bar. </small>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button style={{ borderRadius: '20%', all: 'unset', cursor: 'pointer' }} type='button' onClick={() => setShow2(true)}>
                <div className="card d-flex justify-content-center" style={{ borderRadius: '25%', width: '50px', height: '50px' }}>
                  <div className="d-flex justify-content-center"> <BsPlus size={24} color={'#213213'} /></div>
                </div>
              </button>
              <Modal show={show2} onHide={() => setShow2(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Adicionar Levels</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <small>Levels show up underneath your item, are clickable, and can be filtered in your collection's sidebar.</small>
                  <div className="form-group pt-5" >
                    {
                      inputLevelList.map((x, i) => {
                        return (
                          <div key={i} className="d-flex justify-content-between pt-3">
                            <div>
                              <div className="d-flex form-control" style={{ padding: '0' }}>
                                <div className="d-flex justify-content-center" style={{ width: '50px' }}>
                                  {
                                    inputList.length !== 1 ?
                                      (<button style={{ all: 'unset', cursor: 'pointer' }} type='button' onClick={() => handleRemoveLevelClick(i)}>
                                        <MdClose size={27} />
                                      </button>)
                                      :
                                      (<button style={{ all: 'unset', cursor: 'pointer' }} type='button'>
                                        <MdClose size={27} />
                                      </button>)
                                  }

                                </div>
                                <input
                                  placeholder='Speed'
                                  style={{ border: '0' }}
                                  name="trait_type"
                                  className='text-start md-textarea form-control border-top-0 border-bottom-0 border-right-0'
                                  value={x.trait_type}
                                  onChange={e => HandleLevelChange(e, i)}
                                />
                              </div>
                            </div>
                            <div className="d-flex">
                              <input
                                placeholder='3'
                                style={{ marginLeft: '3px', maxWidth: '70px' }}
                                name="value"
                                type='number'
                                className='text-start md-textarea form-control'
                                value={x.value}
                                onChange={e => HandleLevelChange(e, i)}
                              />
                              <div className="d-flex justify-content-center" style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                                <p style={{ padding: '0' }}> de </p>
                              </div>
                              <input
                                placeholder='5'
                                style={{ marginLeft: '3px', maxWidth: '70px' }}
                                name="max_value"
                                type="number"
                                className='text-start md-textarea form-control'
                                value={x.max_value}
                                onChange={e => HandleLevelChange(e, i)}
                              />
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                  <button style={{ borderRadius: '20%', all: 'unset', cursor: 'pointer' }} className='pt-3' type='button'>
                    <div className="card d-flex justify-content-center "
                      style={{ color: 'blue', padding: '5px', borderColor: 'blue', borderRadius: '5px' }}
                      onClick={handleAddLevelClick} >
                      Add Mais
                    </div>
                  </button>
                </Modal.Body>
                <Modal.Footer>
                  <button style={{ borderRadius: '20%', all: 'unset', cursor: 'pointer' }} type='button' onClick={() => setShow2(false)}>
                    <div className="card d-flex justify-content-center" style={{ borderRadius: '25%', width: '50px', height: '50px' }}>
                      Salvar
                    </div>
                  </button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>

          <div className="d-flex justify-content-between pt-5"  >
            <div className="d-flex justify-content-start">
              <div>
                <FiBarChart2 size={25} />
              </div>
              <div style={{ paddingLeft: '5px' }}>
                <p style={{ padding: '0', margin: '0' }} className="font-weight-bold"> Status  </p>
                <small className="text-muted"> Numerical traits that show as numbers. </small>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button style={{ borderRadius: '20%', all: 'unset', cursor: 'pointer' }} type='button' onClick={() => setShow3(true)}>
                <div className="card d-flex justify-content-center" style={{ borderRadius: '25%', width: '50px', height: '50px' }}>
                  <div className="d-flex justify-content-center"> <BsPlus size={24} color={'#213213'} /></div>
                </div>
              </button>
              <Modal show={show3} onHide={() => setShow3(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Adicionar Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <small>Status show up underneath your item, are clickable, and can be filtered in your collection's sidebar.</small>
                  <div className="form-group pt-5" >
                    {
                      inputStatusList.map((x, i) => {
                        return (
                          <div key={i} className="d-flex justify-content-between pt-3">
                            <div>
                              <div className="d-flex form-control" style={{ padding: '0' }}>
                                <div className="d-flex justify-content-center" style={{ width: '50px' }}>
                                  {
                                    inputList.length !== 1 ?
                                      (<button style={{ all: 'unset', cursor: 'pointer' }} type='button' onClick={() => handleRemoveStatusClick(i)}>
                                        <MdClose size={27} />
                                      </button>)
                                      :
                                      (<button style={{ all: 'unset', cursor: 'pointer' }} type='button'>
                                        <MdClose size={27} />
                                      </button>)
                                  }

                                </div>
                                <input
                                  placeholder='Speed'
                                  style={{ border: '0' }}
                                  name="trait_type"
                                  className='text-start md-textarea form-control border-top-0 border-bottom-0 border-right-0'
                                  value={x.trait_type}
                                  onChange={e => HandleStatusChange(e, i)}
                                />
                              </div>
                            </div>
                            <div className="d-flex">
                              <input
                                placeholder='3'
                                style={{ marginLeft: '3px', maxWidth: '70px' }}
                                name="value"
                                type='number'
                                className='text-start md-textarea form-control'
                                value={x.value}
                                onChange={e => HandleStatusChange(e, i)}
                              />
                              <div className="d-flex justify-content-center" style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                                <p style={{ padding: '0' }}> de </p>
                              </div>
                              <input
                                placeholder='5'
                                style={{ marginLeft: '3px', maxWidth: '70px' }}
                                name="max_value"
                                type="number"
                                className='text-start md-textarea form-control'
                                value={x.max_value}
                                onChange={e => HandleStatusChange(e, i)}
                              />
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                  <button style={{ borderRadius: '20%', all: 'unset', cursor: 'pointer' }} className='pt-3' type='button'>
                    <div className="card d-flex justify-content-center "
                      style={{ color: 'blue', padding: '5px', borderColor: 'blue', borderRadius: '5px' }}
                      onClick={handleAddStatusClick} >
                      Add Mais
                    </div>
                  </button>
                </Modal.Body>
                <Modal.Footer>
                  <button style={{ borderRadius: '20%', all: 'unset', cursor: 'pointer' }} type='button' onClick={() => setShow3(false)}>
                    <div className="card d-flex justify-content-center" style={{ borderRadius: '25%', width: '50px', height: '50px' }}>
                      Salvar
                    </div>
                  </button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>

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
