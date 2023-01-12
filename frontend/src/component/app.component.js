
import { ToastContainer } from 'react-toastify';
import { AppRouting } from './routing';
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from 'react-redux';
import {store} from '../store';

export function App(){
    return(
        <div>
             <Provider store={store}> 
                <AppRouting></AppRouting>
             </Provider> 
            <ToastContainer></ToastContainer>
        </div>
    );
}