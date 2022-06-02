import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteReportAction,
  listReports,
  updateReportAction,
} from "../../actions/reportActions";
import ErrorMessage from "../../components/Actions/ErrorMessage";
import Loading from "../../components/Actions/Loading";
import MainScreen from "../../components/MainScreen/MainScreen";

function UpdateReport({ search }) {
  const navigate = useNavigate();
  const [ans1, setAns1] = useState("");
  const [ans2, setAns2] = useState("");
  const [ans3, setAns3] = useState("");
  const [ques1, setQues1] = useState("");
  const [ques2, setQues2] = useState("");
  const [ques3, setQues3] = useState("");
  const [desc, setDesc] = useState("");
  const [titledesc] = useState("Description");
  const [date, setDate] = useState("");
  const { id } = useParams();

  const dispatch = useDispatch();
  const reportUpdate = useSelector((state) => state.reportUpdate);
  const { loading, error } = reportUpdate;

  const reportDelete = useSelector((state) => state.reportDelete);
  const { loading: loadingDelete, error: errorDelete } = reportDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteReportAction(id));
    }
    navigate("/myreports");
  };

  useEffect(() => {
    dispatch(listReports());
    const fetching = async () => {
      const { data } = await axios.get(`/api/reports/${id}`);

      setAns1(data.ans1);
      setAns2(data.ans2);
      setAns3(data.ans3);
      setDesc(data.desc);
      setQues1(data.ques1);
      setQues2(data.ques2);
      setQues3(data.ques3);
      setDesc(data.desc);
      setDate(data.updatedAt);
    };

    fetching();
  }, [id, date, navigate, dispatch]);

  const resetHandler = () => {
    setAns1("");
    setAns2("");
    setAns3("");
    setDesc("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateReportAction(id, ans1, ans2, ans3, desc));
    if (!ans1 || !ans2 || !ans3 || !desc) return;
    resetHandler();
    navigate("/myreports");
  };

  return (
    <MainScreen title="Edit Report">
      <Card>
        <Card.Header>Edit your Report</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group>
              <Form.Label>{ques1}</Form.Label>
              <Form.Control
                key="key"
                className="form-control"
                name="ans1"
                type="text"
                id="ans1"
                value={ans1}
                onChange={(e) => setAns1(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
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
            </Form.Group>
            <Form.Group>
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
            <Form.Group>
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
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit" className="mt-3">
              Update Report
            </Button>
            <Button
              className="mx-2 mt-3"
              variant="danger"
              onClick={() => deleteHandler(id)}
            >
              Delete Report
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default UpdateReport;
