import React, { useState, useCallback, useEffect } from 'react' 
import { FilesList } from '../components/FilesList'
import { useHttp } from '../hooks/http.hook'
import {useSelector} from 'react-redux'

export const FilesPage = () => {
    const [files, setFiles] = useState([])
    const {loading, request} = useHttp()

    const token = useSelector( state => state.token)

    const fetchFiles = useCallback(async () => {
        const fetched = await request('/file', 'GET', null, {
            Authorization: `Bearer ${token}`
        } )
        setFiles(fetched);
    }, [token, request])

    useEffect(() => {
        fetchFiles();
    }, [fetchFiles])

    return (
        <>
            {!loading && <FilesList files={files} request={request} setFiles={setFiles}/>}
        </>
    )
}