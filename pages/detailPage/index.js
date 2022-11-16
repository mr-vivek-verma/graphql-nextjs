import Link from "next/link";
import { Box, Card, Container, Typography, Button } from "@material-ui/core";
import { useEffect, useState } from "react";

const DetailPage = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("Detail")));
  }, []);

  const handleclear = () => {
    localStorage.clear();
  };

  return (
    <>
      <div
        style={{
          color: "#C16315",
          margin: "15px",
        }}
      >
        {data.hotelName}
      </div>
      {data === "undefined" ? (
        "Loading"
      ) : (
        <Card
          key={data.id}
          style={{
            background: "#C16315",
            margin: "10px",
            padding: "10px",
            color: "#C16365",
            display: "flex",
          }}
        >
          <img 
            width="180px"
            height="120px"
            style={{
              "border-radius": "12px",
              border: "1px solid #ffff",
              cursor: "pointer",
            }}
            src="https://m.timbu.com/img/h1411143/400/280/b1/jores-hotel-sanje-1411143-1.jpg"
            alt="hotel"
          />
          <Box> 
            <Typography
              variant="h1"
              style={{
                color: "#C16315",
                lineHeight: "1.5",
                marginLeft: "10px",
                fontSize: "15px",
              }}
            >
              {data.hotelCode}
            </Typography>
            <Typography
              style={{
                lineHeight: "1.5",
                marginLeft: "10px",
                fontSize: "15px",
              }}
            >
              <span>Payment Type: {data.paymentType}</span>
              <div>RateRules: {data.rateRules ? data.rateRules : "NA"}</div>
              <div style={{ color: "#5E2121" }}>
                Currency: {data.price ? data.price.currency : "USD"}
              </div>
              <div>
                Cancellation Policy:{" "}
                {data.cancelPolicy ? "50% Refundable" : "NA"}
              </div>
            </Typography>
          </Box>
        </Card>
      )}
      {/* <Link href="/"><a onClick={handleclear}> --Back</a></Link> */}
      <Button>
        {" "}
        <Link href="/">← Back</Link>
      </Button>
    </>
  );
};
export default DetailPage;
