import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';

const Unauthorized = () => (
  <Result
    status="error"
    title="Not Authorized"
    subTitle="You don't have admin privilege"
    extra={[
      <Button type="primary" key="console" onClick={()=>window.location.href='/home'}>
        Go Back
      </Button>
    ]}
  >
  </Result>
);
export default Unauthorized;