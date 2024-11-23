import { Checkbox, Divider, Form, Input, Slider } from "antd";
import React, { useState } from "react";
import { FilterRubl } from "../../../../public/svg/icone";
import './filtering.scss';

const Filtering = () => {
    const [sliderValue, setSliderValue] = useState<{ FromSlider: number; ToSlider: number }>({
        FromSlider: 0,
        ToSlider: 3500
    });

    const handleSliderChange = (value: number[]) => {
        setSliderValue({
            FromSlider: value[0],
            ToSlider: value[1]
        });
    };

    const handleInput1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (!isNaN(newValue)) {
            setSliderValue(prev => ({
                ...prev,
                FromSlider: newValue
            }));
        }
    };

    const handleInput2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (!isNaN(newValue)) {
            setSliderValue(prev => ({
                ...prev,
                ToSlider: newValue
            }));
        }
    };
    const handleSubmit = (values: React.FormEvent<HTMLFormElement>) => {
        const filter = {
            ...values,
            ...sliderValue
        }
        console.log(filter);
    }

    return (
        <section style={{ width: '244px' }}>
            <h1>Фильтрация</h1>
            <Form onFinish={(values) => handleSubmit(values)}>
                <div className="filterBy__Type">
                    <h2>Тип теста:</h2>
                    <Form.Item name={"Types"}>
                        <Checkbox.Group>
                            <Checkbox value={'Традиционное'}>Традиционное</Checkbox>
                            <Checkbox value={'Тонкое'}>Тонкое</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                </div>
                <Divider />
                <div className="filterBy__Rate_new">
                    <h2>Размеры:</h2>
                    <Form.Item name={"Sizes"}>
                        <Checkbox.Group>
                            <Checkbox value={'20'}>20 см.</Checkbox>
                            <Checkbox value={'30'}>30 см.</Checkbox>
                            <Checkbox value={'40'}>40 см.</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                </div>
                <Divider />
                <div className="filterByFromTo">
                    <h2>Цена от и до:</h2>
                    <Form.Item>
                        <Input
                            suffix={<FilterRubl />}
                            value={sliderValue.FromSlider}
                            onChange={handleInput1Change}
                            min={0}
                            max={3500}
                            maxLength={4}
                        />
                        <Input
                            suffix={<FilterRubl />}
                            value={sliderValue.ToSlider}
                            onChange={handleInput2Change}
                            min={0}
                            max={3500}
                            maxLength={4}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Slider
                            range
                            value={[sliderValue.FromSlider, sliderValue.ToSlider]}
                            onChange={handleSliderChange}
                            max={3500}
                            tooltip={{ formatter: null }}
                            style={{ width: '100%' }}
                            marks={{ 0: '0₽', 3500: '3500₽' }}
                            styles={{
                                track: {
                                    background: '#ff5e00'
                                }
                            }}
                        />
                    </Form.Item>
                </div>
                <Divider />
                <div className="filterBy__Ingredients">
                    <h2>Ингредиенты:</h2>
                    <Form.Item name={"Ingredients"}>
                        <Checkbox.Group>
                            <Checkbox value={'Сырный соус'}>Сырный соус</Checkbox>
                            <Checkbox value={'Моцарелла'}>Моцарелла</Checkbox>
                            <Checkbox value={'Чеснок'}>Чеснок</Checkbox>
                            <Checkbox value={'Солённые огурчики'}>Солённые огурчики</Checkbox>
                            <Checkbox value={'Красный лук'}>Красный лук</Checkbox>
                            <Checkbox value={'Томаты'}>Томаты</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                </div>
                <button className="filter__button" type="submit">
                    <h3>Применить</h3>
                </button>
            </Form>
        </section>
    );
};

export default Filtering;
