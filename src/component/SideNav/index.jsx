import './styles.scss';
import {ReactComponent as VerifyIcon} from '../../assets/verify.svg'
import {ReactComponent as CreateIcon} from '../../assets/create.svg'
import {ReactComponent as AccountIcon} from '../../assets/account_circle.svg'
import { Link } from 'react-router-dom';

export function SideNav({ verify, create }) {
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

            <Link to="/account"> 
                <AccountIcon/>
                <div>My Profile</div>
            </Link>             
        </div>
    )
}