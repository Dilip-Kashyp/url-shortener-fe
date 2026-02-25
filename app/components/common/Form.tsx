import { Form as AntdForm } from 'antd';


export default function Form({ formProps, formItem }: { formProps?: any, formItem?: any }) {
    return (
        <AntdForm {...formProps}>
            {formItem.map((item: any, index: number) => (
                <AntdForm.Item key={item.name || index} name={item.name} label={item.label} {...item.formItemProps}>
                    {item.children}
                </AntdForm.Item>
            ))}
        </AntdForm>
    )
}