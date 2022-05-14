import React, {useState} from 'react' 
import { useHttp } from '../hooks/http.hook'
import axios from "axios";
import {useSelector} from 'react-redux'

export const CreatePage = () => {

    const token = useSelector( state => state.token)
    const {request} = useHttp()
    const [file, setFile] = useState({name: ''})
    const [e, setE] = useState()

    const getFileHandler = (e) => {
        setFile(e.target.files[0]);
        setE(e);
    }

    const pressHandler = async event => {
        // const {key, signedUrl} = await request('/file/url', 'POST', {fileName : file.name}, {
        //     Authorization: `Bearer ${auth.token}`
        // })

        // await fetch(signedUrl, {
        //     method: 'PUT',
        //     body: file,
        //     headers: {'Access-Control-Allow-Origin': '*'}
        // })

        let formData = new FormData();
        formData.append('file', file);

        await fetch('/file/upl', { method: 'POST', body: formData, headers: {
            Authorization: `Bearer ${token}`
        }})

        e.target.value = null;

    }

    return (
        <div className='row'>
            <div className='col s8 offset-s2' style={{paddingTop: '4rem'}}>
                <h6>Загрузите ваш файл</h6>
                <div className="input-field">
                    <input 
                        type="file"
                        id="file"
                        multiple
                        onChange={getFileHandler}
                    />
                    <button onClick={pressHandler}> 
                        Upload! 
                    </button>
                    
                </div>

            </div>
        </div>
    )
}