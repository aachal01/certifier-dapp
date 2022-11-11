import './styles.scss';
import { SideNav } from '../../component/SideNav';
import {ReactComponent as VerifiedIcon} from '../../assets/verified.svg'
import { useRef, useState } from 'react';
import web3 from '../../web3/proxy';

export function VerifyPage() {

    const id = useRef(null)

    const [certificates, setCertificates] = useState([{
        id: '######',
        expireAt: '######',
        createdAt: '######',
        issuedTo: '######',
        issuedBy: '######',
        data: {
            title: '######',
            name: '######',
            description: '######',
        }
    }])

    const [message, setMessage] = useState(null)
    const [index, setIndex] = useState(0)

    const certificate = certificates[index]

    const handleFindById = async () => {
        if(!id.current) return;
        setCertificates([{
            id: 'Loading...',
            expireAt: 'Loading...',
            createdAt: 'Loading...',
            issuedTo: 'Loading...',
            issuedBy: 'Loading...',
            data: {
                title: 'Loading...',
                name: 'Loading...',
                description: 'Loading...',
            }
        }])
        try {
            const certificates = await web3.getCertificateById(id.current.value)
            if(certificates.length > 0) {
                console.log(certificates)
                setCertificates(certificates.reverse())
                setMessage(false)
            } else {
                setMessage("Certificate Not Found!")
                setCertificates([])
            }
        } catch (error) {
            setMessage(error)
            setCertificates([])
        }
    }

    // const onConnect = async () => {
    //     const account = await web3.getAccount()
    //     const certificates = await web3.getCertificateById(account.address)
    //     // setCertificates(certificates.reverse())
    // }

    return (
        <div className='verify-page'>
            {/* Sidenav */}
            <SideNav create={true}/>

            {/* Certificate editor */}
            <div className='editor'>
                <div className="certificate">
                    <h3>Verify Certificate</h3>
                    <label className="div-box input-box">
                        <span className="details">Find Certificate By ID</span>
                        <input ref={id} type="text" placeholder="Enter Certificate ID"/>
                        <button onClick={handleFindById}>Find Certificate</button>
                    </label>
                    {
                        message ?
                        <div>{message}</div> :
                        <>
                        <div className="div-box">
                            <span className="details">Title</span>
                            <div>{certificate.data.title}</div>
                        </div>
                        <div className="div-box">
                            <span className="details">Name</span>
                            <div>{certificate.data.name}</div>
                        </div>
                        <div className="div-box">
                            <span className="details">Issued To</span>
                            <div>{certificate.issuedTo}</div>
                        </div>
                        <div className="div-box">
                            <span className="details">Issued Date</span>
                            <div>{certificate.createdAt.toString()}</div>
                        </div>
                        <div className="div-box">
                            <span className="details">Expiry Date</span>
                            <div>{certificate.expireAt.toString()}</div>
                        </div>
                        <div className="div-box">
                            <span className="details">Description</span>
                            <div className='des-container'>{certificate.data.description}</div>
                        </div>
                        </>
                    }
                </div>
            </div>

            {/* Certificate preview */}
            <div className='certificate-card preview'>
                <h2 className='card header'>Certificates Change History</h2>
                {certificates.map((c, i) =>
                    <div className={`card ${i === index && 'selected'}`} key={c.id} onClick={() => setIndex(i)}>
                        <div className='card1'>
                            <div className='title'>Title: {c.data.title}</div>
                            <div className='cid'>Certificate ID: {c.id}</div>
                        <div className='Iby'>Issued By: {c.issuedBy}</div>
                        <div className='Ito'>Issued to: {c.issuedTo}</div>
                        </div>
                        <div className='vicon'><VerifiedIcon/></div>
                    </div>
                )}

            </div>
        </div>
    )
}