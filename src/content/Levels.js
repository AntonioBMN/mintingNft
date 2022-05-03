import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FaRegMoon } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { BsPlus } from 'react-icons/bs';

export const Levels = ({ inputLevelList, setInputLevelList }) => {
    const [show2, setShow2] = useState(false)

    const HandleLevelChange = (e, index) => {
        const { name, value } = e.target;
        if (value < 0) {
            return
        }
        if (name === 'value' && parseInt(value) > inputLevelList[index]['max_value']) {
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



    return (
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
                                                            inputLevelList.length !== 1 ?
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
    )
}