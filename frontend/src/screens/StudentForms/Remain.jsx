import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createReportAction } from "../../actions/reportActions";
import ErrorMessage from "../../components/Actions/ErrorMessage";
import "./FormsScreen.css";
const Remain = () => {
  const [ans1, setAns1] = useState("");
  const [ans2, setAns2] = useState("");
  const [ans3, setAns3] = useState("");
  const [ques1, setQues1] = useState("Amount Promise to Pay");
  const [ques2, setQues2] = useState("Type of Payment");
  const [ques3, setQues3] = useState("Reason why you have remaining balance?");
  const [desc, setDesc] = useState("");
  const [inctype] = useState("Remaining Balance");
  const [titledesc] = useState("Note");
  const [status] = useState("Active");
  const [uid] = useState(getRandomInt(1000000));
  const [picMessage, setPicMessage] = useState(null);
  const [pic, setPic] = useState();
  const [header] = useState(
    "https://scontent.fmnl17-3.fna.fbcdn.net/v/t39.30808-6/242865177_3887846774648522_5958541561794474525_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeEP2IVqX3kAQUBpu-Rl7G5D3bvpxV2g0andu-nFXaDRqcDeHK_K7jfERGDk-m2CGHdOQA9tEybN20dn4eqzTD-o&_nc_ohc=4ujpLewS1JQAX9F4Buc&_nc_ht=scontent.fmnl17-3.fna&oh=00_AT-1WQnlMagYYOfhcurDdw9lngjZpOE01Bi4xC69KY5_Bg&oe=629903D0"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reportCreate = useSelector((state) => state.reportCreate);
  const { report } = reportCreate;

  console.log(report);

  const resetHandler = () => {
    setQues1("");
    setQues2("");
    setQues3("");
    setDesc("");
  };

  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "webincident");
      data.append("cloud_name", "dfee7bpbw");
      fetch("https://api.cloudinary.com/v1_1/dfee7bpbw/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createReportAction(
        ans1,
        ans2,
        ans3,
        desc,
        inctype,
        status,
        ques1,
        ques2,
        ques3,
        titledesc,
        uid,
        pic,
        header
      )
    );
    resetHandler();
    navigate("/myreports");
    window.location.reload();
  };

  useEffect(() => {}, []);
  function getRandomInt(min) {
    return Math.floor(Math.random() * min);
  }
  return (
    <>
      <Form onSubmit={submitHandler}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>{ques1}</Form.Label>
            <Form.Control
              key="key"
              className="form-control"
              name="ans1"
              type="number"
              id="ans1"
              value={ans1}
              onChange={(e) => setAns1(e.target.value)}
              placeholder="₱"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>{ques2}</Form.Label>
            <Form.Control
              key="key"
              className="form-control"
              name="ans2"
              type="text"
              id="ans2"
              value={ans2}
              onChange={(e) => setAns2(e.target.value)}
            />
            <h6 id="emailHelp" className="form-text text-muted">
              Tuition Fee, Books, Reservation Fee, Other
            </h6>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>{ques3}</Form.Label>
          <Form.Control
            key="key"
            className="form-control"
            name="ans3"
            type="text"
            id="ans3"
            value={ans3}
            onChange={(e) => setAns3(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{titledesc}</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            key="key"
            className="form-control"
            name="desc"
            type="text"
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Optional"
          />
          <h6 id="emailHelp" className="form-text text-muted">
            Please describe your concern as much as possible. The more the
            details, the better for us to provide assistance.
          </h6>
          <br></br>
          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Upload Picture
            </label>
            <input
              className="form-control"
              type="file"
              id="custom-file"
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </div>
          <img src={pic} alt={picMessage} className="profilePic2" />
          <Card.Footer className="text-muted">
            Creating on - {new Date().toLocaleDateString()}
          </Card.Footer>
        </Form.Group>

        <Button variant="dark" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Remain;
