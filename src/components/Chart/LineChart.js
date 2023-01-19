import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./Config/lineChart";

import { useDispatch, useSelector } from "react-redux";
import { getdashboard } from "../../redux/actions/dashboardActions";
import { useEffect } from "react";

function LineChart() {
  
  const { Title, Paragraph } = Typography;

  useEffect(() => {  
    dispatch(getdashboard());
  }, []);

  const  {dashboard}  = useSelector((state)=>state.dashboardReducer);
  const dispatch = useDispatch();

  const userCount = dashboard?.data?.userCount[0].userCount;
  const carsCount = dashboard?.data?.carsCount[0].carsCount;
  const totalCount = dashboard?.data?.totalCount[0].TotalCount;
  const totalAmount = dashboard?.data?.totalAmount[0].totalAmount;

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Active Users</Title>
          <Paragraph className="lastweek">
            than last week <span className="bnb2">+30%</span>
          </Paragraph>
        </div>
        <div className="sales">
          <ul>
            <li>{<MinusOutlined />} Traffic</li>
            <li>{<MinusOutlined />} Sales</li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
