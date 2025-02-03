import './NotActivity.scss';

interface NotActivityProps {
    text: string
}

const NotActivity = ({ text }: NotActivityProps) => {
    return (
        <div className='not_activity'>
            <span>{text}</span>
        </div>
    );
};

export default NotActivity;