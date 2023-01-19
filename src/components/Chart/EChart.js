import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
// import eChart from "./Config/eChart";
import { useDispatch, useSelector } from "react-redux";
import { getdashboard } from "../../redux/actions/dashboardActions";
import { useEffect } from "react";

function EChart() {
    useEffect(() => {  
      dispatch(getdashboard());
    }, []);
  const  {dashboard}  = useSelector((state)=>state.dashboardReducer);
  const dispatch = useDispatch();
  const { Title, Paragraph } = Typography; 

  const userCount = dashboard?.data?.userCount[0].userCount;
  const carsCount = dashboard?.data?.carsCount[0].carsCount;
  const totalCount = dashboard?.data?.totalCount[0].TotalCount;
  const totalAmount = dashboard?.data?.totalAmount[0].totalAmount;
  // const eachDaySales = dashboard?.data.eachDaySale[0]
  // console.log('eachdaysales::',eachDaySales)


  const eChart = {
    series: [
      {
        name: "Sales",
        data: [dashboard?.data?.eachDaySale[0]?.total, 
        dashboard?.data?.eachDaySale[1]?.total, 
        dashboard?.data?.eachDaySale[2]?.total,
         dashboard?.data?.eachDaySale[3]?.total,
          dashboard?.data?.eachDaySale[4]?.total,
           dashboard?.data?.eachDaySale[5]?.total,
            dashboard?.data?.eachDaySale[6]?.total],
        color: "#fff",
      },
    ],
  
    options: {
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",
  
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      grid: {
        show: true,
        borderColor: "#ccc",
        strokeDashArray: 2,
      },
      xaxis: {
        categories: [
          
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun",
          "Mon",
          "Tue",
        
        ],
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },
  
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
  };
  




  const items = [
    {
      Title: userCount,
      user: "Users",
    },
    {
      Title: carsCount,
      user: "Total Cars",
    },
    {
      Title: totalCount,
      user: "Transactions completed",
    },
    {
      Title:`₹ ${totalAmount}`,
      user: "Stripe account",
     
    },
  ];

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Active Users</Title>
        <Paragraph className="lastweek">
          than last week <span className="bnb2">+30%</span>
        </Paragraph>
        <Row gutter>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default EChart;
