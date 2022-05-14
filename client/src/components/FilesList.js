import React, { useEffect } from 'react'
//import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import {useSelector} from 'react-redux'

export const FilesList = ({ files, request, setFiles}) => {

    const token = useSelector( state => state.token)
    const deleteFileHandler = async event => {
        await request('/file', 'DELETE', {
            key: event.target.value
        },  
        {
            Authorization: `Bearer ${token}`
        })

        setFiles(files.filter((file)=>{
            return file.key !==event.target.value
        }))
    }


  if (!files.length) {
    return <p className="center">Загруженных файлов нет</p>
  }

  return (
    <div>
    <h3>This is your files ^_^</h3>
    <table>
      <thead>
      <tr>
        <th>№</th>
        <th>File name</th>
        <th>Download</th>
        <th>Delete file</th>
      </tr>
      </thead>

      <tbody>
      { files.map((file, index) => {
        return (
          <tr key={file.key}>
            <td>{index + 1}</td>
            <td>{file.name? file.name: 'Безымянный'}</td>
            <td>
              <a href={file.link}>This is your file link</a>
            </td>
            <td>
              <button value={file.key} onClick={deleteFileHandler} className="waves-effect waves-light red btn">button</button>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
    </div>
  )
}