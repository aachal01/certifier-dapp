import './styles.scss';
import { SideNav } from '../../component/SideNav';
import {ReactComponent as VerifiedIcon} from '../../assets/verified.svg'

export function CreatePage() {
    return (
        <div className='create-page'>
            {/* Sidenav */}
            <SideNav verify={true}/>

            {/* Certificate editor */}
            <div className='editor'>
                    <div className="form">
                        <h3>Create Certificate</h3>
                        <label className="input-box">
                            <span className="details">Title</span>
                            <input type="text" placeholder="Enter Title"/>
                        </label>
                        <label className="input-box">
                            <span className="details">Name</span>
                            <input type="text" placeholder="Enter your Name"  />
                        </label>
                        <label className="input-box">
                            <span className="details">Issued Date</span>
                            <input type="date" placeholder="DD-MM-YYYY"  />
                        </label>
                        <label className="input-box">
                            <span className="details">Expiry Date</span>
                            <input type="date" placeholder="DD-MM-YYYY"  />
                        </label>
                        <label className="input-box">
                            <span className="details">Description</span>
                            <div className='des-container' placeholder="Enter Description" contentEditable/>
                        </label>
                        <button>Submit</button>
                    </div>
            </div>

            {/* Certificate preview */}
            <div className='certificate-card'>
                <div className='card1'>
                    <div className='title'>Title: Certification of blockchain</div>
                    <div className='cid'>Certificate ID: 123456789010101001001</div>
                </div>
                <div className='card2'>
                    <div className='title'>Title: Certification of blockchain</div>
                    <div className='cid'>Certificate ID: 123456789010101001001</div>
                </div>
            </div>
        </div>
    )
}