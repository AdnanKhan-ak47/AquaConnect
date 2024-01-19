import React, { useEffect, useState } from 'react'
import '../styles/VerifyInfo.css' // Import the CSS file
import RadioButton from '../components/RadioButton'

import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

function VerifyInfo() {
  const [waterSources, setWaterSources] = useState('')
  // const [groundWaterPresent, setGroundWaterPresent] = useState(false);
  const [projectType, setProjectType] = useState({
    Contamination: false,
    Build: true,
  })
  const [ngos, setNgos] = useState([])
  const [reportInfo, setReportInfo] = useState('')

  const [groundWaterPresent, setGroundWaterPresent] = useState({
    Yes: false,
    No: true,
  })

  const getNgos = async () => {
    const response = await fetch(`http://localhost:5000/api/ngo`).then((res) =>
      res.json(),
    )

        console.log(response)
        const ngoNames = response.map((ngo) => (ngo.username))
        setNgos(ngoNames)
    }

  useEffect(() => {
    getNgos()
  }, [])

  const { id } = useParams()

  const handleVerify = async () => {
    const response = await fetch(
      `http://localhost:5000/api/request/updatestatus/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ next: true }),
      },
    ).then((res) => res.json())

    console.log(response)
  }

    const handleChange = (e) => {
        if (e.target.name == 'Yes') {
            setGroundWaterPresent({ Yes: true, No: false })
        }
        else if (e.target.name == 'No') {
            setGroundWaterPresent({ Yes: false, No: true })
        }
        else if (e.target.name == 'Contamination') {
            setProjectType({ Contamination: true, Build: false })
        }
        else if (e.target.name == 'Build') {
            setProjectType({ Contamination: false, Build: true })
        }
    }

  return (
    <>
      <Navbar />
      <div className="verify-info">
        <h1 className="title">Verification Info</h1>
        <form className="form">
          <label className="label">
            Water Sources Nearby:
            <input
              className="input"
              type="text"
              value={waterSources}
              onChange={(e) => setWaterSources(e.target.value)}
            />
          </label>
          <br />
          <label className="label1">
            <span style={{ padding: '0rem 1rem' }}>Ground Water Present:</span>

            <RadioButton
              name="Yes"
              id="Yes"
              value="Yes"
              onChange={handleChange}
              checked={groundWaterPresent.Yes}
              text="Yes"
            />

            <RadioButton
              name="No"
              id="No"
              value="No"
              onChange={handleChange}
              checked={groundWaterPresent.No}
              text="No"
            />
          </label>
          <label className="label1">
            <span style={{ padding: '0rem 1rem' }}>Type of Project:</span>

            <RadioButton
              name="Contamination"
              id="Contamination"
              value="Contamination"
              onChange={handleChange}
              checked={projectType.Contamination}
              text="Contamination"
            />

            <RadioButton
              name="Build"
              id="Build"
              value="Build"
              onChange={handleChange}
              checked={projectType.Build}
              text="Build"
            />
          </label>
          <br />
          <label className="label">
            Project Type:
            <select
              className="select"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Type 1">Type 1</option>
              <option value="Type 2">Type 2</option>
              <option value="Type 3">Type 3</option>
            </select>
          </label>
          <br />
          <label className="label">
            NGO:
            <select className="select">
              <option value="">Select</option>
              {ngos.map((ngo) => {
                return (
                  <option value={ngo} key={ngo}>
                    {ngo}
                  </option>
                )
              })}
            </select>
          </label>
          <br />
          <label className="label">
            Report Info:
            <input
              className="report-info"
              type="text"
              value={reportInfo}
              onChange={(e) => setReportInfo(e.target.value)}
            />
          </label>
          <br />
          <Link to="/verify"><button className="button" type="button" onClick={handleVerify}>
            Verify
          </button></Link>
        </form>
      </div>
    </>
  )
}

export default VerifyInfo
