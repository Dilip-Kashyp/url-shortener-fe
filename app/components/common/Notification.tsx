import { message as antdMessage } from 'antd';


const Notification = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    return (
        antdMessage[type](message)
    );
};

export default Notification;