import React from 'react';
import { Button, Form, Input, InputNumber, Select, Spin, message } from 'antd';
import './EditMenu.scss';
import { useAddMenuItemMutation, useFetchMenuQuery } from '../../../../store/api/api.pizza';
import { IProducts } from '../../../../types/Types';

const categoryOptions = [
    { label: 'Пицца', value: 'pizza' },
    { label: 'Завтраки', value: 'breakfast' },
    { label: 'Закуски', value: 'snacks' },
    { label: 'Коктейли', value: 'cocktails' },
    { label: 'Напитки', value: 'drinks' },
    { label: 'Десерты', value: 'desserts' }
];

interface FormValues {
    title: string;
    image: string;
    category: string;
    price: number;
    weight: number;
    description?: string;
}

const EditMenu: React.FC = () => {
    const [form] = Form.useForm<FormValues>();
    const { data: menuItems, isLoading, isError } = useFetchMenuQuery();
    const [addMenuItem, { isLoading: isSaving }] = useAddMenuItemMutation();

    const handleSubmit = async (values: FormValues) => {
        const images = values.image
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean);

        const payload: Partial<IProducts> = {
            title: values.title,
            images,
            prices: [values.price],
            weight: [values.weight.toString()],
            category: values.category,
            rating: 5,
            description: values.description,
            tasty: [],
            unit: 1
        };

        try {
            await addMenuItem(payload).unwrap();
            message.success('Позиция добавлена в меню');
            form.resetFields();
        } catch (error) {
            message.error('Не удалось добавить позицию. Проверьте API.');
            console.error(error);
        }
    };

    return (
        <div className='edit_menu'>
            <div className="edit_menu__header">
                <div>
                    <h1>Редактирование меню</h1>
                    <p>Управляйте блюдами и обновляйте позиции меню из админ-панели.</p>
                </div>
                <div className="edit_menu__meta">
                    <span>Всего позиций</span>
                    <strong>{menuItems?.length ?? 0}</strong>
                </div>
            </div>

            <div className="edit_menu__content">
                <div className="edit_menu__list">
                    <h3>Текущее меню</h3>
                    {isLoading && (
                        <div className="edit_menu__loading">
                            <Spin />
                            <span>Загружаем позиции...</span>
                        </div>
                    )}
                    {isError && <p className="edit_menu__error">Не удалось загрузить меню.</p>}
                    <div className="edit_menu__grid">
                        {menuItems?.map((item) => (
                            <div className="edit_menu__card" key={item.id}>
                                <div className="edit_menu__image">
                                    <img src={item.images?.[0]} alt={item.title} loading="lazy" />
                                </div>
                                <div className="edit_menu__info">
                                    <h4>{item.title}</h4>
                                    <p>{item.description ?? 'Описание отсутствует'}</p>
                                    <div>
                                        <span>{item.category ?? 'категория не указана'}</span>
                                        <strong>{item.prices?.[0] ?? item.finalPrice ?? 0} ₽</strong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="edit_menu__form">
                    <h3>Добавить позицию</h3>
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>
                        <Form.Item
                            label="Название"
                            name="title"
                            rules={[{ required: true, message: 'Укажите название' }]}
                        >
                            <Input placeholder="Например, Маргарита" />
                        </Form.Item>
                        <Form.Item
                            label="Изображения (через запятую)"
                            name="image"
                            rules={[{ required: true, message: 'Добавьте хотя бы одну ссылку' }]}
                        >
                            <Input placeholder="https://... , https://..." />
                        </Form.Item>
                        <Form.Item
                            label="Категория"
                            name="category"
                            rules={[{ required: true, message: 'Выберите категорию' }]}
                        >
                            <Select options={categoryOptions} placeholder="Выберите категорию" />
                        </Form.Item>
                        <div className="edit_menu__row">
                            <Form.Item
                                label="Цена, ₽"
                                name="price"
                                rules={[{ required: true, message: 'Укажите цену' }]}
                            >
                                <InputNumber min={1} className="edit_menu__input" />
                            </Form.Item>
                            <Form.Item
                                label="Вес, г"
                                name="weight"
                                rules={[{ required: true, message: 'Укажите вес' }]}
                            >
                                <InputNumber min={1} className="edit_menu__input" />
                            </Form.Item>
                        </div>
                        <Form.Item label="Описание" name="description">
                            <Input.TextArea rows={4} placeholder="Описание блюда" />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={isSaving} block>
                            Добавить в меню
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default EditMenu;
