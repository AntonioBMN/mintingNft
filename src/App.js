import Minter from './content/Minter'
import NFTs from './content/NFTs'
import FTs from './content/FTs'
import Assets from './content/assets';
import WebFont from 'webfontloader';
import { useEffect } from 'react';

const App = () => {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Chilanka', 'Indie Flower']
      }
    });
  }, []);

  return (
    <div className="container-fluid" >
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom border-dark">
          <div className="container-fluid d-flex">
            <div className='justify-content-center'>
              <h1 style={{ font: 'bold', fontSize: '50px', fontFamily: 'Indie Flower' }} href="#">starLight</h1>
            </div>
          </div>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto" >
              <li className="nav-item">
                <a className="nav-link" style={{ fontSize: '20px', fontFamily: 'Chilanka', width: '70px', paddingRight: '10px' }} href="/">Mint</a>
              </li>
              <li className="nav-item text-center" >
                <a className="nav-link" style={{ fontSize: '20px', fontFamily: 'Chilanka', width: '70px', paddingRight: '10px' }} href="/NFTs">NFTs</a>
              </li>
              <li className="nav-item" >
                <a className="nav-link" style={{ fontSize: '20px', fontFamily: 'Chilanka', width: '70px', paddingRight: '10px' }} href="/FTs">FTs</a>
              </li>
            </ul>
          </div>
        </nav>
        {
          window.location.pathname === '/' ? <Minter /> :
            window.location.pathname === '/NFTs' ? <NFTs /> :
              window.location.pathname === '/FTs' ? <FTs /> :
                window.location.pathname.includes('asset') === true ? <Assets /> :
                  null
        }
      </div>
    </div>
  )
}
export default App;
