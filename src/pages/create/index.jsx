import './styles.scss';
import { SideNav } from '../../component/SideNav';

export function CreatePage() {
    return (
        <div className='create-page'>
            <SideNav verify={true}/>
            <div className='editor'>For Editor</div>
            <div className='preview'>For Preview</div>
        </div>
    )
}