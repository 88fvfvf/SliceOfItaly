import { Checkbox, Divider, Form, Input, Slider } from "antd";
import { useState } from "react";
import { FilterRubl } from "../../../../public/svg/icone";
import './filtering.scss';

const Filtering = () => {
    const [sliderValue, setSliderValue] = useState<{ slider1: number; slider2: number }>({
        slider1: 0,
        slider2: 3500
    });

    const handleSliderChange = (value: number[]) => {
        setSliderValue({
            slider1: value[0],
            slider2: value[1]
        });
    };

    const handleInput1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (!isNaN(newValue)) {
            setSliderValue(prev => ({
                ...prev,
                slider1: newValue
            }));
        }
    };

    const handleInput2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (!isNaN(newValue)) {
            setSliderValue(prev => ({
                ...prev,
                slider2: newValue
            }));
        }
    };

    return (
        <section style={{ width: '244px' }}>
            <h1>Фильтрация</h1>
            <Form>
                <div className="filterBy__Type">
                    <h2>Тип теста:</h2>
                    <Form.Item>
                        <Checkbox.Group>
                            <Checkbox value={1}>Традиционное</Checkbox>
                            <Checkbox value={2}>Тонкое</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                </div>
                <Divider />
                <div className="filterBy__Rate_new">
                    <h2>Размеры:</h2>
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
                    <h2>Цена от и до:</h2>
                    <Form.Item>
                        <Input
                            suffix={<FilterRubl />}
                            value={sliderValue.slider1}
                            onChange={handleInput1Change}
                            min={0}
                            max={3500}
                            maxLength={4}
                        />
                        <Input
                            suffix={<FilterRubl />}
                            value={sliderValue.slider2}
                            onChange={handleInput2Change}
                            min={0}
                            max={3500}
                            maxLength={4}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Slider
                            range
                            value={[sliderValue.slider1, sliderValue.slider2]}
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
                <button className="filter__button">
                    <h3>Применить</h3>
                </button>
            </Form>
        </section>
    );
};

export default Filtering;
