import { PDFExport } from "@progress/kendo-react-pdf";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { listReports } from "../../actions/reportActions";
import "./PdfReport.css";
import axios from "axios";

function PdfReport() {
  const navigate = useNavigate();
  const [ans1, setAns1] = useState("");
  const [ans2, setAns2] = useState("");
  const [ans3, setAns3] = useState("");
  const [ques1, setQues1] = useState("");
  const [ques2, setQues2] = useState("");
  const [ques3, setQues3] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");
  const [uid, setUid] = useState("");
  const [header, setHeader] = useState("");
  const [titledesc] = useState("Description");
  const [gua, setGua] = useState("");
  const [date, setDate] = useState("");
  const { id } = useParams();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listReports());
    const fetching = async () => {
      const { data } = await axios.get(`/api/reports/${id}`);

      setHeader(data.header);
      setAns1(data.ans1);
      setAns2(data.ans2);
      setAns3(data.ans3);
      setDesc(data.desc);
      setQues1(data.ques1);
      setQues2(data.ques2);
      setQues3(data.ques3);
      setDesc(data.desc);
      setUid(data.uid);
      setDate(data.createdAt);
      setStatus(data.status);
      setGua(data.gua);
    };

    fetching();
  }, [id, date, navigate, dispatch, userInfo]);

  const pdfExportComponent = useRef(null);
  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  };
  return (
    <>
      <div className="receipt-content mb-2">
        <div className="container bootstrap snippets bootdey">
          <div className="row">
            <div className="col-md-12">
              <PDFExport ref={pdfExportComponent} paperSize="A4" scale={0.6}>
                <div className="invoice-wrapper">
                  <img src={header} alt="header" className="img" />
                  <div className="intro">
                    Hi{" "}
                    <strong>
                      {userInfo.fname}&nbsp;{userInfo.mname}&nbsp;
                      {userInfo.lname}
                    </strong>
                    ,
                    <br />
                    This is your report summary <strong></strong> for your
                    concern
                  </div>
                  <div className="payment-info">
                    <div className="row">
                      <div className="col-sm-6">
                        <span>ID No.</span>
                        <strong>#{uid}</strong>
                      </div>
                      <div className="col-sm-6 text-right">
                        <span>Submitted Date</span>
                        <strong>{date.substring(0, 10)}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="payment-details">
                    <div className="row">
                      <div className="col-sm-6">
                        <span>Your Info</span>
                        <strong>
                          {" "}
                          {userInfo.fname} {userInfo.mname} {userInfo.lname}
                        </strong>
                        <p>
                          {userInfo.studentnumber}
                          <br />
                          {userInfo.yearsection} <br />
                          {userInfo.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="payment-details">
                    <div className="row">
                      <div className="col-sm-6">
                        <span>Description of Report</span>
                        <div className="mt-2">
                          <strong>{ques1}</strong>
                          <p>{ans1}</p>
                        </div>
                        <div className="mt-2">
                          <strong>{ques2}</strong>
                          <p>{ans2}</p>
                        </div>

                        <div className="mt-2">
                          <strong>{ques3}</strong>
                          <p>{ans3}</p>
                        </div>

                        <div className="mt-2">
                          <strong>{titledesc}</strong>
                          <p>{desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="line-items">
                    <div className="total text-right mb-3">
                      <p className="extra-notes">
                        <strong>Extra Notes</strong>
                        Please describe your concern as much as possible. The
                        more the details, the better for us to provide
                        assistance. Thanks a lot.
                      </p>
                      <div className="field">
                        Guarantor: <span>{gua}</span>
                      </div>

                      <div className="field">
                        Checked date: <span>{date.substring(0, 10)}</span>
                      </div>
                      <div className="field grand-total">
                        Status: <span>{status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </PDFExport>
              <div className="mt-2">
                <Button
                  variant="info"
                  className="mx-2"
                  onClick={handleExportWithComponent}
                >
                  <i className="fa fa-print"></i>
                  Print this report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PdfReport;
