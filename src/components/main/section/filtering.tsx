import { Checkbox, Divider, Form, Input, Slider } from "antd";
import React, { useState } from "react";
import { FilterRubl } from "../../../../public/svg/icone";
import { useAppDispatch } from "../../../hooks/hooks";
import { useFetchIngredientsQuery } from "../../../store/api/api.pizza";
import { applyFilter, IFilter } from "../../../store/filter/filter.slice";
import './filtering.scss';
import LoadingIng from "./loading/LoadingIng";
import Sort from "../../categories/sort/Sort";

const Filtering = () => {
    const { data, isLoading } = useFetchIngredientsQuery()
    const [sliderValue, setSliderValue] = useState<{ FromSlider: number; ToSlider: number }>({
        FromSlider: 0,
        ToSlider: 3500
    });
    const dispatch = useAppDispatch()

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
    const handleSubmit = (values: any) => {
        const filter: IFilter = {
            Ingredients: values.Ingredients || [], // Предполагаем, что это массив
            Sizes: values.Sizes || [], // Предполагаем, что это массив
            Types: values.Types || [], // Предполагаем, что это массив
            FromSlider: sliderValue.FromSlider,
            ToSlider: sliderValue.ToSlider,
        };
        dispatch(applyFilter(filter));
    };

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
                            <Checkbox value={'25 см'}>25 см.</Checkbox>
                            <Checkbox value={'30 см'}>30 см.</Checkbox>
                            <Checkbox value={'35 см'}>35 см.</Checkbox>
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
                <div className="sort_drawer">
                    <Sort />
                </div>
                <Divider />
                <div className="filterBy__Ingredients">
                    <h2>Ингредиенты:</h2>
                    <Form.Item name={"Ingredients"} className="ingredients">
                        <Checkbox.Group>
                            {
                                isLoading
                                    ? (
                                        <LoadingIng />
                                    ) : (
                                        data?.map((ingredients) => (
                                            <Checkbox value={ingredients.ingredients} key={ingredients.id}>
                                                {ingredients.ingredients}
                                            </Checkbox>
                                        ))
                                    )
                            }
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
