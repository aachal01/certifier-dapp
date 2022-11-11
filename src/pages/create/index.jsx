import './styles.scss';
import { SideNav } from '../../component/SideNav';
import {ReactComponent as VerifiedIcon} from '../../assets/verified.svg'
import { useEffect, useRef, useState } from 'react';
import web3 from '../../web3/proxy';

export function CreatePage() {
    const [certificates, setCertificates] = useState([])
    const [id, setId] = useState(null)

    const title = useRef(null)
    const name = useRef(null)
    const issuedTo = useRef(null)
    const expireAt = useRef(null)
    const createdAt = useRef(null)
    const description = useRef(null)

    const onConnect = async () => {
        const account = await web3.getAccount()
        const certificates = await web3.getCertificateByIssuer(account.address)
        setCertificates(certificates)
    }

    const handleCreate = async () => {
        try {
            const certificate = await web3.createCertificate({
                issuedTo: issuedTo.current.value,
                expireAt: expireAt.current.value,
                createdAt: createdAt.current.value,
                title: title.current.value,
                name: name.current.value,
                description: description.current.innerText
            }, id)
            setCertificates([certificate, ...certificates])
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        if(!id) return
        const certificate = certificates.filter(c => c.id === id)[0]
        title.current.value = certificate?.data.title || ''
        name.current.value = certificate?.data.name || ''
        issuedTo.current.value = certificate?.issuedTo || ''
        description.current.innerText = certificate?.data.description || ''
        createdAt.current.value = certificate?.createdAt ? certificate.createdAt.toISOString().split('T')[0] : ''
        expireAt.current.value = certificate?.expireAt ? certificate.expireAt.toISOString().split('T')[0] : ''
    }, [id])


    return (
        <div className='create-page'>
            {/* Sidenav */}
            <SideNav verify={true} connectedCallback={onConnect}/>

            {/* Certificate editor */}
            <div className='editor'>
                <div className="form">
                    <h3>Create Certificate</h3>
                    <label className="input-box">
                        <span className="details">Title</span>
                        <input ref={title} type="text" placeholder="Enter Title"/>
                    </label>
                    <label className="input-box">
                        <span className="details">Name</span>
                        <input ref={name} type="text" placeholder="Enter your Name"/>
                    </label>
                    <label className="input-box">
                        <span className="details">Issued To</span>
                        <input ref={issuedTo} type="text" placeholder="Enter Ethereum Account Public Key"/>
                    </label>
                    <label className="input-box">
                        <span className="details">Issued Date</span>
                        <input ref={createdAt} type="date" placeholder="DD-MM-YYYY"/>
                    </label>
                    <label className="input-box">
                        <span className="details">Expiry Date</span>
                        <input ref={expireAt} type="date" placeholder="DD-MM-YYYY"/>
                    </label>
                    <label className="input-box">
                        <span className="details">Description</span>
                        <div ref={description} className='des-container' placeholder="Enter Description" contentEditable />
                    </label>
                    <button onClick={handleCreate}>Submit</button>
                </div>
            </div>

            {/* Certificate preview */}
            <div className='certificate-card preview'>
                <h2 className='card header'>Certificates Issued By Me</h2>
                {certificates.map(c =>
                    <div className={`card ${c.id === id && 'selected'}`} key={c.id} onClick={() => setId(c.id)}>
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