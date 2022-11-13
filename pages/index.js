// import Layout, { siteTitle } from '../components/layout';
// import utilStyles from '../styles/utils.module.css';
// import Link from 'next/link';
// import Date from '../components/date';
// import { Navbar } from '../components/navbar/navbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { GraphQLClient, gql  } from 'graphql-request';
import Link from 'next/link';
import { useState } from 'react';
// import navbar from "../components/navbar/navbar"

   




                                                      
                      
export const getStaticProps = async () => {
  const endpoint = process.env.PREVIEW_CH_ENDPOINT;
  const graphQLClient = new GraphQLClient(endpoint);
  graphQLClient.setHeader("Authorization", "Apikey 8626cf56-e364-4fd1-4fe0-311e23ac6355")
  
  const query = gql`{
  hotelX {
    search(                                         
      criteria: { 
        checkIn: "2022-11-13",
        checkOut: "2022-11-14",
        occupancies: [{ paxes: [{age: 18}, {age: 30}] }],
        hotels: ["1"],
        currency: "EUR",
        market: "ES",
        language: "es",                                                                      
        nationality: "ES"
      },
      settings: {
        client: "client_demo",
        context: "HOTELTEST",
        auditTransactions: false,
        testMode: true,
        timeout: 25000
      },
      filter: {
        access: {
          includes: ["0"]
        }
      }) {                               
           context
      errors{
        code
        type
        description
      }
      warnings{
        code
        type
        description
      }
      options {
        id
        accessCode
        supplierCode
        hotelCode
        hotelName
        boardCode
        paymentType
        status
        occupancies {
          id
          paxes {
            age
          }
        }
        rooms {                                           
          occupancyRefId
          code                                                                                                                   
          description
          refundable
          roomPrice {
            price {
              currency
              binding
              net
              gross
              exchange {
                currency
                rate
              }
            }
            breakdown {
              price {
                currency
                binding
                net
                gross
                exchange {
                  currency
                  rate
                }
                markups {
                  channel
                  currency
                  binding
                  net
                  gross
                  exchange {
                    currency
                    rate
                  }
                  rules {
                    id
                    name
                    type
                    value
                  }
                }
              }
            }
          }
          beds {
            type
            count
          }
          ratePlans {
            code
          }
        }
        price {
          currency
          binding
          net
          gross
          exchange {
            currency
            rate
          }
          markups {
            channel
            currency
            binding
            net
            gross
            exchange {
              currency
              rate
            }
            rules {
              id
              name
              type
              value
            }
          }
        }
        supplements {
          code
          name
          description
          supplementType
          chargeType
          mandatory
          durationType
          quantity
          unit
          resort {
            code
            name
            description
          }
          price {
            currency
            binding
            net
            gross
            exchange {
              currency
              rate
            }
            markups {
              channel
              currency
              binding
              net
              gross
              exchange {
                currency
                rate
              }
            }
          }
        }
        surcharges {
          chargeType
          description
          price {
            currency
            binding
            net
            gross
            exchange {
              currency
              rate
            }
            markups {
              channel
              currency
              binding
              net
              gross
              exchange {
                currency
                rate
              }
            }
          }
        }
        rateRules
        cancelPolicy {
          refundable
          cancelPenalties {
            hoursBefore
            penaltyType
            currency
            value
          }
        }
        remarks
      }
    }
  }
} `
  
  const data =await graphQLClient.request(query)
  return {
    props: {   
      data
    }
  }
}

export default function ActionAreaCard({data}) {
   console.log("data", data.hotelX.search)
   
   const [hotel, SetHotel] = useState(false);
  const handleclick = () => {
    SetHotel(true);
    
    
  }
  return (
    <> 
      <div>
             
        <h1>TravelX</h1>
        </div>
      <div>{data && data.hotelX.search && data.hotelX.search.options.map((tel) => {
        
        return (
          <>  
          
    <Card sx={{ maxWidth: 440,display:'inline-block' }} >
      <CardActionArea sx={{display:'flex', justifyContent:"center", alignItems:"center"}}>
        <CardMedia
          component="img"
          height="150"
          src='https://m.economictimes.com/thumb/msid-90724647,width-1254,height-836,resizemode-4,imgsize-28786/indian-hotels.jpg'
          alt="hotel img"
          
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
          <h6 key={tel.id}>Hotel Name: {tel.hotelName}</h6>
          </Typography>
          <Typography variant="div" color="text.secondary"  onClick={(e) => {handleclick(e) }}>
          
          <span>Payment Type: {tel.paymentType}</span>
          <div>RateRules: {tel.rateRules}</div>
          <div>RateRules: {tel.rateRules ? tel.rateRules : "NA"}</div>
          <div style={{ color: "#5E2125" }}>Currency: {tel.price.currency}</div>            
          <div style={{margin:"10px"}}>    
          <Link href="/detailPage">More Details...</Link>    
          <Link href="/admin">Admin</Link>                           
          </div>       
          </Typography>                                                   
        </CardContent>                                                                                
                                                      
      </CardActionArea>                                                                       
                                                                                    
      </Card>                                        
       
       
          {/* <h4 key={hotel.id}>Hotel Name: {hotel.hotelName}</h4>
          <span>Payment Type: {hotel.paymentType}</span>
          <div>RateRules: {hotel.rateRules}</div>
          <div>currency: {hotel.price.currency}</div>
        <div></div>   */}
          </>
        )
       })}</div>
    </>)
  
}