import React from 'react'
import WaterRequest from '../components/WaterRequest'



function Dashboard() {
<<<<<<< HEAD

  const [waterRequests, setWaterRequests] = useState([])

  const getWaterRequests = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/request");
      const jsonData = await response.json();
      setWaterRequests(jsonData);
      console.log(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getWaterRequests();
  }, [])

=======
  
>>>>>>> parent of c9c3429 (Encrpytion and JWT added in the backend (#14))
  return (
    <div className='Dashboard'>
      <h1>Dashboard</h1>

<<<<<<< HEAD
      <div className=''>
        {waterRequests.map(waterRequests => {

          return (
            <WaterRequest
              key={waterRequests.req_id}
              location={waterRequests.location}
              userCount={waterRequests.n_people}
              userName={waterRequests.username}
              status={waterRequests.status}
            />
          )
        })}
        <WaterRequest
          location='1234 Main St'
          userCount='5'
          userName='John Doe'
          status='Pending'
        />
        <WaterRequest
          location='1234 Main St'
          userCount='5'
          userName='John Doe'
          status='Pending'
        />
        <WaterRequest
          location='1234 Main St'
          userCount='5'
          userName='John Doe'
          status='Pending'
        />
      </div>

=======
      <WaterRequest
      location='1234 Main St'
      userCount='5'
      userName='John Doe'
      status='Pending'
      />
      <WaterRequest
      location='1234 Main St'
      userCount='5'
      userName='John Doe'
      status='Pending'
      />
      <WaterRequest
      location='1234 Main St'
      userCount='5'
      userName='John Doe'
      status='Pending'
      />
      
>>>>>>> parent of c9c3429 (Encrpytion and JWT added in the backend (#14))
    </div>
  )
}

export default Dashboard