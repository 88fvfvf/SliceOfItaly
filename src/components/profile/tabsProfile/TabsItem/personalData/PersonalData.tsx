import './PersonalData.scss'

const PersonalData = () => {
    return (
        <div className="PersonalData">
            <h1>Личные данные</h1>
            <div className="allInputData">
                <div className="personal_input">
                    <div>
                        <label htmlFor="Имя">Имя</label>
                        <input type="text" placeholder='Имя' />
                    </div>
                    <div>
                        <label htmlFor="">Номер телефона</label>
                        <input type="text" placeholder='+998 20 000 10 21' />
                    </div>
                    <div>
                        <label htmlFor="">Почта</label>
                        <input type="text" placeholder='E-Mail' />
                    </div>
                </div>
            </div>
            <button>Выйти с аккаунта</button>
        </div>
    );
};

export default PersonalData;