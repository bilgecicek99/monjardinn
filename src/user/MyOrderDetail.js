import React, { useState,useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { getToken} from "../service/AuthService";
import { useLocation, useNavigate,useParams } from 'react-router-dom';
import { baseUrl } from '../config/Constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WithNavbar from '../WithNavbar'; 

const MyOrderDetail = () => {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState([]);
    const [orderProgress, setOrderProgress] = useState([]);

    let token= getToken();


    const fetchOrderDetail = async (id) => {
        try {
          const requestOptions = {
            headers: {
              'Content-Type': 'application/json',
            }
          };
           await fetch(baseUrl+`api/OrderDetail/GetOrderDetailByOrderId?orderId=${id}`,requestOptions)
           .then(response => response.json())
           .then(data => {  
            if(data.success)
            {
                setOrderDetails(data.data)
            }
            console.log(data.data);        
           })
           .catch(error => {
             console.error(error);
           });      
      }
      catch (error) {
        console.error(error)
      }
    };

    const fetchOrderProgress = async () => {
        try {
          
           await fetch(baseUrl+`api/OrderProgress/GetAllOrderProgress`)
           .then(response => response.json())
           .then(data => {  
            if(data.success)
            {if(data.data.length>0)
                setOrderProgress(data.data)
            }
            console.log(data.data);        
           })
           .catch(error => {
             console.error(error);
           });      
      }
      catch (error) {
        console.error(error)
      }
    };

    useEffect(() => {
        const fetchData = async () => {
          await fetchOrderProgress();  
          await fetchOrderDetail(id); 
        };
      
        fetchData();
      }, []);

      const styles = {
        cardContainer: {
          display: "flex",
          flexWrap: "wrap", 
          alignItems: "flex-start",
          marginBottom: "30px",
        },
        card: {
          flexBasis: "calc(50% - 80px)",
          margin: "15px",
          background: "white",
          color: "black",
          borderRadius: "12px",
          border: "1px solid #D9D9D9",
          marginLeft:"3%",
        },
        cardContent: {
          padding: "20px",
          textAlign: "left",
          fontStyle: "italic",
          fontSize: "13px",
        },
      };
      
      const handleDivClick = async (id) => {
        
      };


return (
    <div style={{ marginTop: "120px" }}>
    <div style={styles.cardContainer}>
      {orderDetails?.orderDetail?.map((item, index) => (
        <div style={styles.card} className="order-detail-card" key={item.orderDetailId}>
          <div style={{ ...styles.cardContent, padding: "20px" }}>        
            <p>
              <span style={{ fontWeight: "500", fontSize: "18px", marginTop: "25px" }}>Sipariş No:</span>  <span style={{ fontSize: "16px" }}>#{orderDetails.orderNumber}</span>
            </p>
            <table className="table table-light">
              <thead></thead>
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: "middle", padding: 0, width: "150px" }}>
                      <img
                        src={
                        item?.productFileUrl ||
                          "images/monjardinlogo.png"
                        }
                        style={{ width: "40px", height: "45px" }}
                      />
                    </td>
                    <td
                      style={{ fontStyle: "italic", fontWeight: "bold", verticalAlign: "middle", padding: 0, width: "150px" }}
                    >
                      {item.name}
                    </td>
                    <td style={{ fontStyle: "italic", verticalAlign: "middle", padding: 0, width: "100px" }}>{item.totalOfOrder}</td>
                    <td style={{ fontStyle: "italic", verticalAlign: "middle", padding: 0, width: "150px" }}>
                      {item.amountOfOrder} TL
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5" style={{ border: "none", padding: 0 }}>
                    </td>
                  </tr>
                </tbody>
            </table>
            <div className="timeline">
              {orderProgress.map((progress, progressIndex) => (
                <>
                  {progressIndex > 0 && <div className="timeline-line"></div>}
                  <div
                    className={`timeline-item ${item.orderProgressId >= progress.id? "completed" : ""}`}
                    key={progress.id}
                  >
                    <div className="timeline-circle"></div>
                    <div className="timeline-content">{progress.name}</div>
                  </div>
                </>
              ))}
            </div>

            <p style={{ fontWeight: "600", fontSize: "16px" }}>Teslimat Adresi</p>
            <p style={{ fontWeight: "500", fontSize: "15px",marginLeft:"7px" }}>{item.userAddressDetail.addressTitle}</p>
            <p style={{ fontSize: "15px", marginLeft:"7px" }}>{item.userAddressDetail.address}</p>
          </div>
        </div>
      ))}
    </div>
  </div>

);
};

export default WithNavbar(MyOrderDetail);

