import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteReportAction, listReports } from "../../actions/reportActions";
import ErrorMessage from "../../components/Actions/ErrorMessage";
import Loading from "../../components/Actions/Loading";
import MainScreen from "../../components/MainScreen/MainScreen";
import "./Paginate.css";

const MyProps = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reportPerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const reportList = useSelector((state) => state.reportList);
  const { loading, error, reports } = reportList;
  const reportCreate = useSelector((state) => state.reportCreate);
  const { success: successCreate } = reportCreate;
  const reportUpdate = useSelector((state) => state.reportUpdate);
  const { success: successUpdate } = reportUpdate;
  const reportDelete = useSelector((state) => state.reportDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = reportDelete;

  useEffect(() => {
    dispatch(listReports());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteReportAction(id));
    }
  };

  const pageCount = Math.ceil(reports?.length / reportPerPage);
  const pagesVisited = pageNumber * reportPerPage;
  const currentReports = reports?.slice(
    pagesVisited,
    pagesVisited + reportPerPage
  );
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <MainScreen
        title={`Welcome Back ${userInfo.fname} ${userInfo.mname} ${userInfo.lname}`}
      ></MainScreen>
      <div className="container">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        {loading && <Loading />}
        {loadingDelete && <Loading />}
        {currentReports
          ?.reverse()
          .filter((filteredReport) =>
            filteredReport.inctype.toLowerCase().includes(search.toLowerCase())
          )
          .map((report) => (
            <Accordion defaultActiveKey={["0"]} key={report._id}>
              <Accordion.Item eventkey="0">
                <Card style={{ margin: 10 }}>
                  <Card.Header style={{ display: "flex" }}>
                    <span
                      style={{
                        color: "black",
                        textDecoration: "none",
                        flex: 1,
                        cursor: "pointer",
                        alignSelf: "center",
                        fontSize: 18,
                      }}
                    >
                      <Accordion.Button
                        as={Card.Text}
                        variant="link"
                        key={report._id}
                      >
                        {report.inctype}
                      </Accordion.Button>
                    </span>
                    <div>
                      <Button href={`/reports/${report._id}`}>Edit</Button>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => deleteHandler(report._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="info"
                        className="mx-2"
                        href={`/pdf/${report._id}`}
                      >
                        View report
                      </Button>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse>
                    <Card.Body>
                      <h3 className="font-italic">ID: #{report.uid}</h3>
                      <br></br>
                      <h4>
                        <Badge bg="success" text="light">
                          Status - {report.status}{" "}
                        </Badge>
                      </h4>
                      <blockquote className="blockquote mb-0">
                        <p className="font-weight-bold ">{report.ques1}</p>
                        <p>{report.ans1}</p>

                        <p className="font-weight-bold">{report.ques2}</p>
                        <p>{report.ans2}</p>

                        <p className="font-weight-bold">{report.ques3}</p>
                        <p>{report.ans3}</p>

                        <p className="font-weight-bold">{report.titledesc}</p>
                        <p>{report.desc}</p>
                        <p className="font-weight-bold">Uploaded picture</p>
                        <p>
                          <img
                            src={report.pic}
                            alt={report.pic}
                            className="profilePic2"
                          />
                        </p>

                        <footer className="blockquote-footer">
                          Created on{" "}
                          <cite title="Source Title">
                            {report.createdAt.substring(0, 10)}
                          </cite>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion.Item>
            </Accordion>
          ))}
        <br></br>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
        <Link to="/cards">
          <Button style={{ marginLeft: 10, marginBottom: 410 }} size="lg">
            Create new Report
          </Button>
        </Link>
      </div>
    </>
  );
};

export default MyProps;
