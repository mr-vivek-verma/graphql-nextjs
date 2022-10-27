// import Layout, { siteTitle } from '../components/layout';
// import utilStyles from '../styles/utils.module.css';
// import Link from 'next/link';
// import Date from '../components/date';
// import { Navbar } from '../components/navbar/navbar';
import { GraphQLClient, gql  } from 'graphql-request';


export const getStaticProps = async () => {
  const endpoint = process.env.PREVIEW_CH_ENDPOINT;
  const graphQLClient = new GraphQLClient(endpoint);
  graphQLClient.setHeader("Authorization", "Apikey 8626cf56-e364-4fd1-4fe0-311e23ac6355")
  
  const query = gql`{
  hotelX {
    search(
      criteria: { 
        checkIn: "2022-10-27",
        checkOut: "2022-10-28",
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

export default function Home({data}) {
   console.log("data", data.hotelX.search)
  return (
    <> 
      <div>
        <h1>TravelX</h1>
        </div>
      <div>{data && data.hotelX.search && data.hotelX.search.options.map((hotel) => {
        return (
          <>        
          <h4 key={hotel.id}>Hotel Name: {hotel.hotelName}</h4>
          <span>Payment Type: {hotel.paymentType}</span>
          <div>RateRules: {hotel.rateRules}</div>
          <div>currency: {hotel.price.currency}</div>
        <div></div>  
          </>
        )
       })}</div>
    </>)
  
}