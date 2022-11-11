import './styles.scss';
import {ReactComponent as VerifyIcon} from '../../assets/verify.svg'
import {ReactComponent as CreateIcon} from '../../assets/create.svg'
import {ReactComponent as AccountIcon} from '../../assets/account_circle.svg'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import web3 from '../../web3/proxy';

export function SideNav({ verify, create, connectedCallback }) {

    const [connection, setConnection] = useState({ connected: web3.isConnected, loading: false })
    const [account, setAccount] = useState(web3.account)

    if(connection.connected && connectedCallback) connectedCallback() 

    const handleConnect = async () => {
        setConnection({ connected: false, loading: true })
        try {
            await web3.connect()
            const account = await web3.getAccount()
            setAccount(account)
            setConnection({ connected: true, loading: false })
        }
        catch {
            setConnection({ connected: false, loading: false })
        }
    }

    return (
        <div className='side-nav'>
            { create &&
                <Link to="/create"> 
                    <CreateIcon/> 
                    <div>Create Certificate</div>
                </Link>
            }
            
            { verify && 
                <Link to="/verify"> 
                    <VerifyIcon/> 
                    <div>Verify Certificate</div>
                </Link>
            }

            <span onClick={handleConnect}
                title={!connection.loading && connection.connected ? account.address : ''}
            > 
                <AccountIcon/>
                <div>
                    {
                        !connection.loading && !connection.connected && "Connect"
                    }
                    {
                        connection.loading && "Loading"
                    }
                    {
                        !connection.loading && connection.connected &&
                        account.address.slice(0, 5) + '...' + account.address.slice(-5)
                    }
                </div>
            </span>
        </div>
    )
}