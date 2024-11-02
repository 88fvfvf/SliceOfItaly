import { Checkbox, Divider, Form, Input, Radio, RadioChangeEvent } from "antd";
import { useState } from "react";
import './filtering.scss';
import { FilterRubl } from "../../../../public/svg/icone";

const Filtering = () => {
    const [value, setValue] = useState(1);
    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    return (
        <section style={{ width: '244px' }}>
            <h2>Фильтрация</h2>
            <Form>
                <div className="filterBy__Rate_new">
                    <h3>Размеры:</h3>
                    <Form.Item>
                        <Checkbox.Group>
                            <Checkbox value={1}>20 см.</Checkbox>
                            <Checkbox value={2}>30 см.</Checkbox>
                            <Checkbox value={3}>40 см.</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                </div>
                <Divider />
                <div className="filterByFromTo">
                    <h3>Цена от и до:</h3>
                    <Form.Item>
                        <Input suffix={<FilterRubl />} />
                        <Input suffix={<FilterRubl />} />
                    </Form.Item>
                </div>
                <Divider />
                <div className="filterBy__Ingredients">
                    <h3>Ингредиенты:</h3>
                    <Form.Item>
                        <Checkbox.Group>
                            <Checkbox value={1}>Сырный соус</Checkbox>
                            <Checkbox value={2}>Моцарелла</Checkbox>
                            <Checkbox value={3}>Чеснок</Checkbox>
                            <Checkbox value={4}>Солённые огурчики</Checkbox>
                            <Checkbox value={5}>Красный лук</Checkbox>
                            <Checkbox value={6}>Томаты</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                </div>
                <Divider />
                <div className="filterBy__Type">
                    <h3>Тип теста:</h3>
                    <Form.Item>
                        <Radio.Group onChange={onChange} value={value}>
                            <Radio value={1}>Традиционное</Radio>
                            <Radio value={2}>Тонкое</Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <button className="filter__button">
                    <h3>Применить</h3>
                </button>
            </Form>
        </section>
    )
}

export default Filtering