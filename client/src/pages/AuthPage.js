import React, {useState, useEffect} from 'react' 
import { useHttp } from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {useSelector} from 'react-redux'

export const AuthPage = () => {

    const {loading, error, request, clearError} = useHttp()
    const message = useMessage()
    const login = useSelector( state => state.login)

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/auth/reg', 'POST', {...form})
            console.log(data)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/auth/login', 'POST', {...form})
            login(data.access_token, data.user.id)
        } catch (e) {}
    }

    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1>File storage project</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>

                            <div className="input-field">
                                <input 
                                className="yellow-input" 
                                value={form.email}
                                placeholder="Введите email" 
                                id="email" type="text" 
                                name="email"
                                onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input 
                                className="yellow-input" 
                                value={form.password}
                                placeholder="Введите пароль" 
                                id="password" 
                                type="password" 
                                name="password"
                                onChange={changeHandler}
                                />
                                <label htmlFor="email">Пароль</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4" onClick={loginHandler} style={{marginRight: 10}} disabled={loading}>Войти</button>
                        <button className="btn grey lighten-1 black-text" onClick={registerHandler} disabled={loading}>Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    )
}