import { Row, Col, Space, Button } from 'antd';
import styles from './widgets.css';


export function WidgetSpace({ onCreate }) {
  return (
    <Row>
      <Col span={12} offset={12}>
        <div className={styles._}>
          <Space>
            <Button type="primary" onClick={onCreate}>Create</Button>
          </Space>
        </div>
      </Col>
    </Row>
  );
}
