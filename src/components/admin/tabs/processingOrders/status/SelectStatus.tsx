import { Modal, Select } from 'antd';
import React, { useState } from 'react';

type ChildComponentProps = {
    onChange: (value: string) => void; // Тип для функции обратного вызова
    status: string;
};

const SelectStatus: React.FC<ChildComponentProps> = ({ onChange, status }) => {
    const [confirmModal, setConfirmModal] = useState(false);
    const [pendingStatus, setPendingStatus] = useState<string | null>(null); // Статус, ожидающий подтверждения

    const handleInputChange = (value: string) => {
        if (value === 'Доставлено') {
            setPendingStatus(value); // Сохраняем статус для подтверждения
            setConfirmModal(true); // Открываем модальное окно
        } else {
            onChange(value); // Для остальных статусов меняем значение сразу
        }
    };

    const handleCancel = () => {
        setConfirmModal(false);
        setPendingStatus(null); // Сбрасываем ожидающий статус
    };

    const handleConfirm = () => {
        setConfirmModal(false);
        if (pendingStatus) {
            onChange(pendingStatus); // Устанавливаем статус на "Доставлено"
            setPendingStatus(null); // Сбрасываем ожидающий статус
        }
    };

    return (
        <>
            <Select
                value={status}
                onChange={handleInputChange}
                options={[
                    { value: 'Принят', label: 'Принят' },
                    { value: 'Готов', label: 'Готов' },
                    { value: 'В пути', label: 'В пути' },
                    { value: 'Доставлено', label: 'Доставлено' },
                ]}
                style={{
                    width: 121,
                }}
            />
            <Modal
                title={<h2 style={{ fontWeight: 400 }}>Завершение заказа</h2>}
                centered
                open={confirmModal}
                onOk={handleConfirm}
                onCancel={handleCancel}
                okText="Да"
                cancelText="Нет"
            >
                <h3 style={{ fontWeight: 400 }}>
                    Подтвердить доставку заказа?
                </h3>
            </Modal>
        </>
    );
};

export default SelectStatus;
