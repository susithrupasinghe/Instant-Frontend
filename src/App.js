import logo from "./logo.svg";
import "./App.css";
import {
  Container,
  Row,
  Col,
  Card
} from "react-bootstrap";
import { useState, useEffect } from "react";
import app from "./firebase";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { Form, Input, Button, InputNumber, Switch , notification } from 'antd';
import { useForm } from "rc-field-form";


function App() {

  const openNotification = () => {
    notification.open({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  // getval();
  const [toRight, setToRight] = useState();
  const [motion, setMotion] = useState();
  const [loading, setLoading] = useState(true);

  const [red, setRed] = useState();
  const [green, setGreen] = useState();
  const [blue, setBlue] = useState();
  const [displayText, setDisplayText] = useState();
  const [hapticFeedback, setHapticFeedback] = useState();

  const [form] = Form.useForm();

  const getval = () => {
    const db = getDatabase(app);
    const starCountRef = ref(db, 'Kit1/Cube1/Incoming');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setToRight(data.ToRight);
      setMotion(data.Motion);
      setLoading(false);

    });

  }
  useEffect(() => {
    getval();
  });

  if (loading) {
    return (
      <div>

      </div>
    )
  }
  else {

    const onSubmit = (values) => {

      const db = getDatabase(app);

      const dbObj = {
        Color : {
          Red: values.r,
          Green: values.g,
          Blue: values.b,
        },
        DisplayText: values.display,
        Vibration: values.feedback
      }
      set(ref(db, 'Kit1/Cube1/Outgoing'), dbObj).then(()=> {

        openNotification();
        form.resetFields();

      });

    }
    return (
      <div className="flex-container">
        <image src={logo} className="App-logo" alt="logo" />
        <Container style={{ height: "100vh" }}>
          <Row>
            <Col>
              <Card className="center">
                <Card.Body>
                  <Card.Title>Incoming from Tangibles</Card.Title>
                  <Card.Text>
                    Data coming from Master Node to Firebase DB
                  </Card.Text>
                  Adjacent Block: <span> {toRight}</span> <br />
                  Motion:
                  <span>
                    {motion == true && <small>Moving</small>}
                    {motion == false && <small>Stationary</small>}
                  </span>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="center">
                <Card.Body>
                  <Card.Title>Outgoing to Tangibles</Card.Title>
                  <Card.Text>
                    Data going to Master Node from Firebase DB
                  </Card.Text>
                  <Form onFinish={onSubmit} form={form}>
                    <Form.Item label=" Display Text" name="display">
                      <Input />
                    </Form.Item>
                    <Form.Item label="R" name="r">
                      <InputNumber />
                    </Form.Item>
                    <Form.Item label="G" name="g">
                      <InputNumber />
                    </Form.Item>
                    <Form.Item label="B" name="b">
                      <InputNumber />
                    </Form.Item>
                    <Form.Item label="Haptic Feedback" name="feedback">
                      <Switch />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                  {/* <form onSubmit={onSubmit}>
                    <div class="form-group">
                      <label for="exampleInputEmail1">displayText</label>
                      <input
                        type="text"
                        class="form-control"
                        id="displayText"
                        value={displayText}
                        onChange={(e) => setDisplayText(e.target.value)}
                      ></input>
                    </div>
                    <div className="input-group mb-3">
                      <div className="col-md-4">
                        <label for="exampleInputEmail1">Color</label>
                        <input
                          type="number"
                          class="form-control"
                          min="0"
                          max="255"
                          id="displayText"
                          placeholder="R"
                        ></input>
                      </div>
                      <div className="col-md-4">
                        <label for="exampleInputEmail1"></label>
                        <input
                          type="number"
                          min="0"
                          max="255"
                          class="form-control"
                          id="displayText"
                          placeholder="G"
                        ></input>
                      </div>
                      <div className="col-md-4">
                        <label for="exampleInputEmail1"></label>
                        <input
                          type="number"
                          min="0"
                          max="255"
                          class="form-control"
                          id="displayText"
                          placeholder="B"
                        ></input>
                      </div>
                    </div>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="Haptic Feedback"
                    />

                    <button variant="primary" type="submit" >Submit</button>
                  </form>
                  <br></br> */}

                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

}

export default App;
