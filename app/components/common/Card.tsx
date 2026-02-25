import { Card as AntdCard } from 'antd';


const Card = ({ children, cardProps }: { children: React.ReactNode, cardProps?: any }) => {
    return (
        <AntdCard {...cardProps}>
            {children}
        </AntdCard>
    )
}

export default Card