import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { BsPlus } from 'react-icons/bs';
import { MdFormatListBulleted, MdClose } from 'react-icons/md';

export const Proprieties = ({ inputList, setInputList }) => {
  const [show, setShow] = useState(false)

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


  return (
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
        <button style={{ borderRadius: '20%', all: 'unset', cursor: 'pointer' }} type='button' onClick={() => {setShow(true)}}>
          <div className="card d-flex justify-content-center" style={{ borderRadius: '25%', width: '50px', height: '50px' }}>
            <div className="d-flex justify-content-center"> <BsPlus size={24} color={'#213213'} /></div>
          </div>
        </button>
        <Modal show={show} onHide={() => setShow(false)}>
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
            <button style={{ borderRadius: '20%', all: 'unset', cursor: 'pointer' }} type='button' onClick={() => setShow(false)}>
              <div className="card d-flex justify-content-center" style={{ borderRadius: '25%', width: '50px', height: '50px' }}>
                Salvar
              </div>
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}