import './styles.scss';
import { SideNav } from '../../component/SideNav';


export function VerifyPage() {
    return (
        <>
           <div className='verify-page'>
                <SideNav create={true}/>
                <div className='preview'>For Preview</div>
                <div className='verify'>For verify</div>               
           </div>
        </>
    )
}