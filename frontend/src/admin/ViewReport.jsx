import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteReportAction,
  listReports,
  updateReportAction,
} from '../actions/reportActions';
import ErrorMessage from "../components/Actions/ErrorMessage";
import Loading from "../components/Actions/Loading";
import MainScreen from "../components/MainScreen/MainScreen";

function ViewReport() {
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
  const [status, setStatus] = useState();
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
      setStatus(data.status);
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
    dispatch(updateReportAction(id, ans1, ans2, ans3, desc, status));
    if (!ans1 || !ans2 || !ans3 || !desc ||!status) return;
    resetHandler();
    navigate("/admin");
  };

  return (
    <MainScreen title="Solve Report">
      <Card>
        <Card.Header>Student Report</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group>
              <strong>{ques1}</strong>
              <div>
                {ans1}
                </div>
            </Form.Group>
            <Form.Group  className="mt-4">
              <strong>{ques2}</strong>
              <div>
                {ans2}
                </div>
            </Form.Group>
            <Form.Group  className="mt-4">
              <strong>{ques3}</strong>
              <div>
                {ans3}
                </div>
            </Form.Group>
            <Form.Group  className="mt-4">
              <strong>{titledesc}</strong>
              <div>
                {desc}
                </div>
            </Form.Group >
            <Form.Group className="mt-4">
              <strong>Status</strong>
              <Form.Control
                key="key"
                className="form-control"
                name="status"
                type="text"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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

export default ViewReport;
